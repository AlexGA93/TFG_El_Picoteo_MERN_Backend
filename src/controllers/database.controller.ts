import { config } from "dotenv";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import mysqlPool from "../db/db";
import { readFile } from "../utils/readFile";
import fs from "fs";
import path from "path";
import { ReadLine, createInterface } from "readline";

config();

export const checkDDBB = (req: Request, res: Response): void => {
  try {
    const checkDDBBQuery: string = "SHOW DATABASES";
    mysqlPool.query(checkDDBBQuery, (err, result, fields) => {
      if (err) throw err;

      let database = (result as RowDataPacket[]).find(
        (element) => element["Database"] === "ElPicoteo"
      );

      if (database) {
        res.status(200).json({ mssg: "Base de datos existente en entorno" });
      } else {
        res.status(404).json({ mssg: "Base de datos no encontrada." });
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

export const getDatabaseTables = (req: Request, res: Response): void => {
  try {
    const showTablesQuery: string = "SHOW TABLES;";
    mysqlPool.query(showTablesQuery, (err, result, fields) => {
      if (err) {
        console.error(err?.message);
        throw err;
      }

      if (result) {
        res
          .status(200)
          .json({ mssg: "Tablas encontradas en la base de datos.", result });
      } else {
        res.status(404).json({
          mssg: "No se ha podido devolver las tabals en la base de datos.",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const createTables = (req: Request, res: Response) => {
  try {
    const readedQueries = fs.readFileSync(
      path.join(__dirname, `../db/Tables.sql`),
      "utf-8"
    );

    mysqlPool.query(readedQueries, (err, results) => {
      if (err) throw err;

      if (results) {
        res.status(200).json({ mssg: "Tablas creadas satisfactoriamente." });
      } else {
        res
          .status(404)
          .json({ mssg: "Ha habido un problema con la insercion de tablas." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
