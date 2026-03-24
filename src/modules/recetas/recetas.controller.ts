import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { buildRecipesData } from "./recetas.service";
import { recipesView } from "./recetas.view";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    // servicio recetas
    const data = await buildRecipesData();
    // devolvemos respuesta con resultado
    return sendSuccess(res, 200, recipesView(data), "Recetas obtenidas");
});