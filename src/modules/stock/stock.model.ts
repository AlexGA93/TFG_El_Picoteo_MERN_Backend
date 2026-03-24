import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { CompleteStock, QueryParams, Stock } from "../../core/types/stock";


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

export const getAllStock = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.STOCK.GET_ALL);
};

export const getStockById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.STOCK.GET_BY_ID,
    [id]
  );
  return result[0] ?? null;
};

export const createStock = (payload: CompleteStock) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.STOCK.INSERT_STOCK_PRODUCT,
    [
      payload.nombre_producto,
      payload.precio_producto,
      payload.tiempo_produccion_min,
      payload.dificultad,
      payload.url
    ]
  );
};

export const updateStock = (payload: Stock) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.STOCK.UPDATE_STOCK_PRODUCT,
    [
      payload.nombre_producto,
      payload.precio_producto,
      payload.tiempo_produccion_min,
      payload.dificultad,
      payload.id,
    ]
  );
};

export const deleteStock = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.STOCK.DELETE_STOCK_PRODUCT,
    [id]
  );
};
