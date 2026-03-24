import { Ingredient } from "../../core/types/ingredient";
import {
  createIngrediente,
  deleteIngrediente,
  getAllIngredientes,
  getIngredienteById,
  updateIngrediente,
} from "./ingredientes.model";

export const getAllIngredientesService = () => getAllIngredientes();
export const getIngredienteByIdService = (id: string) => getIngredienteById(id);
export const createIngredienteService = (payload: Ingredient) => createIngrediente(payload);
export const updateIngredienteService = (payload: Ingredient) => updateIngrediente(payload);
export const deleteIngredienteService = (id: string) => deleteIngrediente(id);
