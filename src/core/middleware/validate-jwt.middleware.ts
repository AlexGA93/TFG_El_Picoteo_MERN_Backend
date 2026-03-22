import { NextFunction, Request, Response } from "express";
import { validateTokenService } from "../../modules/auth/auth.service";
import { asyncHandler } from "../utils/async-handler";
import { HttpError } from "../utils/http-error";

export const validateJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const readedToken = req.header("x-auth-token");
    if (!readedToken) throw new HttpError(401, "Error reading token");

    const user = await validateTokenService(readedToken);
    if (!user) {
      throw new HttpError(
        404,
        "Problema detectado a la hora de comprobar credenciales de usuario para verificacion de token"
      );
    }

    next();
  }
);
