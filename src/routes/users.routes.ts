import { Router } from "express";
import { authenticationByAdmin, authenticationByBoth } from "../auth/auth";
import { deleteUser, getUser, getUsersFromTable, updateUser } from "../controllers";
const router: Router = Router();

router.get("/",authenticationByAdmin,  getUsersFromTable);
router.get("/:id", authenticationByBoth, getUser);
router.put("/:id", authenticationByAdmin, updateUser);
router.delete("/:id", authenticationByAdmin, deleteUser);

export default router;
