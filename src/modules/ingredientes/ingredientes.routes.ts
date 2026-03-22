import { Router } from "express";
import * as ingredientesController from "./ingredientes.controller";

const router = Router();

router.get("/", ingredientesController.getAll);
router.get("/:id", ingredientesController.getById);
router.post("/", ingredientesController.create);
router.put("/:id", ingredientesController.update);
router.delete("/:id", ingredientesController.remove);

export default router;