import { Router } from "express";
import { getAllStockProducts } from "./menu.controller";
import salesRoutes from "../sales/sales.routes";

const router: Router = Router();

router.get("/menu", getAllStockProducts);
router.use("/sales", salesRoutes);

export default router;
