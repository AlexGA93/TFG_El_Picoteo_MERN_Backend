import express, { Express, Request, Response } from "express";
import { database, users, auth, menu } from "./core/routes";
import cors from "cors";
import path from "path";
import { errorHandler } from "./core/middleware/error-handler.middleware";
import { sendError } from "./core/views/api-response.view";
import { constants } from "./core/utils/constants";
require("dotenv").config();

const app: Express = express();

const publicDir = path.join(process.cwd(), "public");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use("/static", express.static(publicDir));

// Routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({mssg:"Bienvenido a El Picoteo.sl"})
);

// rutas privadas
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/databases", database);

// rutas publicas
app.use("/api/public", menu);

app.use((req: Request, res: Response) => sendError(res, constants.HTTP_STATUS.NOT_FOUND, "Ruta no encontrada"));

app.use(errorHandler);

export default app;
