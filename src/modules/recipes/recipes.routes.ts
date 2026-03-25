import { Router } from "express";
import * as stockController from "./recipes.controller";

const router = Router();

router.get("/", stockController.getAll);

export default router;