import { config } from 'dotenv';
import request from 'supertest';
import { UserBody, UserLogin } from '../types/types';
config();
const requestApp: string = `${process.env.NODE_HOST}:${process.env.NODE_LOCAL_PORT}`;
console.log(requestApp);

const globalTimeOut: number = 10000;

describe("GET /users/ table", () => {
    // test to create users table
    test("It should return a 200 code and a message as json response", async () => {
        const response = await request(requestApp).get("/api/users/");
        console.log(response);
        expect(response.statusCode).toBe(200);
    }, globalTimeOut);
});

describe("POST /users/register", () => {
    const userTesting: UserBody = {
        "name":"Unit",
        "second_name": "Testing",
        "email":"unitTesting@mail.com",
        "password":"unittesting123@"
    }
    test("should respond with a 200 code, authentication token and json as content-type header", async () => {
        const response = await request(requestApp).post("/api/users/register").send(userTesting);
        expect(response.statusCode).toBe(200);
        expect(typeof(response.body.token)).toBe("string");
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });
});

describe("POST /users/login", () => {
    const userTesting: UserLogin = {
        "email":"unitTesting@mail.com",
        "password":"unittesting123@"
    }
    test("should respond with a 200 code, authentication token and json as content-type header", async () => {
        const response = await request(requestApp).post("/api/users/login").send(userTesting);
        expect(response.statusCode).toBe(200);
        expect(typeof(response.body.token)).toBe("string");
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });
})