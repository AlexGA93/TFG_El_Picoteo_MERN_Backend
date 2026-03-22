import { Router } from "express";
import { authenticationByAdmin, authenticationByBoth } from "../../core/auth/auth";
import { deleteUser, getUser, getUsersFromTable, updateUser } from "./users.controller";
const router: Router = Router();

router.get("/",authenticationByAdmin,  getUsersFromTable);
router.get("/:id", authenticationByBoth, getUser);
router.put("/:id", authenticationByAdmin, updateUser);
router.delete("/:id", authenticationByAdmin, deleteUser);

export default router;
