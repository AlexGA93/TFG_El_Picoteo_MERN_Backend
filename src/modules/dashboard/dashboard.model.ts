import { RowDataPacket } from "mysql2";
import mysqlPool from "../../core/db/db";
import { QueryParams } from "../../core/types/dashboard";


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
    FROM Inventory
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
    FROM Inventory
    ORDER BY tipo, fecha_registro DESC, id DESC;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};

export const getSalesPeriods = () => {
  const sql = `
    SELECT 'Hoy' AS periodo, COALESCE(ROUND(SUM(s.total_venta), 2), 0) AS totalDinero, COUNT(s.id) AS numeroOrdenes
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() AND s.fecha_venta < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ayer', COALESCE(ROUND(SUM(s.total_venta), 2), 0), COUNT(s.id)
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() - INTERVAL 1 DAY AND s.fecha_venta < CURDATE()
    UNION ALL
    SELECT 'Semana Pasada', COALESCE(ROUND(SUM(s.total_venta), 2), 0), COUNT(s.id)
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() - INTERVAL 7 DAY AND s.fecha_venta < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Mes Pasado', COALESCE(ROUND(SUM(s.total_venta), 2), 0), COUNT(s.id)
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() - INTERVAL 1 MONTH AND s.fecha_venta < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Trimestre', COALESCE(ROUND(SUM(s.total_venta), 2), 0), COUNT(s.id)
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() - INTERVAL 3 MONTH AND s.fecha_venta < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Yr', COALESCE(ROUND(SUM(s.total_venta), 2), 0), COUNT(s.id)
    FROM Sales s
    WHERE s.fecha_venta >= CURDATE() - INTERVAL 1 YEAR AND s.fecha_venta < CURDATE() + INTERVAL 1 DAY;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};

export const getExpensePeriods = () => {
  const sql = `
    SELECT 'Hoy' AS periodo, COALESCE(ROUND(SUM(p.total_compra), 2), 0) AS totalDinero, COUNT(p.id) AS numeroOrdenes
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() AND p.fecha_compra < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ayer', COALESCE(ROUND(SUM(p.total_compra), 2), 0), COUNT(p.id)
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() - INTERVAL 1 DAY AND p.fecha_compra < CURDATE()
    UNION ALL
    SELECT 'Semana Pasada', COALESCE(ROUND(SUM(p.total_compra), 2), 0), COUNT(p.id)
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() - INTERVAL 7 DAY AND p.fecha_compra < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Mes Pasado', COALESCE(ROUND(SUM(p.total_compra), 2), 0), COUNT(p.id)
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() - INTERVAL 1 MONTH AND p.fecha_compra < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Trimestre', COALESCE(ROUND(SUM(p.total_compra), 2), 0), COUNT(p.id)
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() - INTERVAL 3 MONTH AND p.fecha_compra < CURDATE() + INTERVAL 1 DAY
    UNION ALL
    SELECT 'Ultimo Yr', COALESCE(ROUND(SUM(p.total_compra), 2), 0), COUNT(p.id)
    FROM Purchases p
    WHERE p.fecha_compra >= CURDATE() - INTERVAL 1 YEAR AND p.fecha_compra < CURDATE() + INTERVAL 1 DAY;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};


export const getIngredientsRows = () => {
  const sql = `
    SELECT
      i.id,
      i.id_producto_stock,
      s.nombre_producto AS producto,
      i.id_inventory,
      inv.nombre AS ingrediente,
      inv.tipo,
      i.cantidades,
      i.unidad,
      i.fecha_registro
    FROM Ingredients i
    INNER JOIN Inventory inv ON i.id_inventory = inv.id
    INNER JOIN Stock s ON i.id_producto_stock = s.id
    ORDER BY i.fecha_registro DESC;
  `;
  return queryAsync<RowDataPacket[]>(sql);
};
