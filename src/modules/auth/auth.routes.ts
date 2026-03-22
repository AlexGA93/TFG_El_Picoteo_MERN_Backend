import { Router } from "express";
import { login, registerUser, regenerateToken, validateToken } from "./auth.controller";
import { check } from "express-validator";
import { validateJWT } from "../../core/middleware/validate-jwt.middleware";
import { emailRegex, passRegex } from "../../core/utils/utilities";
const router: Router = Router();


// PROTECTED ROUTE BY ADMIN
router.post(
  "/register",
  check("email").isEmail().withMessage("Email must have a valid format"),
  check("email")
    .matches(emailRegex, "i")
    .withMessage("Email must allow to the correct domain"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters"),
  check("password")
    .matches(passRegex, "i")
    .withMessage("Please enter a valid password"),
  check("rol_usuario").isString().withMessage("rol_usuario must have a valid value"),
  check("rol_usuario")
    .custom((value) => value === "admin" || value === "employee")
    .withMessage("rol_usuario must be a valid one"),
  registerUser
);

router.post(
  "/login",
  check("email").isEmail().withMessage("Email must have a valid format"),
  check("email")
    .matches(emailRegex, "i")
    .withMessage("Email must allow to the correct domain"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters"),
  check("password")
    .matches(passRegex, "i")
    .withMessage("Please enter a valid password"),
  login
);

/**
 * Regeneration token validation
 * Must pass through a middleware where it'll check if user exists or not
 * if it matches
 */
router.get("/renew", validateJWT, regenerateToken)

router.get("/validate", validateJWT, validateToken);

export default router;
