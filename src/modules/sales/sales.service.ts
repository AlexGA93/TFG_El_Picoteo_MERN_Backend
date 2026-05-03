import { Sale } from "../../core/types/sales";
import {
  createSale,
  deleteSale,
  deleteSaleItemsBySaleId,
  getAllSales,
  getSaleById,
  updateSale,
} from "./sales.model";

export const getAllSalesService = () => getAllSales();
export const getSaleByIdService = (id: string) => getSaleById(id);
export const createSaleService = (payload: Sale) => createSale(payload);
export const updateSaleService = (id: string, payload: Sale) => updateSale(id, payload);
export const deleteSaleService = async (id: string) => {
  await deleteSaleItemsBySaleId(id);
  return deleteSale(id);
};
