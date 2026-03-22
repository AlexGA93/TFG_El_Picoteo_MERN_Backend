import express, { Express, Request, Response } from "express";
import { database, users, auth } from "./core/routes";
require("dotenv").config();
import cors from "cors";
import { errorHandler } from "./core/middleware/error-handler.middleware";
import { sendError } from "./core/views/api-response.view";

const app: Express = express();

app.use(cors());
app.use(express.json());
// Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({mssg:"Bienvenido a El Picoteo.sl"})
);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/databases", database);
app.use((req: Request, res: Response) => sendError(res, 404, "Ruta no encontrada"));
app.use(errorHandler);

export default app;
