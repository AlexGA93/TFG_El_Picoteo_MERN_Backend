import { RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { QueryParams } from "./recetas.types";

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

export const getRecipesRows = () => {
  const sql = constants.SQL_QUERIES.DATABASE.RECETAS.GET_ALL_RECIPES;

  return queryAsync<RowDataPacket[]>(sql);
};
