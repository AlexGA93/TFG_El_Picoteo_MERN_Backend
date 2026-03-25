import { Request, Response } from "express";
import {
  createinventoryService,
  deleteinventoryService,
  getAllinventoryService,
  getinventoryByIdService,
  updateinventoryService,
} from "./inventory.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllinventoryService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getinventoryByIdService(id);
  if (!result) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Producto no encontrado");
  return sendSuccess(res, constants.HTTP_STATUS.OK, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { nombre, tipo, unidades, n_unidades, proveedor, precio_unidad } = req.body;
  const result = await createinventoryService({
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
  await updateinventoryService({
    id,
    nombre,
    tipo,
    unidades,
    n_unidades,
    proveedor,
    precio_unidad,
  });
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Producto actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteinventoryService(id);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Producto eliminado exitosamente");
});
