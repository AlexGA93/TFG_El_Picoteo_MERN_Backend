import { emailCheckRegex } from "./utilities";

export const constants = {
    ALLOWED_TABLES: ['Usuarios', 'Inventario', 'Stock', 'Ingredientes', 'Pagos'],
    SQL_QUERIES: {
        AUTH: {
            CHECK_EMAIL: `SELECT * FROM Usuarios WHERE email = ?;`,
            INSERT_USER:`INSERT INTO Usuarios(nombre,apellidos, email, password, role) values(? , ?, ?, ?, ?);` ,
            CHECK_USER_BY_EMAIL: `SELECT * FROM Usuarios WHERE email = ?;`,
            TOKEN_VALIDATION: `SELECT * FROM Usuarios WHERE email = ? AND role = ?;`
        },
        USERS: {
            GET_GLOBAL_USERS: `SELECT * FROM Usuarios;`,
            GET_USER_BY_ID: `SELECT * FROM Usuarios WHERE id=?;`,
            UPDATE_USER_NAME: `UPDATE Usuarios SET name=?, second_name=? WHERE id=?;`
        },
        DATABASE: {
            INVENTARIO: {
                GET_ALL: `SELECT * FROM Inventario;`,
                GET_BY_ID: `SELECT * FROM Inventario WHERE id=?;`,
                INSERT_PRODUCT: `INSERT INTO Inventario(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad) VALUES (?, ?, ?, ?, ?, ?);`,
                UPDATE_PRODUCT: `UPDATE Inventario SET tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE nombre=?;`,
                DELETE_PRODUCT: `DELETE FROM Inventario WHERE nombre=?;`  
            },
            STOCK: {
                GET_ALL: `SELECT * FROM Stock;`,
                GET_BY_ID: `SELECT * FROM Stock WHERE id=?;`,
                INSERT_STOCK_PRODUCT: `INSERT INTO Stock(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad) VALUES (?, ?, ?, ?, ?, ?);`,
                UPDATE_STOCK_PRODUCT: `UPDATE Stock SET tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE nombre=?;`,
                DELETE_STOCK_PRODUCT: `DELETE FROM Stock WHERE nombre=?;`
            },
            INGREDIENTES: {
                GET_ALL: `SELECT * FROM Ingredientes;`,
                GET_BY_ID: `SELECT * FROM Ingredientes WHERE id=?;`,
                INSERT_INGREDIENT: `INSERT INTO Ingredientes(nombre, cantidad, unidad_medida) VALUES (?, ?, ?);`,
                UPDATE_INGREDIENT: `UPDATE Ingredientes SET cantidad=?, unidad_medida=? WHERE nombre=?;`,
                DELETE_INGREDIENT: `DELETE FROM Ingredientes WHERE nombre=?;`
            },
            GET_GLOBAL_TABLES: `SHOW TABLES;`,
            GET_ALL_DATABASES: `SHOW DATABASES;`,
            GET_GLOBAL_INVENTORY:`SELECT * FROM Inventario;` ,
            GET_GLOBAL_INGREDIENTS: `SELECT * FROM Ingredientes;`,
            GET_GLOBAL_STOCK: `SELECT * FROM Stock;`,
            GET_GLOBAL_ORDERS: `SELECT * FROM Pagos;`,
            // GET DATA
            GET_TABLE_DATA: (tableName: string) => {
                
                if (!constants.ALLOWED_TABLES.includes(tableName)) {
                    throw new Error(`Tabla no permitida: ${tableName}`);
                }
                return `SELECT * FROM ${tableName};`;
            },
            // INSERT DATA
            INSERT_INVENTORY_PRODUCT: `INSERT INTO Inventario(nombre, tipo, unidades, n_unidades, proveedor, precio_unidad) VALUES (?, ?, ?, ?, ?, ?);`,
            // UPDATE DATA
            UPDATE_INVENTORY_PRODUCT: `UPDATE Inventario SET tipo=?, unidades=?, n_unidades=?, proveedor=?, precio_unidad=? WHERE nombre=?;`,
            // DELETE DATA
            DELETE_INVENTORY_PRODUCT: `DELETE FROM Inventario WHERE nombre=?;`

        }
    }
};