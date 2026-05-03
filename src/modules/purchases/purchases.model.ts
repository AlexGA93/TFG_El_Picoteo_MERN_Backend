import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { Purchase, QueryParams } from "../../core/types/purchases";

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

export const getAllPurchases = () =>
  queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.purchases.GET_ALL);

export const getPurchaseById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.purchases.GET_BY_ID,
    [id]
  );

  if (!result[0]) return null;

  const items = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.purchases.GET_ITEMS_BY_PURCHASE_ID,
    [id]
  );

  return { ...result[0], items };
};

export const createPurchase = (payload: Purchase) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.purchases.INSERT_PURCHASE,
    [payload.fecha_compra, payload.proveedor, payload.id_usuario, payload.total_compra]
  );

export const updatePurchase = (id: string, payload: Purchase) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.purchases.UPDATE_PURCHASE,
    [payload.fecha_compra, payload.proveedor, payload.id_usuario, payload.total_compra, id]
  );

export const deletePurchaseItemsByPurchaseId = (id: string) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.purchases.DELETE_PURCHASE_ITEMS_BY_PURCHASE_ID,
    [id]
  );

export const deletePurchase = (id: string) =>
  queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.purchases.DELETE_PURCHASE,
    [id]
  );
