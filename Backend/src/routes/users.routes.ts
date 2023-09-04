import { Router } from "express";
import { createTableUsers, getUser, login, registerUser, updateUser } from "../controllers";
import { body } from "express-validator";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
const router: Router = Router();

router.get("/", authenticationByAdmin, createTableUsers);
router.get("/:id", authenticationByBoth, getUser);
router.put("/:id", authenticationByAdmin, updateUser);



export default router;
