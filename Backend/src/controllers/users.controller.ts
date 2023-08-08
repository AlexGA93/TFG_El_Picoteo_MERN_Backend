import { config } from "dotenv";
import { Request, Response } from 'express';
import mysqlPool from "../db/db";
import { UserBody } from "../types/types";
import { RowDataPacket } from "mysql2";
config();

export const createTableUsers = (req: Request, res: Response) => {
    const createUsersTableQuery: string = "CREATE TABLE IF NOT EXISTS Usuarios (id INT auto_increment, name VARCHAR(100), second_name varchar(100), email varchar(100), password varchar(255), primary key(id));";
    mysqlPool.query(createUsersTableQuery, (err, result, fields)=>{
        if(err){
            console.error(err?.message);
            throw err;
        }

        if(result) {
            res.status(200).json({mssg: "Tabla creada satisfactoriamente en la base de datos."});
        }else{
            res.status(404).json({mssg: "Ha ocurrido un problema con la creacion de la tabla."});
        }
    })
};

export const registerUser = (req: Request, res: Response) => {
    // extract user information
    const userBody: UserBody = req.body;

    // check if there is email in users table
    const checkEmailQuery: string = "SELECT * FROM Usuarios WHERE email NOT REGEXP '^[^@]+@[^@]+\.[^@]{2,}$';";
    mysqlPool.query(checkEmailQuery, (err, result, fields)=>{
        if(err){
            console.error(err?.message);
            throw err;
        }
        if((result as RowDataPacket[]).length === 0){
            console.log("Uusario no encontrado en la base de datos. Procediendo a su ingreso...");
            const registerUserQuery: string = `
                INSERT INTO Usuarios(name, second_name, email, password) values(${userBody.name}, ${userBody.second_name}, ${userBody.email}, ${userBody.password}, );
            `;
            mysqlPool.query(registerUserQuery, (err, result, fields) =>{
                if(err){
                    console.error(err?.message);
                    throw err;
                }
                console.log(result);
                
            })

        }else{
            console.log("Usuario existente en la base de datos. Abortando...")
        }
        
    });
    // insert user into the table
};