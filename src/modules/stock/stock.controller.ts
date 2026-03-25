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
import { unlink } from "fs/promises";
import path from "path";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllStockService();
  return sendSuccess(res, constants.HTTP_STATUS.OK, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getStockByIdService(id);
  if (!result) throw new HttpError(404, "Producto no encontrado");

  const responseProduct = {
    ...result,
    imagen: result.url ? `/static/images/${result.url}` : null,
  };

  return sendSuccess(res, constants.HTTP_STATUS.OK, [responseProduct]);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  // extraemos los datos de la peticion
  const {
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
  } = req.body;

  // antes de nada comprobamos que haya o no un registro correspondiente al producto. Si existe paramos proceso y notificamos
  const registeredProducts = await getAllStockService();

  if (!registeredProducts)
    throw new HttpError(
      constants.HTTP_STATUS.CONFLICT,
      "Error encontrado al traerregistro de productos",
    );

  // mapeamos en busca del producto que coincida con el nombre
  const isProductAlreadyRegistered = registeredProducts
    .map((product) => product.nombre_producto === nombre_producto)
    .includes(true);

  // en funcion de que este registrado cortamos y enviamos notificacion
  if (isProductAlreadyRegistered)
    throw new HttpError(
      constants.HTTP_STATUS.NOT_FOUND,
      "Producto ya registrado en la base de datos. Proceso abortado",
    );

  // mediante la url conformamos la direccion de guardado de la imagen
  const imageUrl = req.file ? `/static/images/${req.file.filename}` : null;
  const resultPayload = {
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
    url: imageUrl ?? "",
  };

  const result = await createStockService(resultPayload);

  return sendSuccess(
    res,
    201,
    { productId: result.insertId },
    "Producto creado exitosamente " + imageUrl,
  );
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
    url,
  } = req.body;
  const imageUrl = req.file ? `/static/images/${req.file.filename}` : null;

  await updateStockService({
    id,
    nombre_producto,
    precio_producto,
    tiempo_produccion_min,
    dificultad,
    url: imageUrl ?? "",
  });
  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    null,
    "Producto actualizado exitosamente",
  );
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // buscamos el producto en base al id
  const product = await getStockByIdService(id);
  // reaccionamos a si no ha devuelto nada
  if (!product || !product.url)
    throw new HttpError(
      constants.HTTP_STATUS.NOT_FOUND,
      "Producto no encontrado",
    );

  const productImageName = product.url
    ? product.url.split("/").reverse()[0]
    : null;

  const result = await deleteStockService(id);

  if (result.affectedRows === 0) {
    throw new HttpError(
      constants.HTTP_STATUS.NOT_FOUND,
      "Producto no encontrado",
    );
  }
  // comprobamos si la peticion de borrado ha sido exitosa
  if (productImageName) {
    // todo bien, borramos la imagen local
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        productImageName,
      );
      await unlink(filePath);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    null,
    "Producto eliminado exitosamente",
  );
});
