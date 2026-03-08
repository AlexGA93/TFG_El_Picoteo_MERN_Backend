import { Router } from "express";
import {
  checkDDBB,
  getDatabaseTables,
  createTables,
  getTableData,
  insertIntoTables,
} from "./database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../../core/auth/auth";
import { getDashboardData } from "../dashboard/dashboard.controller";
import inventarioRouter from "../inventario/inventario.routes";
import stockRouter from "../stock/stock.routes";
import ingredientesRouter from "../ingredientes/ingredientes.routes";
import pagosRouter from "../pagos/pagos.routes";
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
router.use("/inventario", authenticationByBoth, inventarioRouter);
router.use("/stock", authenticationByBoth, stockRouter);
router.use("/ingredientes", authenticationByBoth, ingredientesRouter);
router.use("/pagos", authenticationByBoth, pagosRouter);

export default router;
