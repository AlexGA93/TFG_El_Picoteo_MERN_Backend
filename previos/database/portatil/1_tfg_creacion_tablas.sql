/* Creacion DDBB */
-- mostrar bases de datos
SHOW DATABASES;
-- creacion base de datos 
CREATE DATABASE El_Picoteo;
-- seleccionamos la ddbb deseada
USE El_Picoteo;


/* Creacion Tablas: Registro de Productos */

CREATE TABLE Almacen(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    precio_unidad FLOAT,

    PRIMARY KEY (id)
);

CREATE TABLE Inventario(
    id INT AUTO_INCREMENT,
    id_almacen INT,
    unidades INT,
    fecha DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (id_almacen) REFERENCES Almacen(id)
);


/* Creacion de Tablas: Inversion productos a stock */
CREATE TABLE Productos(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    precio_producto FLOAT,

    PRIMARY KEY (id)
);

CREATE TABLE Recetas(
    id INT AUTO_INCREMENT,
    id_producto INT,
    id_almacen INT,
    cantidad INT,

    PRIMARY KEY (id),
    FOREIGN KEY (id_producto) REFERENCES Productos(id),
    FOREIGN KEY (id_almacen) REFERENCES Almacen(id)
);

CREATE TABLE Stock(
    id INT AUTO_INCREMENT,
    id_receta INT,
    unidades INT,
    fecha DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (id_receta) REFERENCES Productos(id)
);

-- mostrar tabla de ddbb
SHOW TABLES;
















/* ****************************** BORRADO DE TABLAS DE BASE DE DATOS ****************************** */

drop table Recetas;
drop table Inventario;
drop table Almacen;


DROP DATABASE El_Picoteo;