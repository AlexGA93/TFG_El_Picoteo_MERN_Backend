import { Router } from "express";
import {
  checkDDBB,
  getDatabaseTables,
  createTables,
  getTableData,
  addProductInventory,
  insertIntoTables,
} from "../controllers/database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
import inventarioRouter  from "./database/inventario.routes";
import stockRouter  from "./database/stock.routes";
import ingredientesRouter  from "./database/ingredientes.routes";
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
// Inventario
router.use("/inventario", authenticationByBoth, inventarioRouter);
// Stock
router.use("/stock", authenticationByBoth, stockRouter);
// Ingredientes
router.use("/ingredientes", authenticationByBoth, ingredientesRouter);
// Pagos
router.use("/pagos", authenticationByBoth, ingredientesRouter);


// Employee + Admin
router.get("/tables", authenticationByBoth, getDatabaseTables);
// router.get("/store", authenticationByBoth, getGlobalStoreData);
router.get("/tables/:table_name", authenticationByBoth, getTableData);




// add new product (Inventario)
router.post("/add-product-inventory", authenticationByAdmin, addProductInventory);
// router.put("/edit-product-inventory", authenticationByAdmin, editProduct);
// router.delete("/delete-product-inventory/:name", authenticationByAdmin, deleteProduct);
export default router;
