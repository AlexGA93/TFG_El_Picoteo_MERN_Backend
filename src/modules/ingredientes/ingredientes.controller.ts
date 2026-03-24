import { Request, Response } from "express";
import {
  createIngredienteService,
  deleteIngredienteService,
  getAllIngredientesService,
  getIngredienteByIdService,
  updateIngredienteService,
} from "./ingredientes.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllIngredientesService();
  return sendSuccess(res, 200, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getIngredienteByIdService(id);
  if (!result) throw new HttpError(404, "Ingrediente no encontrado");
  return sendSuccess(res, 200, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { id, id_producto_stock, id_inventario, cantidades, unidad } = req.body;
  await createIngredienteService({ id, id_producto_stock, id_inventario, cantidades, unidad });
  return sendSuccess(res, 201, null, "Ingrediente creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_producto_stock, id_inventario, cantidades, unidad } = req.body;
  await updateIngredienteService({ id, id_producto_stock, id_inventario, cantidades, unidad });
  return sendSuccess(res, 200, null, "Ingrediente actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteIngredienteService(id);
  return sendSuccess(res, 200, null, "Ingrediente eliminado exitosamente");
});
