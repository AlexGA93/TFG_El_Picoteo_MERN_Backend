import { config } from "dotenv";
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { mysqlPool } from '../db/db';
config();

export const checkDDBB = async (req: Request, res: Response) => {
    try {
        const checkDDBBQuery: string = 'SHOW DATABASES';
        const [databases] = await mysqlPool.query(checkDDBBQuery);

        let database = (databases as RowDataPacket[]).find((object)=> object["Database"]==="ElPicoteo");
        console.log(database);
        if(database){
            res.status(200).json({mssg: "Base de datos existente en entorno"});
        }else{
            res.status(404).json({mssg: "Base de datos no encontrada."})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const getDatabaseTables = async (req: Request, res: Response) => {
    try {
        const checkDDBBQuery: string = `USE ${req.params.database_name}`;
        const showTablesQuery: string = 'SHOW TABLES;';
        
        const database = await mysqlPool.query(checkDDBBQuery);
        if(database){
            const [tables] = await mysqlPool.query(showTablesQuery);
            if((tables as RowDataPacket[]).length !== 0){
                res.status(200).send(tables);
            }else{
                res.status(404).json({mssg: `ATENCION! Ausencia de tablas en ${req.params.database_name}`})
            }
            
            
        }else{
            res.status(404).json({ message: 'Base de datos no encontrada...abortando acceso' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const createTable = async (req: Request, res: Response) => {
    try {
        
        const tableCreationQuery: string = `CREATE TABLE IF NOT EXISTS ${req.body.tableName} ( id INT auto_increment, nombre VARCHAR(100),  precio_unidad FLOAT, primary key (id))`;
        const tableCreation = await mysqlPool.query(tableCreationQuery);
        console.log(tableCreation);
        if(tableCreation){
            res.status(200).json({mssg:`Tabla ${req.body.tableName} creada correctamente!`});
        }else{
            res.status(500).json({mssg: "Error durante la creacion de la tabla!"})
        }
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

