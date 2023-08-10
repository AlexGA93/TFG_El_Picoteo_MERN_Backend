import app from "../app";
import request from 'supertest';

describe("GET /", ()=>{
    test("should return a message with a 200 status code", async() => {
        const response = await request(app).get("/");
        // console.log(response);
        expect(response.statusCode).toBe(200);
    })
})