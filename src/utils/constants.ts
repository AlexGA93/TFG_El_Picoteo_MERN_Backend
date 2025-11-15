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