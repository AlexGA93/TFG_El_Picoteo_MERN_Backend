import { ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { QueryParams, Sale, SaleItem } from "../../core/types/sales";

const queryAsync = <T = RowDataPacket[]>(
  sql: string,
  params: QueryParams = []
): Promise<T> => {
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result as T);
    });
  });
};

export const getAllSales = () =>
  queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.sales.GET_ALL);

export const getSaleById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.sales.GET_BY_ID,
    [id]
  );

  if (!result[0]) return null;

  const items = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.sales.GET_ITEMS_BY_SALE_ID,
    [id]
  );

  return { ...result[0], items };
};

export const createSale = (payload: Sale) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.INSERT_SALE,
    [payload.fecha_venta, payload.metodo_pago, payload.id_usuario, payload.total_venta]
  );

export const createSaleWithConn = async (
  connection: PoolConnection,
  payload: Sale
) => {
  const [result] = await connection.query<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.INSERT_SALE,
    [payload.fecha_venta, payload.metodo_pago, payload.id_usuario, payload.total_venta]
  );
  return result;
};

export const createSaleItemWithConn = async (
  connection: PoolConnection,
  saleId: number,
  item: SaleItem
) => {
  const [result] = await connection.query<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.INSERT_SALE_ITEM,
    [saleId, item.id_stock, item.cantidad, item.precio_unitario, item.subtotal]
  );
  return result;
};

export const updateSale = (id: string, payload: Sale) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.UPDATE_SALE,
    [payload.fecha_venta, payload.metodo_pago, payload.id_usuario, payload.total_venta, id]
  );

export const deleteSaleItemsBySaleId = (id: string) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.DELETE_SALE_ITEMS_BY_SALE_ID,
    [id]
  );

export const deleteSale = (id: string) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.sales.DELETE_SALE,
    [id]
  );
