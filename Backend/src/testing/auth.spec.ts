import { config } from "dotenv";
import request from "supertest";
import { UserBody, UserLogin } from "../types/types";
config();
const requestApp: string = `${process.env.NODE_HOST}:${process.env.NODE_LOCAL_PORT}`;

describe("POST /users/register", () => {
  const userTesting: UserBody = {
    name: "Unit",
    second_name: "Testing",
    email: "unitTesting@mail.com",
    password: "92johnDOE4ever",
    role: "admin",
  };
  test("should respond with a 200 code, authentication token and json as content-type header", async () => {
    const response = await request(requestApp)
      .post("/api/auth/register")
      .send(userTesting);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("POST /users/login", () => {
  const userTesting: UserLogin = {
    email: "unitTesting@mail.com",
    password: "92johnDOE4ever",
  };
  test("should respond with a 200 code, authentication token and json as content-type header", async () => {
    const response = await request(requestApp)
      .post("/api/auth/login")
      .send(userTesting);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
