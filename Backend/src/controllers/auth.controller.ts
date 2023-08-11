import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RowDataPacket } from "mysql2";
import { generateAuthToken } from "../auth/auth";
import mysqlPool from "../db/db";
import { hashingPassword } from "../security/hashing";
import { UserBody, UserLogin } from "../types/types";
config();

export const registerUser = (req: Request, res: Response) => {
  // express validator errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  // extract user information
  let { name, second_name, email, password, role }: UserBody = req.body;

  // check if there is email in users table
  const checkEmailQuery: string = "SELECT * FROM Usuarios WHERE email NOT REGEXP '^[^@]+@[^@]+.[^@]{2,}$';";
  
  mysqlPool.query(checkEmailQuery, (err, result, fields) => {

    if (err) {
      console.error(err?.message);
      throw err;
    }

    if ((result as RowDataPacket[]).length === 0) {
      console.log("Usario no encontrado en la base de datos. Procediendo a su ingreso...");

      // insert user into the table
      const registerUserQuery: string = `INSERT INTO Usuarios(name, second_name, email, password, role) values(? , ?, ?, ?, ?);`;
      mysqlPool.query(
        registerUserQuery,
        [name, second_name, email, hashingPassword(password), role],
        (err, result, fields) => {
          if (err) {
            console.error(err?.message);
            res.status(404).json({
              mssg: "Problema detectado a la hora de registro de usuario",
            });
            throw err;
          }
          const token = generateAuthToken(email, role);

          res.status(200).json({ token });
          console.log("Ingreso de usuario finalizo satisfactoriamente.");
        }
      );
    } else {
      console.log("Usuario existente en la base de datos. Abortando...");
    }
  });
};

export const login = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // extract user credentials
  let { email, password }: UserLogin = req.body;
  // check if email exists in database
  const loginQuery: string = `SELECT * FROM Usuarios WHERE email= ?`;
  mysqlPool.query(loginQuery, [email], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar credenciales de usuario",
      });
      throw err;
    }
    // if exists hash password and compare it
    bcrypt
      .compare(password, (result as RowDataPacket[])[0].password)
      .then(() => {
        const token = generateAuthToken(email);
        res.status(200).json({ token });
        console.log("inicio de sesion se llevo a cabo satisfactoriamente.");
      })
      .catch((err) => {
        console.error(err);
        if (err) throw err;
      });
  });
};
