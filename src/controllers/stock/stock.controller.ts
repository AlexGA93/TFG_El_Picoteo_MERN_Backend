import mysqlPool from "../../db/db";
import { Request, Response } from "express";
import { constants } from "../../utils/constants";

export const getAll = (req: Request, res: Response) => {
    const query: string = constants.SQL_QUERIES.DATABASE.STOCK.GET_ALL;
    mysqlPool.query(query, (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener los productos del stock" });
            return;
        }
        res.status(200).json(result);
    });
};

export const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const query: string = constants.SQL_QUERIES.DATABASE.STOCK.GET_BY_ID;
    mysqlPool.query(query, [id], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener el producto del stock" });
            return;
        }
        if ((result as any[]).length === 0) {
            res.status(404).json({ mssg: "Producto no encontrado" });
            return;
        }
        res.status(200).json(result);
    });
};

export const create = (req: Request, res: Response) => {
    const { nombre, tipo, unidades, n_unidades, proveedor, precio_unidad } = req.body;
    const query: string = constants.SQL_QUERIES.DATABASE.STOCK.INSERT_STOCK_PRODUCT;
    mysqlPool.query(query, [nombre, tipo, unidades, n_unidades, proveedor, precio_unidad], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al crear el producto en el stock" });
            return;
        }
        res.status(201).json({ mssg: "Producto creado exitosamente", productId: (result as any).insertId });
    });
}

export const update = (req: Request, res: Response) => {
    const { nombre, tipo, unidades, n_unidades, proveedor, precio_unidad } = req.body;
    const query: string = constants.SQL_QUERIES.DATABASE.STOCK.UPDATE_STOCK_PRODUCT;
    mysqlPool.query(query, [tipo, unidades, n_unidades, proveedor, precio_unidad, nombre], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al actualizar el producto en el stock" });
            return;
        }
        res.status(200).json({ mssg: "Producto actualizado exitosamente" });
    });
};

export const remove = (req: Request, res: Response) => {
    const { nombre } = req.params;
    const query: string = constants.SQL_QUERIES.DATABASE.STOCK.DELETE_STOCK_PRODUCT;
    mysqlPool.query(query, [nombre], (err, result, fields) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al eliminar el producto del stock" });
            return;
        }
        res.status(200).json({ mssg: "Producto eliminado exitosamente" });
    });
};