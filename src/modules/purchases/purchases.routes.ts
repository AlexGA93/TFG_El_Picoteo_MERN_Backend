import { Router } from "express";
import * as purchasesController from "./purchases.controller";

const router = Router();

router.get("/", purchasesController.getAll);
router.get("/:id", purchasesController.getById);
router.post("/", purchasesController.create);
router.put("/:id", purchasesController.update);
router.delete("/:id", purchasesController.remove);

export default router;
