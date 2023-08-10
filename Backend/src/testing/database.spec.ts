import { config } from 'dotenv';
import request from 'supertest';
config();
const requestApp: string = `${process.env.NODE_HOST}:${process.env.NODE_LOCAL_PORT}`;
const globalTimeOut: number = 10000;

describe("GET /api/databases", ()=>{
    // test to show databases
    test("It should return 200 code and databases", async ()=>{
        const response = await request(requestApp).get("/api/databases/");
        console.log(response.body);
        expect(response.status).toBe(200);

    }, globalTimeOut);

    //  test to show databases's tables
    test("It should return a 200 status code with the databases tables", async() => {
        const response = await request(requestApp).get("/api/databases/:database_name/tables");
        expect(response.status).toBe(200);
        expect(response.body.result).toBeDefined();
    }, globalTimeOut)
});

// describe post para rutas protegidas
