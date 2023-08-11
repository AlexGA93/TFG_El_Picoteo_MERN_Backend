import { config } from "dotenv";
import { Request, Response } from "express";
import mysqlPool from "../db/db";
config();

export const createTableUsers = (req: Request, res: Response): void => {
  const createUsersTableQuery: string =
    "CREATE TABLE IF NOT EXISTS Usuarios (id INT auto_increment, name VARCHAR(100), second_name varchar(100), email varchar(100), password varchar(255), role varchar(100),primary key(id));";
  mysqlPool.query(createUsersTableQuery, (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      throw err;
    }

    if (result) {
      res
        .status(200)
        .json({ mssg: "Tabla creada satisfactoriamente en la base de datos." });
    } else {
      res
        .status(404)
        .json({ mssg: "Ha ocurrido un problema con la creacion de la tabla." });
    }
  });
};
