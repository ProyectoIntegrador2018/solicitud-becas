import express = require("express");
import path from "path";
import { OAuth2Client } from "google-auth-library";

import { db } from "./models/index";

const CLIENT_ID =
  "401453194268-j77retfhpocjvd3lhrniu3c35asluk9s.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  if (payload === undefined) {
    throw new Error("payload from google when verifying was undefined");
  }
  return payload;
}

// body of request to make a new user (coming from )
type UserLogIn = {
  tokenId: string;
  accessToken: string;
};

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());

app.post("/user-log-in", async function (req, res) {
  const userLogIn = req.body as UserLogIn; // does this fail if body is not of type UserLogIn?

  const payload = await verify(userLogIn.tokenId).catch((reason) => {
    console.error(reason);
    res.status(401); //Unathorized
    res.json(reason);
  });

  if (payload === undefined) {
    return;
  }

  if (
    payload.given_name === undefined ||
    payload.family_name === undefined ||
    payload.email === undefined
  ) {
    throw Error(`google's payload is incomplete: ${payload}`);
  }

  const authEmail = await db.AuthorizedEmail.findByPk(payload.email);
  if (authEmail === null) {
    res.status(401);
    res.json({ reason: "email is not in the authorized list of emails" });
    return;
  }

  try {
    const [user, _wasCreated] = await db.User.findOrCreate({
      where: { googleId: payload.sub },
      defaults: {
        googleId: payload.sub,
        givenName: payload.given_name,
        familyName: payload.family_name,
        email: payload.email,
      },
    });
    res.json(user);
  } catch (reason) {
    console.error(reason);
    res.status(500); // Internal Server Error
    res.json(reason);
  }
});

app.get("/users", async function (req, res) {
  const users = await db.User.findAll();

  res.json(users);
});

app.get("/users/:id", async function (req, res) {
  const id = req.params.id;
  const user = await db.User.findByPk(id);
  res.json(user);
});

app.post("/auth-emails", async function (req, res) {
  const emails = (req.body as [string]).map((e) => ({
    email: e,
  }));

  // AuthorizedEmail.bulkCreate(emails, { ignoreDuplicates: true });
  let createdEmails = await db.AuthorizedEmail.bulkCreate(emails, {
    // this is stupid but it seems to be the only way to make sequelize do what
    // we want. The desired behavior is the following: if there is a duplicate,
    // ignore it, if not, insert it with the correct createdAt/updatedAt dates.
    // I tried `ignoreDuplicates` option, it didn't update duplicated values
    // correctly, but it gave back the wrong createdAt/updatedAt dates
    updateOnDuplicate: ["email"],
  });

  res.json(createdEmails);
});

app.get("/auth-emails", async function (_req, res) {
  let emails = await db.AuthorizedEmail.findAll();
  res.json(emails);
});

app.delete("/auth-emails", async function (req, res) {
  let emails = req.body as [string];
  let destroyedCount = await db.AuthorizedEmail.destroy({
    where: { email: emails },
  });
  res.json({ emailsRemoved: destroyedCount });
});

app.post("/convocatorias", async function (req, res) {
  // const convocatoria = req.body as Convocatoria;
  try {
    const createdConvocatoria = await db.Convocatoria.create(req.body, {
      include: db.Area,
    });

    res.json(createdConvocatoria);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
});

app.patch("/convocatorias", async function (req, res) {
  // const convocatoria = req.body as Convocatoria;
  try {
    let updatedConvocatoria = await db.Convocatoria.update(req.body, {
      where: req.body.id,
    });

    // const newAreas = convocatoria?.areas;
    // const oldAreas = updatedConvocatoria?.areas;

    // if (newAreas !== undefined && newAreas !== null) {
    //   // if newAreas
    //   const removed = oldAreas?.filter((oldA) => newAreas.includes(oldA)) ?? [];

    //   await updatedConvocatoria.removeAreas(removed);
    //   await updatedConvocatoria.setAreas(newAreas);
    // }

    res.json(updatedConvocatoria);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

app.get("/convocatorias", async function (req, res) {
  try {
    let convocatorias = await db.Convocatoria.findAll({
      include: [db.Area],
    });
    res.json(convocatorias);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
});

app.get("/convocatorias/:id", async function (req, res) {
  const id = req.params.id;
  const convocatoria = await db.Convocatoria.findByPk(id);
  res.json(convocatoria);
});

app.delete("/convocatorias", async function (req, res) {
  let ids = req.body as [string];
  let destroyedCount = await db.Convocatoria.destroy({
    where: { id: ids },
  });
  res.json({ deleted: destroyedCount });
});

app.post("/");

// next lines are used to serve the built client app
// (special care is needed since we use client side routing)
// https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing

app.use(express.static(path.join(__dirname, "../client_build")));

app.get("/*", function (_req, res) {
  res.sendFile(clientIndexPath);
});

const clientIndexPath = path.join(__dirname, "../client_build", "index.html");

let port = process.env.PORT;
if (port == null || port == "") {
  port = "8080";
}

const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
  console.log("client app index.html path: ", clientIndexPath);
});

export default server;
