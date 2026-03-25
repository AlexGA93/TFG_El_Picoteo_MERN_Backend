import { Router } from "express";
import * as ingredientsController from "./ingredients.controller";

const router = Router();

router.get("/", ingredientsController.getAll);
router.get("/:id", ingredientsController.getById);
router.post("/", ingredientsController.create);
router.put("/:id", ingredientsController.update);
router.delete("/:id", ingredientsController.remove);

export default router;