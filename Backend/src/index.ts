import express, { Express, Request, Response } from "express";
import { database } from "./routes";
// import { mysqlConnection } from "./db/db";
require("dotenv").config();

const app: Express = express();



app.use(express.json());
// Routes
app.use("/api/ddbb", database);

const PORT: string = process.env.NODE_DOCKER_PORT!;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));