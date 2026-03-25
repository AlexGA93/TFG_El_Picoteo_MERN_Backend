import { emailCheckRegex } from "./utilities";

export const constants = {
  ALLOWED_TABLES: ["Users", "Inventory", "Stock", "Ingredients", "Payments"],
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },
  SQL_QUERIES: {
    AUTH: {
      CHECK_EMAIL: `SELECT * FROM Users WHERE email = ?;`,
      INSERT_USER: `INSERT INTO Users(nombre,apellidos, email, password, rol_usuario) values(? , ?, ?, ?, ?);`,
      CHECK_USER_BY_EMAIL: `SELECT * FROM Users WHERE email = ?;`,
      TOKEN_VALIDATION: `SELECT * FROM Users WHERE email = ? AND rol_usuario = ?;`,
    },
    USERS: {
      GET_GLOBAL_USERS: `SELECT * FROM Users;`,
      GET_USER_BY_ID: `SELECT * FROM Users WHERE id=?;`,
      UPDATE_USER_NAME: `UPDATE Users SET nombre=?, apellidos=? WHERE id=?;`,
    },
    DATABASE: {
      inventory: {
        GET_ALL: `SELECT * FROM Inventory;`,
        GET_BY_ID: `SELECT * FROM Inventory WHERE id=?;`,
        INSERT_PRODUCT: `INSERT INTO Inventory(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW());`,
        UPDATE_PRODUCT: `UPDATE Inventory SET tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE nombre=?;`,
        DELETE_PRODUCT: `DELETE FROM Inventory WHERE id=?;`,
      },
      STOCK: {
        GET_ALL: `SELECT * FROM Stock;`,
        GET_BY_ID: `SELECT * FROM Stock WHERE id=?;`,
        INSERT_STOCK_PRODUCT: `INSERT INTO Stock(nombre_producto, precio_producto, tiempo_produccion_min, dificultad, url)
VALUES (?, ?, ?, ?, ?);
`,
        UPDATE_STOCK_PRODUCT: `UPDATE Stock SET nombre_producto=?, precio_producto=?, tiempo_produccion_min=?, dificultad=?, url=? WHERE id=?;`,
        DELETE_STOCK_PRODUCT: `DELETE FROM Stock WHERE id=?;`,
      },
      ingredients: {
        GET_ALL: `SELECT * FROM Ingredients;`,
        GET_BY_ID: `SELECT * FROM Ingredients WHERE id=?;`,
        INSERT_INGREDIENT: `INSERT INTO Ingredients(id_producto_stock, id_inventory, cantidades, unidad, fecha_registro) VALUES (?, ?, ?, ?, NOW());`,
        UPDATE_INGREDIENT: `UPDATE Ingredients SET id_producto_stock=?, id_inventory=?, cantidades=?, unidad=? WHERE id=?;`,
        DELETE_INGREDIENT: `DELETE FROM Ingredients WHERE id=?;`,
      },
      payments: {
        GET_ALL: `SELECT * FROM Payments;`,
        GET_BY_ID: `SELECT * FROM Payments WHERE id=?;`,
        INSERT_PAYMENT: `INSERT INTO Payments(id_stock, fecha_pago) VALUES (?, NOW());`,
        UPDATE_PAYMENT: `UPDATE Payments SET id_stock=? WHERE id=?;`,
        DELETE_PAYMENT: `DELETE FROM Payments WHERE id=?;`,
      },
      recipes: {
        GET_ALL_RECIPES: `SELECT
      s.id,
      s.nombre_producto,
      s.precio_producto,
      s.tiempo_produccion_min,
      s.dificultad,
      ing.id AS ingrediente_id,
      inv.id AS id_inventory,
      inv.nombre AS ingrediente_nombre,
      inv.tipo AS ingrediente_tipo,
      ing.cantidades AS cantidad,
      ing.unidad
    FROM Stock s
    LEFT JOIN Ingredients ing ON ing.id_producto_stock = s.id
    LEFT JOIN Inventory inv ON inv.id = ing.id_inventory
    ORDER BY s.id ASC, ing.id ASC;`,
      },
      GET_GLOBAL_TABLES: `SHOW TABLES;`,
      GET_ALL_DATABASES: `SHOW DATABASES;`,
      GET_GLOBAL_INVENTORY: `SELECT * FROM Inventory;`,
      GET_GLOBAL_INGREDIENTS: `SELECT * FROM Ingredients;`,
      GET_GLOBAL_STOCK: `SELECT * FROM Stock;`,
      GET_GLOBAL_ORDERS: `SELECT * FROM Payments;`,
      // GET DATA
      GET_TABLE_DATA: (tableName: string) => {
        if (!constants.ALLOWED_TABLES.includes(tableName)) {
          throw new Error(`Tabla no permitida: ${tableName}`);
        }
        return `SELECT * FROM ${tableName};`;
      },
      // INSERT DATA
      INSERT_INVENTORY_PRODUCT: `INSERT INTO Inventory(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW());`,
      // UPDATE DATA
      UPDATE_INVENTORY_PRODUCT: `UPDATE Inventory SET nombre=?, tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE id=?;`,
      // DELETE DATA
      DELETE_INVENTORY_PRODUCT: `DELETE FROM Inventory WHERE id=?;`,
    },
  },
};
