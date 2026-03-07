import mysqlPool from "../../db/db";
import { Request, Response } from "express";
import { constants } from "../../utils/constants";

export const getAll = (req: Request, res: Response) => {
    const query = constants.SQL_QUERIES.DATABASE.INGREDIENTES.GET_ALL;
    
    mysqlPool.query(query, (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener los ingredientes" });
            return;
        }
        res.status(200).json(result);
    });
}

export const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const query = constants.SQL_QUERIES.DATABASE.INGREDIENTES.GET_BY_ID;
    
    mysqlPool.query(query, [id], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener el ingrediente" });
            return;
        }
        res.status(200).json(result);
    });
}

export const create = (req: Request, res: Response) => {
    const { id_producto_stock, id_inventario, cantidades, unidad } = req.body;
    const query = constants.SQL_QUERIES.DATABASE.INGREDIENTES.INSERT_INGREDIENT;
    
    mysqlPool.query(query, [id_producto_stock, id_inventario, cantidades, unidad], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al crear el ingrediente" });
            return;
        }
        res.status(201).json({ mssg: "Ingrediente creado exitosamente" });
    });
}

export const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_producto_stock, id_inventario, cantidades, unidad } = req.body;
    const query = constants.SQL_QUERIES.DATABASE.INGREDIENTES.UPDATE_INGREDIENT;
    
    mysqlPool.query(query, [id_producto_stock, id_inventario, cantidades, unidad, id], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al actualizar el ingrediente" });
            return;
        }
        res.status(200).json({ mssg: "Ingrediente actualizado exitosamente" });
    });
}

export const remove = (req: Request, res: Response) => {
    const { id } = req.params;
    const query = constants.SQL_QUERIES.DATABASE.INGREDIENTES.DELETE_INGREDIENT;
    
    mysqlPool.query(query, [id], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al eliminar el ingrediente" });
            return;
        }
        res.status(200).json({ mssg: "Ingrediente eliminado exitosamente" });
    });
}   
