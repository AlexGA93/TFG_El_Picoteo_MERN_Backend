import { Router } from "express";
import { checkDatabase } from "../controllers/database.controller";
const router: Router = Router();

router.get("/comprobar", checkDatabase);
router.get("/crear-tablas");


export default router;