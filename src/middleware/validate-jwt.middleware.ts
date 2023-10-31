import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../auth/auth";
import mysqlPool from "../db/db";
import { VerifiedTokenType } from "../types/types";

export const validateJWT = (req:Request, res: Response, next: NextFunction) => {
    // access to the json web token inside the request's headers
    const readedToken = req.header('x-auth-token');

    // checking if there is token
    if(!readedToken) {
        return res.status(401).json({msg:'Error reading token'})
    }

    try {
        // token validation
        const {email, role} = (verifyToken(readedToken) as VerifiedTokenType);
        
        // check if email exists in the database with the role
        const loginQuery: string = `SELECT * FROM Usuarios WHERE email= ? AND role=?`;

        mysqlPool.query(loginQuery, [email, role], (err, result, fields) => {
            if (err) {
                console.error(err?.message);
                res.status(404).json({
                  mssg: "Problema detectado a la hora de comprobar credenciales de usuario para verificacion de token",
                });
                throw err;
              }else{
                // we can set as valid this proccess
                next();
              }
        });
        
    } catch (error) {
        res.status(500).json({mssg: "Problema en la validacion de token"})
    }
};