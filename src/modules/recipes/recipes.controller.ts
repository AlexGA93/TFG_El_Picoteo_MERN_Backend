import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import {
  getRecipesData,
  getRecipeDataById,
  createRecipeData,
  updateRecipeData,
  deleteRecipeData,
} from "./recipes.service";
import { createdRecipeView, recipesView, recipeView } from "./recipes.view";
import { constants } from "../../core/utils/constants";
import { log } from "console";
import { RecipeIngredientToCreate } from "../../core/types/recipes";

const getBaseUrl = (req: Request) => {
  const publicBaseUrl = process.env.PUBLIC_BACKEND_URL?.replace(/\/$/, "");
  return publicBaseUrl || `${req.protocol}://${req.get("host")}`;
};

/**
 * @desc    Obtener todas las recetas
 * @route   GET /api/databases/recipes
 * @access  Private (Empleado y Admin)
 */
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  // servicio recipes
  const data = await getRecipesData();
  const baseUrl = getBaseUrl(req);
  // devolvemos respuesta con resultado
  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    recipesView(data, baseUrl),
    "recipes obtenidas",
  );
});

/**
 * @desc    Obtener receta por ID
 * @route   GET /api/databases/recipes/:id
 * @access  Private (Empleado y Admin)
 */
export const getById = asyncHandler(async (req: Request, res: Response) => {
  // sacamos el id de los parametros
  const { id } = req.params;

  // servicio recipes
  const data = await getRecipeDataById(id);
  const baseUrl = getBaseUrl(req);

  if (!data) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.NOT_FOUND,
      null,
      "receta no encontrada",
    );
  }

  // devolvemos respuesta con resultado
  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    recipeView(data, baseUrl),
    "receta obtenida",
  );
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  // extraemos los datos del cuerpo de la petición
  const {
    nombre,
    precio,
    tiempo_produccion_min,
    dificultad,
    url,
    ingredients,
  } = req.body;
  // log("req.body:", req.body);

  const ingredientsParsed = JSON.parse(ingredients);
  console.log(ingredientsParsed);
  
  // imprimimos las condiciones
  // console.log(!nombre);
  // console.log(!precio);
  // console.log(!tiempo_produccion_min);
  // console.log(!dificultad);
  // console.log(!url);
  // console.log(!Array.isArray(ingredientsParsed));
  // console.log(ingredients.length === 0);
  

  if (
    !nombre ||
    !precio ||
    !tiempo_produccion_min ||
    !dificultad ||
    !url ||
    !Array.isArray(ingredientsParsed) ||
    ingredients.length === 0
  ) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.BAD_REQUEST,
      null,
      "Faltan datos obligatorios o ingredientes",
    );
  }

  const invalidIngredient = ingredientsParsed.some(
    (ingredient: any) =>
      !ingredient ||
      typeof ingredient.id_inventory !== "number" ||
      typeof ingredient.cantidad !== "number" ||
      !ingredient.unidad,
  );

  if (invalidIngredient) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.BAD_REQUEST,
      null,
      "Cada ingrediente debe tener id_inventory, cantidad y unidad válidos",
    );
  }

  const data = await createRecipeData({
    nombre,
    precio,
    tiempo_produccion_min,
    dificultad,
    url,
    ingredients: ingredientsParsed,
  });

  //caso data null
  if (!data) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.INTERNAL_SERVER_ERROR,
      null,
      "Error al crear la receta",
    );
  }

  // devolvemos respuesta con resultado

  return sendSuccess(
    res,
    constants.HTTP_STATUS.CREATED,
    createdRecipeView(data, getBaseUrl(req)),
    "receta creada",
  );
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    precio,
    tiempo_produccion_min,
    dificultad,
    url,
    ingredients,
  } = req.body;
  // console.log({id});
  console.log(req.body);
  
  
  const ingredientsParsed = JSON.parse(ingredients);   
  console.log(url);
     
  if (
    !nombre ||
    !precio ||
    !tiempo_produccion_min ||
    !dificultad ||
    !url ||
    !Array.isArray(ingredientsParsed) ||
    ingredients.length === 0
  ) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.BAD_REQUEST,
      null,
      "Faltan datos obligatorios o ingredientes",
    );
  }
  // console.log(ingredientsParsed);
  
  const invalidIngredient = ingredientsParsed.some(
    (ingredient: any) =>
      !ingredient ||
      typeof ingredient.id_inventory !== "number" ||
      typeof ingredient.cantidad !== "number" ||
      !ingredient.unidad,
  );

  if (invalidIngredient) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.BAD_REQUEST,
      null,
      "Cada ingrediente debe tener id_inventory, cantidad y unidad válidos",
    );
  }

  const data = await updateRecipeData(id, {
    nombre,
    precio,
    tiempo_produccion_min,
    dificultad,
    url,
    ingredients: ingredientsParsed,
  });

  if (!data) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.NOT_FOUND,
      null,
      "receta no encontrada",
    );
  }

  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    recipeView(data, getBaseUrl(req)),
    "receta actualizada",
  );
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await deleteRecipeData(id);

  if (!deleted) {
    return sendSuccess(
      res,
      constants.HTTP_STATUS.NOT_FOUND,
      null,
      "receta no encontrada",
    );
  }

  return sendSuccess(
    res,
    constants.HTTP_STATUS.OK,
    null,
    "receta eliminada",
  );
});
