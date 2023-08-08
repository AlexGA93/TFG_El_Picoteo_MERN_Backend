import { config } from 'dotenv';
import request from 'supertest';
config();
const requestApp: string = `${process.env.NODE_HOST}:${process.env.NODE_LOCAL_PORT}`;
console.log(requestApp);

const globalTimeOut: number = 10000;

describe("C.R.U.D users table", () => {
    // test to create users table
    test("It should return a 200 code and a message as json response", async () => {
        const response = await request(requestApp).get("/api/users/");
        console.log(response);
        expect(response.statusCode).toBe(200);
    }, globalTimeOut)
})