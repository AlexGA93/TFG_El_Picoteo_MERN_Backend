import {
  createInventario,
  deleteInventario,
  getAllInventario,
  getInventarioById,
  updateInventario,
} from "./inventario.model";

export const getAllInventarioService = () => getAllInventario();
export const getInventarioByIdService = (id: string) => getInventarioById(id);
export const createInventarioService = (payload: {
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
}) => createInventario(payload);
export const updateInventarioService = (payload: {
  id: string;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
}) => updateInventario(payload);
export const deleteInventarioService = (id: string) => deleteInventario(id);
