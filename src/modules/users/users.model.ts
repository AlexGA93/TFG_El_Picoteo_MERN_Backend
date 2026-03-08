import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";

type QueryParams = Array<string | number | boolean | Date | null>;

type UserRow = RowDataPacket & {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol_usuario: string;
};

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

export const getAllUsers = () => {
  const sql = constants.SQL_QUERIES.USERS.GET_GLOBAL_USERS;
  return queryAsync<UserRow[]>(sql);
};

export const getUserById = async (id: string): Promise<UserRow | null> => {
  const sql = constants.SQL_QUERIES.USERS.GET_USER_BY_ID;
  const result = await queryAsync<UserRow[]>(sql, [id]);
  return result[0] ?? null;
};

export const updateUserNameAndSurname = (
  id: string,
  nombre: string,
  apellidos: string
) => {
  const sql = constants.SQL_QUERIES.USERS.UPDATE_USER_NAME;
  return queryAsync<ResultSetHeader>(sql, [nombre, apellidos, id]);
};

export const deleteUserById = (id: string) => {
  const sql = `DELETE FROM Usuarios WHERE id=?`;
  return queryAsync<ResultSetHeader>(sql, [id]);
};
