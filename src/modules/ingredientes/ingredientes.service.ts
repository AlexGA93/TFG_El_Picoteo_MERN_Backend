import {
  createIngrediente,
  deleteIngrediente,
  getAllIngredientes,
  getIngredienteById,
  updateIngrediente,
} from "./ingredientes.model";

export const getAllIngredientesService = () => getAllIngredientes();
export const getIngredienteByIdService = (id: string) => getIngredienteById(id);
export const createIngredienteService = (payload: {
  id_producto_stock: number;
  id_inventario: number;
  cantidades: number;
  unidad: string;
}) => createIngrediente(payload);
export const updateIngredienteService = (payload: {
  id: string;
  id_producto_stock: number;
  id_inventario: number;
  cantidades: number;
  unidad: string;
}) => updateIngrediente(payload);
export const deleteIngredienteService = (id: string) => deleteIngrediente(id);
