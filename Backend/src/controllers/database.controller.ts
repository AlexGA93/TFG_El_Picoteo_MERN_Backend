import { config } from "dotenv";
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import mysqlPool from "../db/db";

config();

export const checkDDBB = (req: Request, res: Response) => {
    try {
        const checkDDBBQuery: string = 'SHOW DATABASES';
        mysqlPool.query(checkDDBBQuery, (err, result, fields) => {
            if(err) throw err;

            let database = (result as RowDataPacket[]).find(element => element["Database"]==="ElPicoteo");
            
            if(database){
                res.status(200).json({mssg: "Base de datos existente en entorno"});
            }else{
                res.status(404).json({mssg: "Base de datos no encontrada."});
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const getDatabaseTables = (req: Request, res: Response) => {
    try {
        const showTablesQuery: string = 'SHOW TABLES;';
        mysqlPool.query(showTablesQuery, (err, result, fields) => {
            if(err){
                console.error(err?.message);
                throw err;
            }
    
            if(result){
                res.status(200).json({mssg: "Tablas encontradas en la base de datos.", result});
            }else{
                res.status(404).json({mssg: "No se ha podido devolver las tabals en la base de datos."});
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const createTable = (req: Request, res: Response) => {
    try {
        
        // const tableCreationQuery: string = `CREATE TABLE IF NOT EXISTS ${req.body.tableName} ( id INT auto_increment, nombre VARCHAR(100),  precio_unidad FLOAT, primary key (id))`;
        // const tableCreation = connection.query(tableCreationQuery);
        // console.log(tableCreation);
        // if(tableCreation){
        //     res.status(200).json({mssg:`Tabla ${req.body.tableName} creada correctamente!`});
        // }else{
        //     res.status(500).json({mssg: "Error durante la creacion de la tabla!"})
        // }
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

