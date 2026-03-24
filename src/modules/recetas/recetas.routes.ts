import { Router } from "express";
import * as stockController from "./recetas.controller";

const router = Router();

router.get("/", stockController.getAll);

export default router;