import { config } from "dotenv";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import mysqlPool from "../db/db";
import { UserBody } from "../types/types";
config();

export const getUsersFromTable = (req: Request, res: Response) => {
  const getUsersFromTableQuery: string = "SELECT * FROM Usuarios";

  mysqlPool.query(getUsersFromTableQuery, (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      throw err;
    }
    if (result) {
      res.status(200).json({ users: result });
    } else {
      res
        .status(404)
        .json({ mssg: "Ha ocurrido un problema con la creacion de la tabla." });
    }
  });
};

export const getUser = (req: Request, res: Response) => {
  // extract user from request
  const userId: string = req.params.id;
  const findUserQuery: string = `SELECT * FROM Usuarios WHERE id=?`;
  // check if user with the id is in our table
  mysqlPool.query(findUserQuery, [userId], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar presencia de usuario",
      });
      throw err;
    } else {
      const userData: UserBody = (({ name, second_name, email, role }) => ({
        name,
        second_name,
        email,
        role,
      }))((result as RowDataPacket[])[0]);
      res.status(200).json(userData);
    }
  });
};

export const updateUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const newParameters = req.body;

  const findUserQuery: string = `SELECT * FROM Usuarios WHERE id=?`;
  mysqlPool.query(findUserQuery, [userId], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar presencia de usuario",
      });
      throw err;
    } else {
      const tableResponse = (result as RowDataPacket[])[0];
      const newPayload: {[key: string]: Function;} = {};

      for (let key in tableResponse) {
        if (key in newParameters) {
          newPayload[key] = newParameters[key];
        } else {
          newPayload[key] = tableResponse[key];
        }
      }
      
      const updateUserQuery: string = `UPDATE Usuarios SET name=?, second_name=? WHERE id=?`;
      mysqlPool.query(
        updateUserQuery,
        [newPayload.name, newPayload.second_name, newPayload.id],
        (err, result, fields) => {
          if (err) {
            console.error(err?.message);
            res.status(404).json({
              mssg: "Problema detectado a la hora de actualizar informacion de usuario",
            });
            throw err;
          } else {
            // console.log(result);
            res.status(200).json({ mssg: "Usuario Actualizado correctamente" });
          }
        }
      );
    }
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const findUserQuery: string = `SELECT * FROM Usuarios WHERE id=?`;
  mysqlPool.query(findUserQuery, [userId], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de encontrar usuario",
      });
      throw err;
    } else {
      const deleteUserQuery: string = `DELETE FROM Usuarios WHERE id=?`;
      mysqlPool.query(deleteUserQuery, [userId], (err, result, fields) => {
        if (err) {
          console.error(err?.message);
          res.status(404).json({
            mssg: "Problema detectado a la hora de eliminar usuario",
          });
          throw err;
        } else {
          res.status(200).json({
            mssg: "Usuario Eliminado correctamente",
          });
        }
      });
    }
  });
};
