import express, { Express, Request, Response } from "express";
import { database } from "./routes";
// import { mysqlPool } from "./db/db";

require("dotenv").config();

const app: Express = express();

app.use(express.json());
// Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Bienvenido a El Picoteo .sl")
);
app.use("/api/databases", database);

const PORT: string | number = process.env.NODE_DOCKER_PORT! || 5000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
