import express = require("express");
import path from "path";
import { OAuth2Client } from "google-auth-library";
import fileUpload from "express-fileupload";
import csvParse from "csv-parse";
import cors from "cors";

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

// express middle-ware to handle files
app.use(fileUpload());

app.use(cors());

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
        isAdmin: false,
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
  try {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/make-admin", async function (req, res) {
  try {
    const { emails } = req.body;
    const users = await db.User.update(
      { isAdmin: true },
      { where: { email: emails } }
    );

    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.delete("/make-admin", async function (req, res) {
  try {
    const { emails } = req.body;
    const users = await db.User.update(
      { isAdmin: false },
      { where: { email: emails } }
    );

    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/auth-emails", async function (req, res) {
  const { emails } = req.body;

  const emailsArray = emails.map((e) => ({
    email: e,
  }));

  // AuthorizedEmail.bulkCreate(emails, { ignoreDuplicates: true });
  let createdEmails = await db.AuthorizedEmail.bulkCreate(emailsArray, {
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
  try {
    let updatedConvocatoria = await db.Convocatoria.update(req.body, {
      where: { id: req.body.id },
    });
    res.json(updatedConvocatoria);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

app.get("/convocatorias", async function (req, res) {
  try {
    let convocatorias = await db.Convocatoria.findAll({
      include: [
        { all: true },
        { model: db.Evaluador, include: ["areas", db.User] },
        { model: db.Solicitud, include: [db.Evaluacion] },
      ],
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
  const convocatoria = await db.Convocatoria.findByPk(id, {
    include: [
      { all: true },
      { model: db.Evaluador, include: ["areas", db.User] },
      { model: db.Solicitud, include: [db.Evaluacion] },
    ],
  });
  res.json(convocatoria);
});

app.delete("/convocatorias/:id", async function (req, res) {
  let id_ = req.params.id as string;
  let destroyedCount = await db.Convocatoria.destroy({
    where: { id: id_ },
  });
  res.json({ deleted: destroyedCount });
});

// THIS WILL FIRST REMOVE ALL AREAS RELATED TO THIS CONVOCATORIA, THEN IT WILL
// ADD THE NEW AREAS
app.post("/convocatorias/:id/areas", async function (req, res) {
  const id = req.params.id;

  const convocatoria = await db.Convocatoria.findByPk(id);
  if (!convocatoria) {
    return res.status(400).send("Convocatoria doesn't exist for given id");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const first = Object.values(req.files)[0];

  csvParse(first.data, async (err, records: Array<Array<any>>, info) => {
    if (err) {
      return res.status(400).send(`csv parser error: ${err}`);
    }
    if (records.length <= 1) {
      return res.status(400).send("empty csv or csv with only a header");
    }

    const rows = records.slice(1);

    const newAreas = rows.map((r) => ({
      id: String(r[0]).trim(),
      name: String(r[1]).trim(),
      convocatoriaId: id,
    }));

    try {
      await convocatoria.removeAreas();
      await db.Area.destroy({ where: { convocatoriaId: id } });
      const createdAreas = await db.Area.bulkCreate(newAreas);
      res.json(createdAreas);
    } catch (e) {
      console.error(e);
      res.status(500); // Internal Server Error
      res.json(e);
    }
  });
});

app.post("/convocatorias/:id/solicitudes", async function (req, res) {
  const id = req.params.id;

  const convocatoria = await db.Convocatoria.findByPk(id);
  if (!convocatoria) {
    return res.status(400).send("Convocatoria doesn't exist for given id");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const first = Object.values(req.files)[0];

  csvParse(first.data, async (err, records: Array<Array<any>>, info) => {
    if (err) {
      return res.status(400).send(`csv parser error: ${err}`);
    }
    if (records.length <= 1) {
      return res.status(400).send("empty csv or csv with only a header");
    }

    const rows = records.slice(1);

    const newSolicitudes = rows.map((r) => ({
      id: String(r[0]).trim(),
      name: String(r[1]).trim(),
      areaId: String(r[2]).trim(),
      convocatoriaId: id,
    }));

    try {
      const createdSolicitudes = await db.Solicitud.bulkCreate(newSolicitudes);
      res.json(createdSolicitudes);
    } catch (e) {
      console.error(e);
      res.status(500); // Internal Server Error
      res.json(e);
    }
  });
});

app.post("/solicitudes/:id/evaluacion", async function (req, res) {
  try {
    const id = req.params.id;
    const solicitud = await db.Solicitud.findByPk(id, {
      include: [db.Evaluacion],
    });
    const evaluacion = await db.Evaluacion.create(req.body);
    await solicitud?.addEvaluacione(evaluacion);

    res.json(evaluacion);
  } catch (e) {
    console.error(e);
    res.status(500); // Internal Server Error
    res.json(e);
  }
});

app.get("/solicitudes", async function (req, res) {
  try {
    const solicitudes = await db.Solicitud.findAll({
      include: [db.Area, db.Convocatoria, db.Evaluacion],
    });
    res.json(solicitudes);
  } catch (e) {
    console.error(e);
    res.status(500); // Internal Server Error
    res.json(e);
  }
});

app.delete("/solicitudes/:id", async function (req, res) {
  try {
    const id_ = req.params.id as string;
    const destroyedCount = await db.Solicitud.destroy({
      where: { id: id_ },
    });
    res.json({ deleted: destroyedCount });
  } catch (e) {
    console.error(e);
    res.status(500); // Internal Server Error
    res.json(e);
  }
});

app.post("/convocatorias/:id/evaluadores", async function (req, res) {
  const id = req.params.id;

  const convocatoria = await db.Convocatoria.findByPk(id);
  if (!convocatoria) {
    return res.status(400).send("Convocatoria doesn't exist for given id");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const first = Object.values(req.files)[0];

  csvParse(first.data, async (err, records: Array<Array<any>>, info) => {
    if (err) {
      return res.status(400).send(`csv parser error: ${err}`);
    }
    if (records.length <= 1) {
      return res.status(400).send("empty csv or csv with only a header");
    }

    const rows = records.slice(1);

    const emails = rows.map((r) => ({ email: String(r[0]).trim() }));

    try {
      const authEmails = await db.AuthorizedEmail.bulkCreate(emails, {
        updateOnDuplicate: ["email"],
      });
      await convocatoria.addAuthorizedEmails(authEmails);
      await convocatoria.reload({
        include: { model: db.AuthorizedEmail },
      });
      res.json(convocatoria);
    } catch (e) {
      console.error(e);
      res.status(500); // Internal Server Error
      res.json(e);
    }
  });
});

app.post("/assign-evaluador", async function (req, res) {
  // expects a json object with:
  // {
  // convocatoriaId: string,
  // userGoogleId: string,
  // areas: [{ id: "Q" }]
  // }
  // and will create a new "Evaluador" object that relates a user with a
  // convocatoria, along with the areas assigned to it
  try {
    const evaluador = req.body;

    const newEvaluador = await db.Evaluador.create(evaluador);
    await newEvaluador.setAreas(evaluador.areas.map((x) => x.id));
    res.json(newEvaluador);
  } catch (e) {
    console.error(e);
    res.status(500); // Internal Server Error
    res.json(e);
  }
});

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
