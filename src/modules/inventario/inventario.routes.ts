import { Router } from "express";
import * as inventarioController from "./inventario.controller";

const router = Router();

router.get("/", inventarioController.getAll);
router.get("/:id", inventarioController.getById);
router.post("/", inventarioController.create);
router.put("/:id", inventarioController.update);
router.delete("/:id", inventarioController.remove);

export default router;