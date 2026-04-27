import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { constants } from "../../core/utils/constants";
import { getPublicMenuStockService } from "./menu.service";

const buildImageUrl = (req: Request, fileName?: string | null) => {
  if (!fileName) return null;

  const publicBaseUrl = process.env.PUBLIC_BACKEND_URL?.replace(/\/$/, "");
  const requestBaseUrl = `${req.protocol}://${req.get("host")}`;
  const baseUrl = publicBaseUrl || requestBaseUrl;

  return `${baseUrl}/static/images/${fileName}`;
};

const serializeMenuProduct = (req: Request, product: any) => {
  const { url, ...productData } = product;

  return {
    ...productData,
    imagen: buildImageUrl(req, url),
  };
};

export const getAllStockProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getPublicMenuStockService();
    const products = result.map((product) => serializeMenuProduct(req, product));

    return sendSuccess(
      res,
      constants.HTTP_STATUS.OK,
      products,
      "Productos de menu obtenidos exitosamente",
    );
  },
);
