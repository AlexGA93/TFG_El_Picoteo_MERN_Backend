import { RowDataPacket } from "mysql2";
import mysqlPool from "../db/db";

type QueryParams = Array<string | number | boolean | Date | null>;

const queryAsync = <T = RowDataPacket[]>(
  sql: string,
  params: QueryParams = []
): Promise<T> => {
  return new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result as T);
    });
  });
};

export const getRecipesSample = (limit = 6) => {
  const sql = `
    SELECT
      id,
      nombre_producto,
      CONCAT(tiempo_produccion_min, ' min') AS tiempo_produccion,
      precio_producto AS coste,
      dificultad
    FROM Stock
    ORDER BY id DESC
    LIMIT ?;
  `;
  return queryAsync<RowDataPacket[]>(sql, [limit]);
};

export const getStockSample = (limit = 6) => {
  const sql = `
    SELECT
      id,
      nombre AS nombre_producto,
      precio_unidad AS precio_producto,
      n_unidades AS cantidad,
      unidades AS unidad
    FROM Inventario
    ORDER BY fecha_registro DESC, id DESC
    LIMIT ?;
  `;
  return queryAsync<RowDataPacket[]>(sql, [limit]);
};

export const getInventoryRows = () => {
  const sql = `
    SELECT
      id,
      nombre,
      tipo,
      unidades,
      n_unidades,
      proveedor,
      precio_unidad,
      fecha_registro
    FROM Inventario
    ORDER BY tipo, fecha_registro DESC, id DESC;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};

export const getSalesPeriods = () => {
  const sql = `
    SELECT 'Hoy' AS periodo, COALESCE(ROUND(SUM(s.precio_producto), 2), 0) AS totalDinero, COUNT(p.id) AS numeroOrdenes
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() AND p.fecha_pago < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ayer', COALESCE(ROUND(SUM(s.precio_producto), 2), 0), COUNT(p.id)
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() - INTERVAL 1 DAY AND p.fecha_pago < CURDATE()
    UNION ALL
    SELECT 'Semana Pasada', COALESCE(ROUND(SUM(s.precio_producto), 2), 0), COUNT(p.id)
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() - INTERVAL 7 DAY AND p.fecha_pago < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Mes Pasado', COALESCE(ROUND(SUM(s.precio_producto), 2), 0), COUNT(p.id)
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() - INTERVAL 1 MONTH AND p.fecha_pago < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Trimestre', COALESCE(ROUND(SUM(s.precio_producto), 2), 0), COUNT(p.id)
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() - INTERVAL 3 MONTH AND p.fecha_pago < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Yr', COALESCE(ROUND(SUM(s.precio_producto), 2), 0), COUNT(p.id)
    FROM Pagos p
    JOIN Stock s ON s.id = p.id_stock
    WHERE p.fecha_pago >= CURDATE() - INTERVAL 1 YEAR AND p.fecha_pago < CURDATE() + INTERVAL 1 DAY;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};

export const getExpensePeriods = () => {
  const sql = `
    SELECT 'Hoy' AS periodo, COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0) AS totalDinero, COUNT(i.id) AS numeroOrdenes
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() AND i.fecha_registro < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ayer', COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0), COUNT(i.id)
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() - INTERVAL 1 DAY AND i.fecha_registro < CURDATE()
    UNION ALL
    SELECT 'Semana Pasada', COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0), COUNT(i.id)
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() - INTERVAL 7 DAY AND i.fecha_registro < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Mes Pasado', COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0), COUNT(i.id)
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() - INTERVAL 1 MONTH AND i.fecha_registro < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Trimestre', COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0), COUNT(i.id)
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() - INTERVAL 3 MONTH AND i.fecha_registro < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Yr', COALESCE(ROUND(SUM(i.n_unidades * i.precio_unidad), 2), 0), COUNT(i.id)
    FROM Inventario i
    WHERE i.fecha_registro >= CURDATE() - INTERVAL 1 YEAR AND i.fecha_registro < CURDATE() + INTERVAL 1 DAY;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};
