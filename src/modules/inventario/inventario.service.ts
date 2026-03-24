import { Inventory } from "../../core/types/inventory";
import {
  createInventario,
  deleteInventario,
  getAllInventario,
  getInventarioById,
  updateInventario,
} from "./inventario.model";

export const getAllInventarioService = () => getAllInventario();
export const getInventarioByIdService = (id: string) => getInventarioById(id);
export const createInventarioService = (payload: Inventory) => createInventario(payload);
export const updateInventarioService = (payload: Inventory) => updateInventario(payload);
export const deleteInventarioService = (id: string) => deleteInventario(id);
