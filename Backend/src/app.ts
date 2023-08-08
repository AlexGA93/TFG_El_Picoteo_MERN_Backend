import express, { Express, Request, Response } from "express";
import { database, users } from "./routes";
require("dotenv").config();

const app: Express = express();

app.use(express.json());
// Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Bienvenido a El Picoteo.sl")
);
app.use("/api/databases", database);
app.use("/api/users/", users);

export default app;