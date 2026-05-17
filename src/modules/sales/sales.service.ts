import mysqlPool from "../../core/db/db";
import { Sale, SaleCreatePayload } from "../../core/types/sales";
import {
  createSale,
  createSaleItemWithConn,
  createSaleWithConn,
  deleteSale,
  deleteSaleItemsBySaleId,
  getAllSales,
  getSaleById,
  updateSale,
} from "./sales.model";

export const getAllSalesService = () => getAllSales();
export const getSaleByIdService = (id: string) => getSaleById(id);
export const createSaleService = (payload: Sale) => createSale(payload);
export const createSaleWithItemsService = async (payload: SaleCreatePayload) => {
  const connection = await mysqlPool.promise().getConnection();
  try {
    await connection.beginTransaction();
    const saleResult = await createSaleWithConn(connection, payload);
    const saleId = saleResult.insertId;

    if (payload.items?.length) {
      for (const item of payload.items) {
        await createSaleItemWithConn(connection, saleId, item);
      }
    }

    await connection.commit();
    return saleResult;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
export const updateSaleService = (id: string, payload: Sale) => updateSale(id, payload);
export const deleteSaleService = async (id: string) => {
  await deleteSaleItemsBySaleId(id);
  return deleteSale(id);
};
