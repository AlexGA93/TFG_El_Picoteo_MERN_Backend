import { RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { QueryParams } from "../../core/types/database";


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

export const getAllDatabases = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.GET_ALL_DATABASES);
};

export const executeSqlScript = (sql: string) => {
  return queryAsync<any>(sql);
};

export const runLegacySchemaFixes = async (legacyAlterQueries: string[]) => {
  for (const query of legacyAlterQueries) {
    try {
      await queryAsync(query);
    } catch (err: any) {
      const errorCode = err?.code;
      const isDuplicateColumn = errorCode === "ER_DUP_FIELDNAME";
      if (!isDuplicateColumn) throw err;
    }
  }
};

export const getGlobalTables = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.GET_GLOBAL_TABLES);
};

export const getDataFromTable = (tableName: string) => {
  const sql = constants.SQL_QUERIES.DATABASE.GET_TABLE_DATA(tableName);
  return queryAsync<RowDataPacket[]>(sql);
};
