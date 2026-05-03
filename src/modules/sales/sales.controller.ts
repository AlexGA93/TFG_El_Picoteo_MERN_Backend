import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";
import { HttpError } from "../../core/utils/http-error";
import {
  createSaleService,
  deleteSaleService,
  getAllSalesService,
  getSaleByIdService,
  updateSaleService,
} from "./sales.service";

export const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const result = await getAllSalesService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSaleByIdService(id);

  if (!result) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Venta no encontrada");

  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { fecha_venta, metodo_pago, id_usuario, total_venta } = req.body;

  const result = await createSaleService({
    fecha_venta,
    metodo_pago,
    id_usuario,
    total_venta,
  });

  return sendSuccess(
    res,
    constants.HTTP_STATUS.CREATED,
    { saleId: result.insertId },
    "Venta creada exitosamente"
  );
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentSale = await getSaleByIdService(id);
  if (!currentSale) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Venta no encontrada");

  const { fecha_venta, metodo_pago, id_usuario, total_venta } = req.body;

  await updateSaleService(id, {
    fecha_venta,
    metodo_pago,
    id_usuario,
    total_venta,
  });

  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Venta actualizada exitosamente");
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentSale = await getSaleByIdService(id);
  if (!currentSale) throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, "Venta no encontrada");

  await deleteSaleService(id);
  return sendSuccess(res, constants.HTTP_STATUS.OK, null, "Venta eliminada exitosamente");
});
