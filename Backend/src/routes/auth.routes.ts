import { Router } from "express";
import { createTableUsers, login, registerUser } from "../controllers";
import { body } from "express-validator";
const router: Router = Router();


router.post("/register", registerUser);
router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  login
);


export default router;