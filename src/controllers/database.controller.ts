import { config } from "dotenv";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import mysqlPool from "../db/db";
import { readFile } from "../utils/readFile";
import fs, { stat } from "fs";
import path from "path";
import { ReadLine, createInterface } from "readline";

config();

export const checkDDBB = (req: Request, res: Response): void => {
  try {
    const checkDDBBQuery: string = "SHOW DATABASES";
    mysqlPool.query(checkDDBBQuery, (err, result, fields) => {
      if (err) throw err;

      let database = (result as RowDataPacket[]).find(
        (element) => element["Database"] === "ElPicoteo"
      );

      if (database) {
        res.status(200).json({ mssg: "Base de datos existente en entorno" });
      } else {
        res.status(404).json({ mssg: "Base de datos no encontrada." });
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

export const getDatabaseTables = (req: Request, res: Response): void => {
  try {
    const showTablesQuery: string = "SHOW TABLES;";
    mysqlPool.query(showTablesQuery, (err, result, fields) => {
      if (err) {
        console.error(err?.message);
        throw err;
      }

      if (result) {
        res
          .status(200)
          .json({ mssg: "Tablas encontradas en la base de datos.", result });
      } else {
        res.status(404).json({
          mssg: "No se ha podido devolver las tabals en la base de datos.",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const createTables = (req: Request, res: Response) => {
  try {
    const readedQueries = fs.readFileSync(
      path.join(__dirname, `../db/Tables.sql`),
      "utf-8"
    );

    mysqlPool.query(readedQueries, (err, results) => {
      if (err) throw err;

      if (results) {
        res.status(200).json({ mssg: "Tablas creadas satisfactoriamente." });
      } else {
        res
          .status(404)
          .json({ mssg: "Ha habido un problema con la insercion de tablas." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getTableData = (req: Request, res: Response) => {
  try {
    // check table name
    const tableName: string = req.params.table_name;
    const tableQuery: string = `SELECT * FROM ${tableName }`;

    mysqlPool.query(tableQuery, (err, result) => {
      if (err) {
        console.error(err?.message);
        res.status(404).json({
          mssg: "Problema detectado a la hora de comprobar conexion con las tablas",
        });
        throw err;
      }else{
        res.status(200).json({ data:result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getGlobalInventoryData = (req: Request, res: Response) => {
  try {
    let query: string = "SELECT Almacen.nombre, Inventario.unidades, Almacen.precio_unidad, ROUND((Inventario.unidades * Almacen.precio_unidad), 2) AS 'precio_total', Inventario.fecha FROM Almacen INNER JOIN Inventario ON Almacen.id = Inventario.id_almacen;";
    mysqlPool.query(query, (err, result: RowDataPacket[]) => {
      if (err) {
        console.error(err?.message);
        res.status(404).json({
          mssg: "Problema detectado a la hora de comprobar conexion con las tablas",
        });
        throw err;
      }else{
        res.status(200).json({ data:result });
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export const getGlobalStoreData = (req: Request, res: Response) => {
  try {
    let query: string = "SELECT Productos.id , Almacen.id AS id_almacen , Almacen.nombre AS ingrediente, Productos.nombre AS nombre_producto , Productos.precio_producto AS precio_producto FROM Almacen JOIN Inventario ON Almacen.id = Inventario.id_almacen  JOIN Recetas ON Almacen.id = Recetas.id_almacen  JOIN Productos ON Recetas.id_producto = Productos.id;";
    mysqlPool.query(query, (err, result) => {
      if (err) {
        console.error(err?.message);
        res.status(404).json({
          mssg: "Problema detectado a la hora de comprobar conexion con las tablas",
        });
        throw err;
      }else{
        res.status(200).json({ data:result });
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export const addProduct = (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { nombre, precio_unidad, precio_total, unidades } = req.body;

    // Usamos parámetros preparados para evitar inyecciones SQL
    const queryCheckProduct = `SELECT * FROM Almacen WHERE nombre = ?`;

    mysqlPool.query(queryCheckProduct, [nombre], (err, result: any[]) => {
      if (err) {
        console.error(err?.message);
        return res.status(500).json({
          status: "error",
          mssg: "Problema detectado a la hora de comprobar conexión con las tablas",
        });
      }

      // Si el producto ya existe, actualizamos la cantidad en Inventario
      if (result.length > 0) {
        const queryUpdateQuantity = `UPDATE Inventario SET unidades = unidades + ? WHERE id_almacen = ?`;
        
        mysqlPool.query(queryUpdateQuantity, [unidades, result[0].id], (updateErr) => {
          if (updateErr) {
            console.error(updateErr?.message);
            return res.status(500).json({
              status: "error",
              mssg: "Error al actualizar el inventario",
            });
          }
          return res.status(200).json({
            status: "success",
            mssg: `Producto ${name} actualizado correctamente en el inventario.`,
          });
        });
      } else {
        // Si el producto no existe, lo insertamos
        const queryInsertProduct = `INSERT INTO Almacen (nombre, precio_unidad) VALUES (?, ?)`;

        mysqlPool.query(queryInsertProduct, [nombre, precio_unidad], (insertErr, insertResult) => {
          if (insertErr) {
            console.error(insertErr?.message);
            return res.status(500).json({
              status: "error",
              mssg: "Error al insertar el producto en Almacen",
            });
          }

          // Después de insertar el producto, lo agregamos al inventario
          const queryInsertInventory = `INSERT INTO Inventario (id_almacen, unidades, fecha) VALUES (?, ?, ?)`;

          mysqlPool.query(queryInsertInventory, [(insertResult as any).insertId, unidades, new Date()], (insertInventoryErr) => {
            if (insertInventoryErr) {
              console.error(insertInventoryErr?.message);
              return res.status(500).json({
                status: "error",
                mssg: "Error al agregar el producto al inventario",
              });
            }

            return res.status(201).json({
              status: "success",
              mssg: `Producto ${nombre} insertado correctamente en el inventario.`,
            });
          });
        });
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const editProduct = (req: Request, res: Response) => {
  try {

    console.log(req.body);
    const { nombre, precio_unidad, precio_total, unidades } = req.body;

    // Usamos parámetros preparados para evitar inyecciones SQL
    const queryCheckProduct = `SELECT * FROM Almacen WHERE nombre = ?`;

    mysqlPool.query(queryCheckProduct, [nombre], (err, result: any[]) => {
      if (err) {
        console.error(err?.message);

        return res.status(500).json({
          status: "error",
          mssg: "Problema detectado a la hora de comprobar conexión con las tablas",
        });
      }

      // console.log(result);
      if (result.length === 0) {
        return res.status(404).json({
          status: "error",
          mssg: `El producto ${nombre} no existe`,
        });
      }
      console.log("--------------------");
      console.log(result);

      // Actualizamos el producto en Almacen
      const queryUpdateProduct = `UPDATE Almacen SET precio_unidad = ? WHERE nombre = ?`;

      mysqlPool.query(queryUpdateProduct, [precio_unidad, nombre], (updateErr) => {
        if (updateErr) {
          console.error(updateErr?.message);

          return res.status(500).json({
            status: "error",
            mssg: "Error al actualizar el producto en Almacen",
          });
        }

        // Actualizamos el producto en Inventario
        const queryUpdateInventory = `UPDATE Inventario SET unidades = ?, fecha = ? WHERE id_almacen = ?`;

        mysqlPool.query(queryUpdateInventory, [unidades, new Date(), result[0].id], (updateInventoryErr) => {
          if (updateInventoryErr) {
            console.error(updateInventoryErr?.message);

            return res.status(500).json({
              status: "error",
              mssg: "Error al actualizar el producto en Inventario",
            });
          }

          return res.status(200).json({
            status: "success",
            mssg: `Producto ${nombre} actualizado correctamente`,
          });
        });
      });
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  try {

    console.log(req.body);
    const nombre: string = req.params.name;

    // Usamos parámetros preparados para evitar inyecciones SQL
    const queryCheckProduct = `SELECT * FROM Almacen WHERE nombre = ?`;

    mysqlPool.query(queryCheckProduct, [nombre], (err, result: any[]) => {
      if (err) {
        console.error(err?.message);

        return res.status(500).json({
          status: "error",
          mssg: "Problema detectado a la hora de comprobar conexión con las tablas",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "error",
          mssg: `El producto ${nombre} no existe`,
        });
      }

      console.log("almacen by nombre",result);
      

      // Eliminamos el producto de Inventario
      const queryDeleteInventory = `DELETE FROM Inventario WHERE id_almacen = ?`;

      mysqlPool.query(queryDeleteInventory, [result[0].id], (deleteInventoryErr) => {
        if (deleteInventoryErr) {
          console.error(deleteInventoryErr?.message);

          return res.status(500).json({
            status: "error",
            mssg: "Error al eliminar el producto de Inventario",
          });
        }

        return res.status(200).json({
          status: "success",
          mssg: `Producto ${nombre} eliminado correctamente`,
        });
      });

      // Eliminamos el producto de Almacen
      const queryDeleteProduct = `DELETE FROM Almacen WHERE nombre = ?`;

      mysqlPool.query(queryDeleteProduct, [nombre], (deleteErr) => {
        if (deleteErr) {
          console.error(deleteErr?.message);

          return res.status(500).json({
            status: "error",
            mssg: "Error al eliminar el producto de Almacen",
          });
        }

        
      });
    });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
