import { Router } from "express";
import * as stockController from "./dashboard.controller";

const router = Router();

router.get("/", stockController.getAll);

export default router;