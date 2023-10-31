import express, { Express, Request, Response } from "express";
import { database, users, auth } from "./routes";
require("dotenv").config();
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());
// Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({mssg:"Bienvenido a El Picoteo.sl"})
);
app.use("/api/auth/",auth);
app.use("/api/users/", users);
app.use("/api/databases", database);

export default app;