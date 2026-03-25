import { Request, Response } from "express";
import {
  createpaymentservice,
  deletepaymentservice,
  getAllpaymentsService,
  getPagoByIdService,
  updatepaymentservice,
} from "./payments.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllpaymentsService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPagoByIdService(id);
  if (!result) throw new HttpError(404, "Pago no encontrado");
  return sendSuccess(res, constants.HTTP_STATUS.OK, [result]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { id_stock } = req.body;
  const result = await createpaymentservice(id_stock);
  return sendSuccess(res, constants.HTTP_STATUS.CREATED, { paymentId: result.insertId }, "Pago creado exitosamente");
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_stock } = req.body;
  await updatepaymentservice(id, id_stock);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Pago actualizado exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletepaymentservice(id);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Pago eliminado exitosamente");
});
