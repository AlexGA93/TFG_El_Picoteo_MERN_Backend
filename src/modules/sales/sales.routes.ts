import { Router } from "express";
import * as salesController from "./sales.controller";

const router = Router();

router.get("/", salesController.getAll);
router.get("/:id", salesController.getById);
router.post("/", salesController.create);
router.put("/:id", salesController.update);
router.delete("/:id", salesController.remove);

export default router;
