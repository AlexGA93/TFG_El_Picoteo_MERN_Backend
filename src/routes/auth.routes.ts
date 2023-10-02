import { Router } from "express";
import { login, registerUser } from "../controllers";
import { check } from "express-validator";
import { authenticationByAdmin } from "../auth/auth";
const router: Router = Router();

const passRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

/**
 * *    ^      -> start of the input
 * *    (?=)   -> first condition
 * *    .      -> any character except newline (\n)
 * *    *\d    -> zero or more times any character between [0-9]
 * *    (?=)   -> second condition
 * *    .      -> any character except newline (\n)
 * *    *[a-z] -> zero or more times any character between [a-z]
 * *    (?=)   -> third condition
 * *    .      -> any character except newline (\n)
 * *    *[A-Z] -> zero or more times any character between [A-Z]
 * *    [0-9a-zA-Z] -> following characters must be any of these characters
 * *    {8,}$  -> 8 or more characters at the end
 *
 *
 * * example: "92johnDOE4ever"
 */

const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@elpicoteo\.com$/;

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
  check("role").isString().withMessage("Role must have a valid value"),
  check("role")
    .custom((value) => value === "admin" || value === "employee")
    .withMessage("Role must be a valid one"),
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

export default router;
