import request from "supertest";

import server from "../app";

import User from "../models/user";
import sequelize from "../models/index";

const testUser1 = {
  googleId: "2",
  givenName: "Test",
  familyName: "User",
  email: "user@test.com",
};

beforeAll(async () => {
  // drop tables and create them to start testing fresh
  await sequelize.sync({ force: true });

  // Unfortunately I didn't manage to find a way to test google login programatically
  // so we insert a test user instead

  await User.bulkCreate([testUser1], {
    validate: true,
  });
});

afterAll((done) => {
  server.close();
  done();
});

describe("users endpoint", () => {
  it("GET users/ returns users list", async () => {
    const response = await request(server).get("/users");

    expect(response.body).toMatchObject([testUser1]);

    expect(response.status).toBe(200);
  });

  it("GET users/:id returns the user with that id", async () => {
    const response = await request(server).get("/users/2");

    expect(response.body).toMatchObject(testUser1);

    expect(response.status).toBe(200);
  });
});

describe("auth-emails endpoint", () => {
  it("POST, DELETE, GET sequence of requests", async () => {
    const EMAILS = ["user1@mail.com", "user2@mail.com", "user3@mail.com"];

    const postResponse = await request(server)
      .post("/auth-emails")
      .send(EMAILS);

    expect(postResponse.body).toMatchObject(
      EMAILS.map((e) => ({
        email: e,
      }))
    );

    // DELETE one existing and one nonexisting email
    const deleteResponse = await request(server)
      .delete("/auth-emails")
      .send(["user2@mail.com", "user4@mail.com"]);

    expect(deleteResponse.body).toEqual({ emailsRemoved: 1 });

    const getResponse = await request(server).get("/auth-emails");

    // the user2 mail is now missing
    expect(getResponse.body).toMatchObject(
      ["user1@mail.com", "user3@mail.com"].map((e) => ({
        email: e,
      }))
    );
  });
});

describe("convocatorias endpoint", () => {
  it("POST, GET, GET with ID, and DELETE sequence", async () => {
    const convocatoria = {
      id: "C-2020",
      name: "Convocatoria 2020",
      evaluationStartDate: "2020-10-27T20:09:41.740Z",
      evaluationEndDate: "2020-10-28",
    };

    const expectedConvocatoria = {
      evaluationEndDate: "2020-10-28",
      evaluationStartDate: "2020-10-27",
      id: "C-2020",
      name: "Convocatoria 2020",
    };

    const postResponse = await request(server)
      .post("/convocatorias")
      .send(convocatoria);

    expect(postResponse.body).toMatchObject(expectedConvocatoria);

    const getListResponse = await request(server).get("/convocatorias");

    expect(getListResponse.body.map((x) => x.id)).toMatchObject(["C-2020"]);

    const getResponse = await request(server).get("/convocatorias/C-2020");

    expect(getResponse.body).toMatchObject(expectedConvocatoria);

    const deleteResponse = await request(server)
      .delete("/convocatorias")
      .send(["C-2020"]);

    expect(deleteResponse.body).toEqual({ deleted: 1 });
  });
});
