import { Router } from "express";
import * as pagosController from "../../controllers/inventario/inventario.controller";

const router = Router();

router.get("/", pagosController.getAll);
router.get("/:id", pagosController.getById);
router.post("/", pagosController.create);
router.put("/:id", pagosController.update);
router.delete("/:id", pagosController.remove);

export default router;