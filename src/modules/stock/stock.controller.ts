import { Request, Response } from "express";
import {
  createStockService,
  deleteStockService,
  getAllStockService,
  getStockByIdService,
  updateStockService,
} from "./stock.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllStockService();
  return sendSuccess(res, 200, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getStockByIdService(id);
  if (!result) throw new HttpError(404, "Producto no encontrado");
  return sendSuccess(res, 200, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { nombre_producto, precio_producto, tiempo_produccion_min, dificultad } = req.body;
  const result = await createStockService({
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
  });
  return sendSuccess(res, 201, { productId: result.insertId }, "Producto creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre_producto, precio_producto, tiempo_produccion_min, dificultad } = req.body;
  await updateStockService({
    id,
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
  });
  return sendSuccess(res, 200, null, "Producto actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteStockService(id);
  return sendSuccess(res, 200, null, "Producto eliminado exitosamente");
});
