import { Request, Response } from "express";
import {
  createingredientservice,
  deleteingredientservice,
  getAllingredientsService,
  getIngredienteByIdService,
  updateingredientservice,
} from "./ingredients.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllingredientsService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getIngredienteByIdService(id);
  if (!result) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Ingrediente no encontrado");
  return sendSuccess(res, constants.HTTP_STATUS.OK, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { id, id_producto_stock, id_inventory, cantidades, unidad } = req.body;
  await createingredientservice({ id, id_producto_stock, id_inventory, cantidades, unidad });
  return sendSuccess(res, constants.HTTP_STATUS.CREATED, null, "Ingrediente creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_producto_stock, id_inventory, cantidades, unidad } = req.body;
  await updateingredientservice({ id, id_producto_stock, id_inventory, cantidades, unidad });
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Ingrediente actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteingredientservice(id);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Ingrediente eliminado exitosamente");
});
