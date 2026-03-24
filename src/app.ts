import express, { Express, Request, Response } from "express";
import { database, users, auth } from "./core/routes";
import cors from "cors";
import path from "path";
import { errorHandler } from "./core/middleware/error-handler.middleware";
import { sendError } from "./core/views/api-response.view";
require("dotenv").config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

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
