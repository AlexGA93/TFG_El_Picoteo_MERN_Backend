import { config } from "dotenv";
import { Request, Response } from "express";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "./users.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";
import { UpdateUserParams } from "../../core/types/auth";

config();

export const getUsersFromTable = asyncHandler(async (req: Request, res: Response) => {
  const users = await getUsersService();
  return sendSuccess(res, 200, { users }, "Usuarios obtenidos correctamente");
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserService(userId);

  if (!user) {
    throw new HttpError(404, "Problema detectado a la hora de comprobar presencia de usuario");
  }
  return sendSuccess(res, 200, user, "Usuario obtenido correctamente");
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userParams: UpdateUserParams = {userId: req.params.id, newParameters: req.body};
  const updated = await updateUserService(userParams);
  if (!updated) {
    throw new HttpError(404, "Problema detectado a la hora de comprobar presencia de usuario");
  }
  return sendSuccess(res, 200, null, "Usuario Actualizado correctamente");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const deleted = await deleteUserService(userId);
  if (!deleted) {
    throw new HttpError(404, "Problema detectado a la hora de encontrar usuario");
  }
  return sendSuccess(res, 200, null, "Usuario Eliminado correctamente");
});
