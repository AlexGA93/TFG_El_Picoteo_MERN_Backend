import { Request, Response } from "express";
import {
  createInventarioService,
  deleteInventarioService,
  getAllInventarioService,
  getInventarioByIdService,
  updateInventarioService,
} from "./inventario.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

export const getDatabaseInventory = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllInventarioService();
  return sendSuccess(res, 200, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getInventarioByIdService(id);
  if (!result) throw new HttpError(404, "Producto no encontrado");
  return sendSuccess(res, 200, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { nombre, tipo, unidades, n_unidades, proveedor, precio_unidad } = req.body;
  const result = await createInventarioService({
    nombre,
    tipo,
    unidades,
    n_unidades,
    proveedor,
    precio_unidad,
  });
  return sendSuccess(res, 201, { productId: result.insertId }, "Producto creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, tipo, unidades, n_unidades, proveedor, precio_unidad } = req.body;
  await updateInventarioService({
    id,
    nombre,
    tipo,
    unidades,
    n_unidades,
    proveedor,
    precio_unidad,
  });
  return sendSuccess(res, 200, null, "Producto actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteInventarioService(id);
  return sendSuccess(res, 200, null, "Producto eliminado exitosamente");
});
