import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { buildRecipesData } from "./recipes.service";
import { recipesView } from "./recipes.view";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    // servicio recipes
    const data = await buildRecipesData();
    // devolvemos respuesta con resultado
    return sendSuccess(res, constants.HTTP_STATUS.OK, recipesView(data), "recipes obtenidas");
});