import { Router } from "express";
import * as inventoryController from "./inventory.controller";

const router = Router();

router.get("/", inventoryController.getAll);
router.get("/:id", inventoryController.getById);
router.post("/", inventoryController.create);
router.put("/:id", inventoryController.update);
router.delete("/:id", inventoryController.remove);

export default router;