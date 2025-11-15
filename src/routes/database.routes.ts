import { Router } from "express";
import {
  checkDDBB,
  getDatabaseTables,
  createTables,
  getTableData,
  getGlobalInventoryData,
  // getGlobalStoreData,
  addProductInventory,
  editProduct,
  deleteProduct,
  insertIntoTables,
} from "../controllers/database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
const router: Router = Router();

/**
 * Endpoints establecimiento:
 * 
 * GET /api/databases/                  -> Comprobar conexion con la base de datos (solo admin)
 * GET /api/databases/create-tables     -> Crear tablas en la base de datos (solo admin)
 * GET /api/databases/mockup-insertion  -> Insertar datos de prueba en las tablas (solo admin)
 * 
 * Peticiones informacion global
 * 
 * GET /api/databases/inventario        -> Obtener datos globales de la tabla Almacen (admin y empleado)
 * GET /api/databases/stock             -> Obtener datos globales de la tabla Stock (admin y empleado)
 * GET /api/databases/ingredientes      -> Obtener datos globales de la table Ingredientes (admin y empleado)
 * GET /api/databases/pagos             -> Obtener datos globales de la tabla Pagos (admin y empleado)
 * 
 */

router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);
router.get("/mockup-insertion", authenticationByAdmin, insertIntoTables);

router.get("/inventario", authenticationByBoth, getGlobalInventoryData);




// Employee + Admin
router.get("/tables", authenticationByBoth, getDatabaseTables);
router.get("/inventory", authenticationByBoth, getGlobalInventoryData);
// router.get("/store", authenticationByBoth, getGlobalStoreData);
router.get("/tables/:table_name", authenticationByBoth, getTableData);

// add new product (Inventario)
router.post("/add-product-inventory", authenticationByAdmin, addProductInventory);
// router.put("/edit-product-inventory", authenticationByAdmin, editProduct);
// router.delete("/delete-product-inventory/:name", authenticationByAdmin, deleteProduct);
export default router;
