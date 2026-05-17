import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";
import { HttpError } from "../../core/utils/http-error";
import {
  createSaleWithItemsService,
  deleteSaleService,
  getAllSalesService,
  getSaleByIdService,
  updateSaleService,
} from "./sales.service";

const toMysqlDatetime = (value: unknown): string => {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, "fecha_venta es obligatoria");
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, "fecha_venta no tiene un formato válido");
  }

  return parsedDate.toISOString().slice(0, 19).replace("T", " ");
};

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
  const { fecha_venta, metodo_pago, id_usuario, total_venta, items } = req.body;
  const fechaVentaMysql = toMysqlDatetime(fecha_venta);

  if (items !== undefined && !Array.isArray(items)) {
    throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, "items debe ser un array");
  }

  const result = await createSaleWithItemsService({
    fecha_venta: fechaVentaMysql,
    metodo_pago,
    id_usuario,
    total_venta,
    items,
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
  const fechaVentaMysql = toMysqlDatetime(fecha_venta);

  await updateSaleService(id, {
    fecha_venta: fechaVentaMysql,
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
