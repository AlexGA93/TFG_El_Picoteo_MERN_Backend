import { Router } from "express";
import { checkDDBB, getDatabaseTables, createTables } from "../controllers/database.controller";
import { authenticationByAdmin } from "../auth/auth";
const router: Router = Router();

router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);
router.get("/:database_name/tables", getDatabaseTables);
// router.post("/:database_name/tables", createTable);


export default router;