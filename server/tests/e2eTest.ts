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

afterAll(async () => {
  server.close();
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
