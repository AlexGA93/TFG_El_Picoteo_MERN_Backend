import { CompleteStock, Stock } from "../../core/types/stock";
import {
  createStock,
  deleteStock,
  getAllStock,
  getStockById,
  updateStock,
} from "./stock.model";

export const getAllStockService = () => getAllStock();

export const getStockByIdService = (id: string) => getStockById(id);

export const createStockService = (payload: CompleteStock) => createStock(payload);

export const updateStockService = (payload: Stock) => updateStock(payload);

export const deleteStockService = (id: string) => deleteStock(id);
