import { Request, Response } from "express";
import {
  createPagoService,
  deletePagoService,
  getAllPagosService,
  getPagoByIdService,
  updatePagoService,
} from "./pagos.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllPagosService();
  return sendSuccess(res, 200, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPagoByIdService(id);
  if (!result) throw new HttpError(404, "Pago no encontrado");
  return sendSuccess(res, 200, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { id_stock } = req.body;
  const result = await createPagoService(id_stock);
  return sendSuccess(res, 201, { paymentId: result.insertId }, "Pago creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_stock } = req.body;
  await updatePagoService(id, id_stock);
  return sendSuccess(res, 200, null, "Pago actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePagoService(id);
  return sendSuccess(res, 200, null, "Pago eliminado exitosamente");
});
