import { emailCheckRegex } from "./utilities";

export const constants = {
  ALLOWED_TABLES: [
    "Users",
    "Inventory",
    "Stock",
    "Ingredients",
    "Sales",
    "Sale_Items",
    "Purchases",
    "Purchase_Items",
  ],
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
        DECREMENT_UNITS: `UPDATE Inventory SET n_unidades = n_unidades - ? WHERE id = ?;`,
        INCREMENT_UNITS: `UPDATE Inventory SET n_unidades = n_unidades + ? WHERE id = ?;`,
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
        DELETE_INGREDIENT_BY_ID_INVENTORY: `DELETE FROM Ingredients WHERE id_inventory = ?;`,
        DELETE_BY_STOCK_ID: `DELETE FROM Ingredients WHERE id_producto_stock=?;`,
      },
      sales: {
        GET_ALL: `SELECT * FROM Sales ORDER BY fecha_venta DESC, id DESC;`,
        GET_BY_ID: `SELECT * FROM Sales WHERE id=?;`,
        GET_ITEMS_BY_SALE_ID: `SELECT * FROM Sale_Items WHERE id_sale=? ORDER BY id ASC;`,
        INSERT_SALE: `INSERT INTO Sales(fecha_venta, metodo_pago, id_usuario, total_venta) VALUES (?, ?, ?, ?);`,
        INSERT_SALE_ITEM: `INSERT INTO Sale_Items(id_sale, id_stock, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?);`,
        UPDATE_SALE: `UPDATE Sales SET fecha_venta=?, metodo_pago=?, id_usuario=?, total_venta=? WHERE id=?;`,
        DELETE_SALE_ITEMS_BY_SALE_ID: `DELETE FROM Sale_Items WHERE id_sale=?;`,
        DELETE_SALE_ITEMS_BY_STOCK_ID: `DELETE FROM Sale_Items WHERE id_stock=?;`,
        DELETE_SALE: `DELETE FROM Sales WHERE id=?;`,
      },
      payments: {
        GET_ALL: `SELECT * FROM Sales ORDER BY fecha_venta DESC, id DESC;`,
        GET_BY_ID: `SELECT * FROM Sales WHERE id=?;`,
        INSERT_PAYMENT: `INSERT INTO Sales(fecha_venta, metodo_pago, id_usuario, total_venta) VALUES (NOW(), 'efectivo', 1, ?);`,
        UPDATE_PAYMENT: `UPDATE Sales SET total_venta=total_venta WHERE id=? AND ? IS NOT NULL;`,
        DELETE_PAYMENT: `DELETE FROM Sales WHERE id=?;`,
      },
      purchases: {
        GET_ALL: `SELECT * FROM Purchases ORDER BY fecha_compra DESC, id DESC;`,
        GET_BY_ID: `SELECT * FROM Purchases WHERE id=?;`,
        GET_ITEMS_BY_PURCHASE_ID: `SELECT * FROM Purchase_Items WHERE id_purchase=? ORDER BY id ASC;`,
        INSERT_PURCHASE: `INSERT INTO Purchases(fecha_compra, proveedor, id_usuario, total_compra) VALUES (?, ?, ?, ?);`,
        UPDATE_PURCHASE: `UPDATE Purchases SET fecha_compra=?, proveedor=?, id_usuario=?, total_compra=? WHERE id=?;`,
        DELETE_PURCHASE_ITEMS_BY_PURCHASE_ID: `DELETE FROM Purchase_Items WHERE id_purchase=?;`,
        DELETE_PURCHASE_ITEMS_BY_INVENTORY_ID: `DELETE FROM Purchase_Items WHERE id_inventory=?;`,
        DELETE_PURCHASE: `DELETE FROM Purchases WHERE id=?;`,
      },
      recipes: {
        GET_ALL_RECIPES: `
        SELECT
          s.id,
          s.nombre_producto,
          s.precio_producto,
          s.tiempo_produccion_min,
          s.dificultad,
          s.url,
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
        CREATE_RECIPE: `INSERT INTO Stock(nombre_producto, precio_producto, tiempo_produccion_min, dificultad, url)
  VALUES (?, ?, ?, ?, ?);`,
      },
      GET_GLOBAL_TABLES: `SHOW TABLES;`,
      GET_ALL_DATABASES: `SHOW DATABASES;`,
      GET_GLOBAL_INVENTORY: `SELECT * FROM Inventory;`,
      GET_GLOBAL_INGREDIENTS: `SELECT * FROM Ingredients;`,
      GET_GLOBAL_STOCK: `SELECT * FROM Stock;`,
      GET_GLOBAL_ORDERS: `SELECT * FROM Sales;`,
      GET_TABLE_DATA: (tableName: string) => {
        if (!constants.ALLOWED_TABLES.includes(tableName)) {
          throw new Error(`Tabla no permitida: ${tableName}`);
        }
        return `SELECT * FROM ${tableName};`;
      },
      INSERT_INVENTORY_PRODUCT: `INSERT INTO Inventory(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW());`,
      UPDATE_INVENTORY_PRODUCT: `UPDATE Inventory SET nombre=?, tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE id=?;`,
      DELETE_INVENTORY_PRODUCT: `DELETE FROM Inventory WHERE id=?;`,
    },
  },
};
