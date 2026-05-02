import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { Inventory, QueryParams } from "../../core/types/inventory";
import { log } from "node:console";



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

export const getAllinventory = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.inventory.GET_ALL);
};

export const getinventoryById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.inventory.GET_BY_ID,
    [id]
  );
  return result[0] ?? null;
};

export const createinventory = (payload: Inventory) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.INSERT_INVENTORY_PRODUCT,
    [
      payload.nombre,
      payload.tipo,
      payload.unidades,
      payload.n_unidades,
      payload.proveedor,
      payload.precio_unidad,
    ]
  );
};

export const updateinventory = (payload: Inventory) => {
  console.log([
  payload.nombre,
  payload.tipo,
  payload.unidades,
  payload.n_unidades,
  payload.proveedor,
  payload.precio_unidad,
  payload.id
]);
  
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.UPDATE_INVENTORY_PRODUCT,
    [
      payload.nombre,
      payload.tipo,
      payload.unidades,
      payload.n_unidades,
      payload.proveedor,
      payload.precio_unidad,
      payload.id!
    ]
  );
};

export const deleteinventory = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.DELETE_INVENTORY_PRODUCT,
    [id]
  );
};
