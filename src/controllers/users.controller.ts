import { config } from "dotenv";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import mysqlPool from "../db/db";
import { UserBody } from "../types/types";
import { constants } from "../utils/constants";
config();

export const getUsersFromTable = (req: Request, res: Response) => {
  const getUsersFromTableQuery: string = constants.SQL_QUERIES.USERS.GET_GLOBAL_USERS;

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
  const findUserQuery: string = constants.SQL_QUERIES.USERS.GET_USER_BY_ID;

  // check if user with the id is in our table
  mysqlPool.query(findUserQuery, [userId], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar presencia de usuario",
      });
      throw err;
    } else {
      const userData: UserBody = (({ nombre, apellidos, email, rol_usuario }) => ({
        nombre,
        apellidos,
        email,
        rol_usuario,
      }))((result as RowDataPacket[])[0]);
      res.status(200).json(userData);
    }
  });
};

export const updateUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const newParameters = req.body;

  const findUserQuery: string = constants.SQL_QUERIES.USERS.GET_USER_BY_ID;
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
      
      const updateUserQuery: string = constants.SQL_QUERIES.USERS.UPDATE_USER_NAME;

      mysqlPool.query(
        updateUserQuery,
        [newPayload.nombre, newPayload.apellidos, newPayload.id],
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
  const findUserQuery: string = constants.SQL_QUERIES.USERS.GET_USER_BY_ID;
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
