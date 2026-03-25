import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { QueryParams } from "../../core/types/payments";



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

export const getAllpayments = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.payments.GET_ALL);
};

export const getPagoById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.payments.GET_BY_ID,
    [id]
  );
  return result[0] ?? null;
};

export const createPago = (id_stock: number) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.payments.INSERT_PAYMENT,
    [id_stock]
  );
};

export const updatePago = (id: string, id_stock: number) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.payments.UPDATE_PAYMENT,
    [id_stock, id]
  );
};

export const deletePago = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.payments.DELETE_PAYMENT,
    [id]
  );
};
