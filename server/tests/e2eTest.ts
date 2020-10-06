import request from "supertest";

import server from "../app";

afterAll(done => {
  server.close();
  done();
});

describe("test 1", () => {
  it("runs", async () => {
    const result = await request(server).get("/");

    expect(result.text).toEqual("Hello World!");
    expect(result.status).toBe(200);
  });
});
