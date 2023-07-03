import express, { Request, Response } from 'express';
import { mysqlPool } from '../db/db';
import { config } from "dotenv";
config();

export const checkDDBB = async (req: Request, res: Response) => {
    try {
        const checkDDBBQuery: string = 'SHOW DATABASES';
        const [rows, fields]: any[] = await mysqlPool.query(checkDDBBQuery);

        // if(rows[0]["Database"){}
        console.log("data: "+rows[0]);
        
        res.status(200).send(rows);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

// export const checkDatabase = async (req: Request, res: Response) => {
//     try {
//         const accessQuery: string = `USE ${process.env.MYSQL_DATABASE}`;
//         const showTablesQuery: string = "SHOW TABLES;";

//         const database = await mysqlPool.query(accessQuery);
//         if(database){
//             const tables: any = await mysqlPool.query(showTablesQuery);

//             if(Object.keys(tables[0]).length!==0){
//                 res.status(200).json(tables[0]);
//             }else{
//                 res.status(200).json("Tablas no encontradas en la base de datos.");
//             }
//         }else{
//             res.status(404).json({ message: 'Base de datos no encontrada.' });
//         }

        
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }

