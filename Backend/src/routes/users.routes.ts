import { Router } from "express";
import { createTableUsers, registerUser } from "../controllers";
const router: Router = Router();

router.get("/", createTableUsers);
router.post("/register", registerUser);

export default router;