import { config } from "dotenv";
import { Request, Response } from "express";
import {
  createTablesService,
  databaseExistsService,
  getDatabaseTablesService,
  getTableDataService,
  insertMockDataService,
} from "./database.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { HttpError } from "../../core/utils/http-error";
import { sendSuccess } from "../../core/views/api-response.view";

config();

export const checkDDBB = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const exists = await databaseExistsService();
  if (!exists) throw new HttpError(404, "Base de datos no encontrada.");
  sendSuccess(res, 200, null, "Base de datos existente en entorno");
});

export const createTables = asyncHandler(async (req: Request, res: Response) => {
  const results = await createTablesService();
  if (!results) throw new HttpError(404, "Ha habido un problema con la insercion de tablas.");
  return sendSuccess(res, 200, null, "Tablas creadas satisfactoriamente.");
});

export const insertIntoTables = asyncHandler(async (req: Request, res: Response) => {
  await insertMockDataService();
  return sendSuccess(res, 200, null, "Datos mock insertados correctamente.");
});

export const getDatabaseTables = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const result = await getDatabaseTablesService();
  sendSuccess(res, 200, result, "Tablas encontradas en la base de datos.");
});

export const getTableData = asyncHandler(async (req: Request, res: Response) => {
  const tableName = req.params.table_name;
  const data = await getTableDataService(tableName);
  return sendSuccess(res, 200, data, "Datos de tabla obtenidos correctamente");
});
