import mysqlPool from "../../db/db";
import { Request, Response } from "express";
import { constants } from "../../utils/constants";

export const getAll = (req: Request, res: Response) => {
    const query: string = constants.SQL_QUERIES.DATABASE.PAGOS.GET_ALL;
    mysqlPool.query(query, (err, result) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener los pagos" });
            return;
        }
        res.status(200).json(result);
    });
};

export const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const query: string = constants.SQL_QUERIES.DATABASE.PAGOS.GET_BY_ID;
    mysqlPool.query(query, [id], (err, result) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al obtener el pago" });
            return;
        }
        if ((result as any[]).length === 0) {
            res.status(404).json({ mssg: "Pago no encontrado" });
            return;
        }
        res.status(200).json(result);
    });
};

export const create = (req: Request, res: Response) => {
    const { id_stock } = req.body;
    const query: string = constants.SQL_QUERIES.DATABASE.PAGOS.INSERT_PAYMENT;
    mysqlPool.query(query, [id_stock], (err, result) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al crear el pago" });
            return;
        }
        res.status(201).json({ mssg: "Pago creado exitosamente", paymentId: (result as any).insertId });
    });
};

export const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_stock } = req.body;
    const query: string = constants.SQL_QUERIES.DATABASE.PAGOS.UPDATE_PAYMENT;
    mysqlPool.query(query, [id_stock, id], (err) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al actualizar el pago" });
            return;
        }
        res.status(200).json({ mssg: "Pago actualizado exitosamente" });
    });
};

export const remove = (req: Request, res: Response) => {
    const { id } = req.params;
    const query: string = constants.SQL_QUERIES.DATABASE.PAGOS.DELETE_PAYMENT;
    mysqlPool.query(query, [id], (err) => {
        if (err) {
            console.error(err?.message);
            res.status(500).json({ mssg: "Error al eliminar el pago" });
            return;
        }
        res.status(200).json({ mssg: "Pago eliminado exitosamente" });
    });
};
