import { Router } from "express";
import { getAllStockProducts } from "./menu.controller";

const router: Router = Router();

router.get("/menu", getAllStockProducts);

export default router;
