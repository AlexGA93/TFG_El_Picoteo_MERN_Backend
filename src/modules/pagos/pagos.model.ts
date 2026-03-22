import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";

type QueryParams = Array<string | number | boolean | Date | null>;

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

export const getAllPagos = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.PAGOS.GET_ALL);
};

export const getPagoById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.PAGOS.GET_BY_ID,
    [id]
  );
  return result[0] ?? null;
};

export const createPago = (id_stock: number) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.PAGOS.INSERT_PAYMENT,
    [id_stock]
  );
};

export const updatePago = (id: string, id_stock: number) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.PAGOS.UPDATE_PAYMENT,
    [id_stock, id]
  );
};

export const deletePago = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.PAGOS.DELETE_PAYMENT,
    [id]
  );
};
