import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const jwtKey: string = "ElPicoteoTFG";
const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@elpicoteo\.com$/;
export const generateAuthToken = (email: string, role?: string): string =>
  jwt.sign({ email, role }, jwtKey, { expiresIn: "2h" });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtKey);
  } catch (error) {
    console.error(
      "Proceso de cerificacion de toke fue interrumpido. Necesaria su revision"
    );
    throw error;
  }
};

export const authenticationByAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract jwt from headers
    const token = req.header("x-auth-token");

    if (!token) {
      throw new Error();
    }

    const decoded: string | JwtPayload = jwt.verify(token, jwtKey);

    if (
      ((decoded as JwtPayload).email as string).match(emailRegex) &&
      (decoded as JwtPayload).role === "admin"
    ) {
      console.log("autenticacion de admin existosa");
      next();
    } else {
      res.status(401).json({ mssg: "Error durante proceso de autenticacion" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("Necesaria Autenticacion");
  }
};


export const authenticationByEmployee = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // extract jwt from headers
      const token = req.header("x-auth-token");
  
      if (!token) {
        throw new Error();
      }
  
      const decoded: string | JwtPayload = jwt.verify(token, jwtKey);
  
      if (
        ((decoded as JwtPayload).email as string).match(emailRegex) &&
        (decoded as JwtPayload).role === "employee"
      ) {
        console.log("autenticacion de empleado existosa");
        next();
      } else {
        res.status(401).json({ mssg: "Error durante proceso de autenticacion" });
      }
    } catch (error) {
      console.error(error);
      res.status(401).send("Necesaria Autenticacion");
    }
  };
  
  export const authenticationByBoth = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // extract jwt from headers
      const token = req.header("x-auth-token");
  
      if (!token) {
        throw new Error();
      }
  
      const decoded: string | JwtPayload = jwt.verify(token, jwtKey);
  
      if (
        ((decoded as JwtPayload).email as string).match(emailRegex) &&
        (decoded as JwtPayload).role === "employee" || (decoded as JwtPayload).role === "admin" 
      ) {
        console.log("autenticacion existosa");
        next();
      } else {
        res.status(401).json({ mssg: "Error durante proceso de autenticacion" });
      }
    } catch (error) {
      console.error(error);
      res.status(401).send("Necesaria Autenticacion");
    }
  };