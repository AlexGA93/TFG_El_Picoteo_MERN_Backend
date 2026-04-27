import { ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import mysqlPool from "../../core/db/db";
import { constants } from "../../core/utils/constants";
import {
  QueryParams,
  RecipeIngredientToCreate,
  RecipeToBeCreated,
} from "../../core/types/recipes";

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

const queryAsyncWithConn = async <T = RowDataPacket[]>(
  connection: PoolConnection,
  sql: string,
  params: QueryParams = []
): Promise<T> => {
  const [result] = await connection.query(sql, params);
  return result as T;
};

export const getRecipesRows = () => {
  const sql = constants.SQL_QUERIES.DATABASE.recipes.GET_ALL_RECIPES;

  return queryAsync<RowDataPacket[]>(sql);
};

export const createStockRow = (
  connection: PoolConnection,
  data: RecipeToBeCreated,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.recipes.CREATE_RECIPE;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [
    data.nombre,
    data.precio,
    data.tiempo_produccion_min,
    data.dificultad,
    data.url,
  ]);
};

export const createIngredientRow = (
  connection: PoolConnection,
  stockId: number,
  ingredient: RecipeIngredientToCreate,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.ingredients.INSERT_INGREDIENT;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [
    stockId,
    ingredient.id_inventory,
    ingredient.cantidad,
    ingredient.unidad,
  ]);
};

export const getInventoryById = async (
  connection: PoolConnection,
  inventoryId: number,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.inventory.GET_BY_ID;
  const [rows] = await connection.query<RowDataPacket[]>(sql, [inventoryId]);
  return rows[0] ?? null;
};

export const decrementInventoryUnits = (
  connection: PoolConnection,
  inventoryId: number,
  cantidad: number,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.inventory.DECREMENT_UNITS;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [cantidad, inventoryId]);
};

export const incrementInventoryUnits = (
  connection: PoolConnection,
  inventoryId: number,
  cantidad: number,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.inventory.INCREMENT_UNITS;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [cantidad, inventoryId]);
};

export const updateStockRow = (
  connection: PoolConnection,
  stockId: number,
  data: RecipeToBeCreated,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.STOCK.UPDATE_STOCK_PRODUCT;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [
    data.nombre,
    data.precio,
    data.tiempo_produccion_min,
    data.dificultad,
    data.url,
    stockId,
  ]);
};

export const deleteIngredientsByStockId = (
  connection: PoolConnection,
  stockId: number,
) => {
  const sql = constants.SQL_QUERIES.DATABASE.ingredients.DELETE_BY_STOCK_ID;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [stockId]);
};

export const deleteStockRow = (connection: PoolConnection, stockId: number) => {
  const sql = constants.SQL_QUERIES.DATABASE.STOCK.DELETE_STOCK_PRODUCT;
  return queryAsyncWithConn<ResultSetHeader>(connection, sql, [stockId]);
};
