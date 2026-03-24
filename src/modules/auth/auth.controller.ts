import { config } from "dotenv";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  loginService,
  regenerateTokenService,
  registerUserService,
  validateTokenService,
} from "./auth.service";
import { UserBody, UserLogin } from "../../core/types/auth";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

config();

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, "Errores de validacion", errors.array());
  }

  const result = await registerUserService(req.body as UserBody);
  if (result.status === "missing_password") throw new HttpError(400, "Password es requerido");
  if (result.status === "user_exists")
    throw new HttpError(409, "Usuario existente en la base de datos.");

  return sendSuccess(res, 200, { token: result.token }, "Usuario registrado correctamente");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, "Errores de validacion", errors.array());
  }

  const result = await loginService(req.body as UserLogin);
  if (result.status === "user_not_found") {
    throw new HttpError(404, "Problema detectado a la hora de comprobar credenciales de usuario");
  }
  if (result.status === "invalid_credentials") {
    throw new HttpError(500, "Ocurrio un error validando credenciales");
  }

  return sendSuccess(res, 200, { token: result.token }, "Inicio de sesion correcto");
});

export const validateToken = asyncHandler(async (req: Request, res: Response) => {
  const readedToken = req.header("x-auth-token");
  if (!readedToken) throw new HttpError(401, "Token no proporcionado");

  const user = await validateTokenService(readedToken);
  if (!user) {
    throw new HttpError(
      404,
      "Problema detectado a la hora de comprobar credenciales de usuario para verificacion de token"
    );
  }

  return sendSuccess(
    res,
    200,
    {
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
    },
    "Token valido"
  );
});

export const regenerateToken = asyncHandler(async (req: Request, res: Response) => {
  const readedToken = req.header("x-auth-token");
  if (!readedToken) throw new HttpError(401, "Token no proporcionado");

  const newGeneratedToken = regenerateTokenService(readedToken);
  return sendSuccess(res, 200, { token: newGeneratedToken }, "Token regenerado");
});
