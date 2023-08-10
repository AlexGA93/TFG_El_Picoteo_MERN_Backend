import { Router } from "express";
import { createTableUsers, login, registerUser } from "../controllers";
import { body } from "express-validator";
const router: Router = Router();

router.get("/", createTableUsers);



export default router;
