import {
  createStock,
  deleteStock,
  getAllStock,
  getStockById,
  updateStock,
} from "./stock.model";

export const getAllStockService = () => getAllStock();
export const getStockByIdService = (id: string) => getStockById(id);
export const createStockService = (payload: {
  nombre_producto: string;
  precio_producto: number;
  tiempo_produccion_min: number;
  dificultad: string;
}) => createStock(payload);
export const updateStockService = (payload: {
  id: string;
  nombre_producto: string;
  precio_producto: number;
  tiempo_produccion_min: number;
  dificultad: string;
}) => updateStock(payload);
export const deleteStockService = (id: string) => deleteStock(id);
