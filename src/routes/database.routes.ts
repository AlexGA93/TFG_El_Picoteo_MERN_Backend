import { Router } from "express";
import { checkDDBB, getDatabaseTables, createTables, getTableData, getGlobalInventoryData, getGlobalStoreData } from "../controllers/database.controller";
import { authenticationByAdmin } from "../auth/auth";
const router: Router = Router();

router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);

// tables
router.get("/tables",authenticationByAdmin, getDatabaseTables);
router.get("/inventory", authenticationByAdmin, getGlobalInventoryData);
router.get("/store", authenticationByAdmin, getGlobalStoreData);
router.get("/tables/:table_name", authenticationByAdmin, getTableData);

export default router;