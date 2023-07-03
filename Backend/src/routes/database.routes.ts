import { Router } from "express";
import { checkDDBB } from "../controllers/database.controller";
const router: Router = Router();

/**
 * Comporbar si existe la base de datos
 * Comporbar si hay tablas en la base de datos
 * 
 * Traer contenido de una tabla
 */

router.get("/check-ddbb", checkDDBB);


export default router;