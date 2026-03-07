import { Router } from "express";
import {
  checkDDBB,
  getDatabaseTables,
  createTables,
  getTableData,
  insertIntoTables,
} from "../controllers/database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
import { getDashboardData } from "../controllers/dashboard/dashboard.controller";
const router: Router = Router();

/**
 * ---------------------------------------------------------------------------
 * PROTECTED ROUTES BY ADMIN
 * ---------------------------------------------------------------------------
 */
router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);
router.get("/mockup-insertion", authenticationByAdmin, insertIntoTables);

/**
 * ---------------------------------------------------------------------------
 * PROTECTED ROUTES BY EMPLOYEE AND ADMIN
 * ---------------------------------------------------------------------------
 */
// dashboard
router.get("/dashboard", authenticationByBoth, getDashboardData);


// Employee + Admin
router.get("/tables", authenticationByBoth, getDatabaseTables);
// router.get("/store", authenticationByBoth, getGlobalStoreData);
router.get("/tables/:table_name", authenticationByBoth, getTableData);

export default router;
