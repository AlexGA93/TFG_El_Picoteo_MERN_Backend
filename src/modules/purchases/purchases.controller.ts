import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";
import { HttpError } from "../../core/utils/http-error";
import {
  createPurchaseService,
  deletePurchaseService,
  getAllPurchasesService,
  getPurchaseByIdService,
  updatePurchaseService,
} from "./purchases.service";

export const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const result = await getAllPurchasesService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPurchaseByIdService(id);

  if (!result) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Gasto no encontrado");

  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { fecha_compra, proveedor, id_usuario, total_compra } = req.body;

  const result = await createPurchaseService({
    fecha_compra,
    proveedor,
    id_usuario,
    total_compra,
  });

  return sendSuccess(
    res,
    constants.HTTP_STATUS.CREATED,
    { purchaseId: result.insertId },
    "Gasto creado exitosamente"
  );
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentPurchase = await getPurchaseByIdService(id);
  if (!currentPurchase) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Gasto no encontrado");

  const { fecha_compra, proveedor, id_usuario, total_compra } = req.body;

  await updatePurchaseService(id, {
    fecha_compra,
    proveedor,
    id_usuario,
    total_compra,
  });

  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Gasto actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentPurchase = await getPurchaseByIdService(id);
  if (!currentPurchase) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Gasto no encontrado");

  await deletePurchaseService(id);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Gasto eliminado exitosamente");
});
