import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { UserBody } from "../../core/types/auth";
import { constants } from "../../core/utils/constants";

type QueryParams = Array<string | number | boolean | Date | null>;

type AuthUserRow = RowDataPacket & {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
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

export const findUserByEmail = async (email: string): Promise<AuthUserRow | null> => {
  const sql = constants.SQL_QUERIES.AUTH.CHECK_USER_BY_EMAIL;
  const result = await queryAsync<AuthUserRow[]>(sql, [email]);
  return result[0] ?? null;
};

export const insertUser = async (user: UserBody, hashedPassword: string) => {
  const sql = constants.SQL_QUERIES.AUTH.INSERT_USER;
  return queryAsync<ResultSetHeader>(sql, [
    user.nombre,
    user.apellidos,
    user.email,
    hashedPassword,
    user.rol_usuario,
  ]);
};

export const validateUserByEmailAndRole = async (
  email: string,
  rolUsuario: string
): Promise<AuthUserRow | null> => {
  const sql = constants.SQL_QUERIES.AUTH.TOKEN_VALIDATION;
  const result = await queryAsync<AuthUserRow[]>(sql, [email, rolUsuario]);
  return result[0] ?? null;
};
