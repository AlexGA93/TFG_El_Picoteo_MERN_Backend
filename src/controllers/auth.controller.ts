import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RowDataPacket } from "mysql2";
import { generateAuthToken, verifyToken } from "../auth/auth";
import mysqlPool from "../db/db";
import { hashingPassword } from "../security/hashing";
import { UserBody, UserLogin, VerifiedTokenType } from "../types/types";
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
  const checkEmailQuery: string =
    "SELECT * FROM Usuarios WHERE email NOT REGEXP '^[^@]+@[^@]+.[^@]{2,}$';";

  mysqlPool.query(checkEmailQuery, (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      throw err;
    }

    if ((result as RowDataPacket[]).length === 0) {
      console.log(
        "Usario no encontrado en la base de datos. Procediendo a su ingreso..."
      );

      // insert user into the table
      const registerUserQuery: string = `INSERT INTO Usuarios(name, second_name, email, password, role) values(? , ?, ?, ?, ?);`;
      mysqlPool.query(
        registerUserQuery,
        [name, second_name, email, hashingPassword(password!), role],
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

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // extract user and password from body request

  let { email, password }: UserLogin = req.body;
  const loginQuery: string = `SELECT * FROM Usuarios WHERE email= ?`;
  // check if there is a user registered with those credentials
  mysqlPool.query(loginQuery, [email], async (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar credenciales de usuario",
      });
      throw err;
    } else {
      // if user exists we need to hash the password and a role to generate a token
      const passMatch = await bcrypt.compare(
        password,
        (result as RowDataPacket[])[0].password
      );

      if (passMatch) {
        const role = (result as RowDataPacket[])[0].role;
        const token = generateAuthToken(email, role);
        console.log("inicio de sesion se llevo a cabo satisfactoriamente.");
        return res.status(200).json({ token });
      } else {
        return res
          .status(500)
          .json({ mssg: "Ocurrio un error validando credenciales" });
      }
    }
  });
};

export const validateToken = (req: Request, res: Response) => {
  // extract token
  const readedToken = req.header("x-auth-token")!;

  // token validation
  const { email, role } = verifyToken(readedToken) as VerifiedTokenType;

  // check if email exists in the database with the role
  const loginQuery: string = `SELECT * FROM Usuarios WHERE email= ? AND role=?`;

  mysqlPool.query(loginQuery, [email, role], (err, result, fields) => {
    if (err) {
      console.error(err?.message);
      res.status(404).json({
        mssg: "Problema detectado a la hora de comprobar credenciales de usuario para verificacion de token",
        status: false,
      });
      throw err;
    } else {
      const { name, second_name, email } = (result as RowDataPacket[])[0];
      console.log(name, second_name, email);

      // we can set as valid this proccess
      return res.status(200).json({
        data: {
          name,
          second_name,
          email,
        },
        status: true,
      });
    }
  });
  // return ok or error message
};

export const regenerateToken = (req: Request, res: Response) => {
  // extract token
  const readedToken = req.header("x-auth-token")!;

  // extract email and role from token
  const { email, role } = verifyToken(readedToken) as VerifiedTokenType;

  // generate new token with old one's information
  const newGeneratedToken = generateAuthToken(email, role);

  // return new generated token
  return res.status(200).json({ token: newGeneratedToken });
};
