import { Ingredient } from "../../core/types/ingredient";
import {
  createIngrediente,
  deleteIngrediente,
  getAllingredients,
  getIngredienteById,
  updateIngrediente,
} from "./ingredients.model";

export const getAllingredientsService = () => getAllingredients();
export const getIngredienteByIdService = (id: string) => getIngredienteById(id);
export const createingredientservice = (payload: Ingredient) => createIngrediente(payload);
export const updateingredientservice = (payload: Ingredient) => updateIngrediente(payload);
export const deleteingredientservice = (id: string) => deleteIngrediente(id);
