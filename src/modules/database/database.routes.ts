import { Router } from "express";
import {
  checkDDBB,
  createTables,
  insertIntoTables,
} from "./database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../../core/auth/auth";
import dashboardRoutes from "../dashboard/dashboard.routes";
import recipesRoutes from "../recipes/recipes.routes";
import stockRoutes from "../stock/stock.routes";
import inventoryRoutes from "../inventory/inventory.routes";
import ingredientsRoute from "../ingredients/ingredients.routes";

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
router.use("/dashboard", authenticationByBoth, dashboardRoutes);
router.use("/recipes", authenticationByBoth, recipesRoutes);
router.use("/stock", authenticationByBoth, stockRoutes);
router.use("/inventory", authenticationByBoth, inventoryRoutes);
router.use("/ingredients", authenticationByBoth, ingredientsRoute);

export default router;
