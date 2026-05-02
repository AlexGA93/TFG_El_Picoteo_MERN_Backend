import { ResultSetHeader, RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import { Ingredient, QueryParams } from "../../core/types/ingredient";

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

export const getAllingredients = () => {
  return queryAsync<RowDataPacket[]>(constants.SQL_QUERIES.DATABASE.ingredients.GET_ALL);
};

export const getIngredienteById = async (id: string) => {
  const result = await queryAsync<RowDataPacket[]>(
    constants.SQL_QUERIES.DATABASE.ingredients.GET_BY_ID,
    [id]
  );
  return result[0] ?? null;
};

export const createIngrediente = (payload: Ingredient) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.ingredients.INSERT_INGREDIENT,
    [
      payload.id_producto_stock,
      payload.id_inventory,
      payload.cantidades,
      payload.unidad,
    ]
  );
};

export const updateIngrediente = (payload: Ingredient) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.ingredients.UPDATE_INGREDIENT,
    [
      payload.id_producto_stock,
      payload.id_inventory,
      payload.cantidades,
      payload.unidad,
      payload.id,
    ]
  );
};

export const deleteIngrediente = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.ingredients.DELETE_INGREDIENT,
    [id]
  );
};

export const deleteIngredientByIdInventory = (id: string) => {
  return queryAsync<ResultSetHeader>(
    constants.SQL_QUERIES.DATABASE.ingredients.DELETE_INGREDIENT_BY_ID_INVENTORY,
    [id]
  );
};
