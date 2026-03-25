import fs from "fs";
import path from "path";
import {
  executeSqlScript,
  getAllDatabases,
  getDataFromTable,
  getGlobalTables,
  runLegacySchemaFixes,
} from "./database.model";

const readSqlFile = (relativePath: string) =>
  fs.readFileSync(path.join(__dirname, relativePath), "utf-8");

export const databaseExistsService = async () => {
  const databases = await getAllDatabases();
  return databases.some((element) => element["Database"] === "ElPicoteo");
};

export const createTablesService = async () => {
  const readedQueries = readSqlFile("../db/Tables.sql");
  return executeSqlScript(readedQueries);
};

export const insertMockDataService = async () => {
  const createTablesQueries = readSqlFile("../../core/db/Tables.sql");
  const readedQueries = readSqlFile("../../core/db/Data_mockups.sql");

  const legacyAlterQueries: string[] = [
    `ALTER TABLE Inventory ADD COLUMN fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;`,
    `ALTER TABLE Ingredients ADD COLUMN cantidades FLOAT NOT NULL DEFAULT 0;`,
    `ALTER TABLE Ingredients ADD COLUMN unidad ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL DEFAULT 'unidad';`,
    `ALTER TABLE Ingredients ADD COLUMN fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;`,
  ];

  await executeSqlScript(createTablesQueries);
  await runLegacySchemaFixes(legacyAlterQueries);
  await executeSqlScript(readedQueries);
};

export const getDatabaseTablesService = () => getGlobalTables();

export const getTableDataService = (tableName: string) => getDataFromTable(tableName);
