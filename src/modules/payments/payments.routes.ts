import { Router } from "express";
import * as paymentsController from "./payments.controller";

const router = Router();

router.get("/", paymentsController.getAll);
router.get("/:id", paymentsController.getById);
router.post("/", paymentsController.create);
router.put("/:id", paymentsController.update);
router.delete("/:id", paymentsController.remove);

export default router;
