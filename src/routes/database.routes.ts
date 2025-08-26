import { Router } from "express";
import {
  checkDDBB,
  getDatabaseTables,
  createTables,
  getTableData,
  getGlobalInventoryData,
  getGlobalStoreData,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/database.controller";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
const router: Router = Router();

// ADMIN
router.get("/", authenticationByAdmin, checkDDBB);
router.get("/create-tables", authenticationByAdmin, createTables);

// Employee + Admin
router.get("/tables", authenticationByBoth, getDatabaseTables);
router.get("/inventory", authenticationByBoth, getGlobalInventoryData);
router.get("/store", authenticationByBoth, getGlobalStoreData);
router.get("/tables/:table_name", authenticationByBoth, getTableData);

// add new product
router.post("/add-product-inventory", authenticationByAdmin, addProduct);
router.put("/edit-product-inventory", authenticationByAdmin, editProduct);
router.delete("/delete-product-inventory/:name", authenticationByAdmin, deleteProduct);
export default router;
