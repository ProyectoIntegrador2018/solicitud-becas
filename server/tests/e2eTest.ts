import request from "supertest";

import server from "../app";

import { db } from "../models/index";

const testUser1 = {
  googleId: "2",
  givenName: "Test",
  familyName: "User",
  email: "user@test.com",
  isAdmin: false,
};

beforeAll(async (done) => {
  // drop tables and create them to start testing fresh
  await db.sequelize.sync({ force: true });

  // Unfortunately I didn't manage to find a way to test google login programatically
  // so we insert a test user instead

  await db.User.bulkCreate([testUser1], {
    validate: true,
  });
  done();
}, 40000);

afterAll(async (done) => {
  server.close(async () => {
    done();
  });
}, 11000);

describe("users endpoint", () => {
  it("GET users/ returns users list", async () => {
    const response = await request(server).get("/users");

    expect(response.body).toMatchObject([testUser1]);

    expect(response.status).toBe(200);
  });

  it("GET users/:id returns the user with that id", async () => {
    const response = await request(server).get(`/users/${testUser1.googleId}`);

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
      areas: [
        { id: "Q", name: "Quimica" },
        { id: "M", name: "Matemáticas" },
      ],
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

describe("POST areas csv", () => {
  it("can parse a csv and add areas to a convocatoria", async () => {
    const convocatoria = {
      id: "C-2019",
      name: "Convocatoria 2019",
      evaluationStartDate: "2020-10-27T20:09:41.740Z",
      evaluationEndDate: "2020-10-28",
    };

    const expectedConvocatoria = {
      evaluationEndDate: "2020-10-28",
      evaluationStartDate: "2020-10-27",
      id: "C-2019",
      name: "Convocatoria 2019",
    };

    const postResponse = await request(server)
      .post("/convocatorias")
      .send(convocatoria);

    expect(postResponse.body).toMatchObject(expectedConvocatoria);

    const areasCSVPostResponse = await request(server)
      .post("/convocatorias/C-2019/areas")
      .attach("some_file", "tests/areas.csv");

    expect(
      areasCSVPostResponse.body.map((x) => [x.id, x.name, x.convocatoriaId])
    ).toMatchObject([
      ["MA", "Mate", "C-2019"],
      ["CS", "Computación", "C-2019"],
      ["DE", "Deporte", "C-2019"],
      ["PH", "Física", "C-2019"],
      ["AR", "Arte", "C-2019"],
    ]);

    const solicitudesCSVPostResponse = await request(server)
      .post("/convocatorias/C-2019/solicitudes")
      .attach("some_file", "tests/solicitudes.csv")
      .expect(200);

    expect(
      solicitudesCSVPostResponse.body.map((x) => [
        x.id,
        x.name,
        x.areaId,
        x.convocatoriaId,
      ])
    ).toMatchObject([
      ["1", "Chuchito Perez", "MA", "C-2019"],
      ["2", "Jose Perez", "MA", "C-2019"],
      ["3", "Andres Perez", "CS", "C-2019"],
      ["4", "Alex Perez", "PH", "C-2019"],
      ["5", "Manuel Perez", "AR", "C-2019"],
    ]);

    const solicitudesGetResponse = await request(server).get("/solicitudes");

    expect(
      solicitudesGetResponse.body.map((x) => [
        x.id,
        x.name,
        [x.area.id, x.area.name],
        [x.convocatoria.id, x.convocatoria.name],
      ])
    ).toMatchObject([
      ["5", "Manuel Perez", ["AR", "Arte"], ["C-2019", "Convocatoria 2019"]],
      ["4", "Alex Perez", ["PH", "Física"], ["C-2019", "Convocatoria 2019"]],
      [
        "3",
        "Andres Perez",
        ["CS", "Computación"],
        ["C-2019", "Convocatoria 2019"],
      ],
      ["2", "Jose Perez", ["MA", "Mate"], ["C-2019", "Convocatoria 2019"]],
      ["1", "Chuchito Perez", ["MA", "Mate"], ["C-2019", "Convocatoria 2019"]],
    ]);
  });
});

describe("Post evaluadores csv endpoint", () => {
  it("works", async () => {
    const convocatoria = {
      id: "C-2018",
      name: "Convocatoria 2018",
      evaluationStartDate: "2020-10-27T20:09:41.740Z",
      evaluationEndDate: "2020-10-28",
    };

    await request(server).post("/convocatorias").send(convocatoria).expect(200);

    await request(server).post("/auth-emails").send(["user@test.com"]);

    const evaluadoresCSVPostResponse = await request(server)
      .post("/convocatorias/C-2018/evaluadores")
      .attach("some_file", "tests/evaluadores.csv");

    expect(evaluadoresCSVPostResponse.body).toBe({});
  });
});
