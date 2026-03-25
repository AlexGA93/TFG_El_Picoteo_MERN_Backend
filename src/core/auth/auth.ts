import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { VerifiedTokenType } from "../types/auth";

const jwtKey: string = "ElPicoteoTFG";
const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@elpicoteo\.com$/;
type UserRole = "admin" | "employee";
type TokenPayload = JwtPayload & { email?: string; rol_usuario?: string };

export const generateAuthToken = (email: string, rol_usuario: string): string =>
  jwt.sign({ email, rol_usuario }, jwtKey, { expiresIn: "2h" });

export const verifyToken = (token: string): string | jwt.JwtPayload | VerifiedTokenType => {
  return jwt.verify(token, jwtKey);
};

const authorizeByRoles = (allowedRoles: UserRole[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ mssg: "Necesaria Autenticacion" });
    }

    const decoded = verifyToken(token) as TokenPayload;
    const email = decoded.email;
    const rolUsuario = decoded.rol_usuario;

    if (
      !email ||
      !rolUsuario ||
      !emailRegex.test(email) ||
      !allowedRoles.includes(rolUsuario as UserRole)
    ) {
      return res.status(401).json({ mssg: "Error durante proceso de autenticacion" });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ mssg: "Necesaria Autenticacion" });
  }
};

export const authenticationByAdmin = authorizeByRoles(["admin"]);

export const authenticationByEmployee = authorizeByRoles(["employee"]);

export const authenticationByBoth = authorizeByRoles(["employee", "admin"]);
