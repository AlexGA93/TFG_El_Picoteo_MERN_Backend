import { Router } from "express";
import {
  checkDDBB,
  createTables,
  insertIntoTables,
} from "./database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../../core/auth/auth";
import dashboardRoutes from "../dashboard/dashboard.routes";
import recetasRoutes from "../recetas/recetas.routes";
import stockRoutes from "../stock/stock.routes";
import inventarioRoutes from "../inventario/inventario.routes";
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
router.get("/dashboard", authenticationByBoth, dashboardRoutes);
router.get("/recetas", authenticationByBoth, recetasRoutes);
router.get("/stock", authenticationByBoth, stockRoutes);
router.get("/inventario", authenticationByBoth, inventarioRoutes);

export default router;
