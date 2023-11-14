import { Router } from "express";
import { checkDDBB, getDatabaseTables, createTables, getTableData } from "../controllers/database.controller";
import { authenticationByAdmin } from "../auth/auth";
const router: Router = Router();

router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);

// tables
router.get("/tables",authenticationByAdmin, getDatabaseTables);
router.get("/tables/:table_name", authenticationByAdmin, getTableData);

export default router;