# El Picoteo .SL

## Indice

### Backend
- [Diseno de bases de datos (MySQL)](#diseno-de-bases-de-datos-mysql)
    - [Estructura basica](#estructura-basica)
    - [Operaciones de Control](#operaciones-de-control  )
    - Instrucciones de Filtrado
- Preparacion entorno de backend (Script de servidor)
    - Node.js
    - Javascript / Typescript
- Seleccion e instalacion de dependencias
- Conexion con la base de datos
- Dockerizacion
    - Docker
    - Dockerfile
    - Docker Compose
- Rutas
- Controladores
- Middleware (Administrador)
### Frontend
### Herramientas
- Herramientas
    - Git
    - Github
    - Vs Code
    - Insomnia
    - Figma


---

## Diseno de bases de datos (MySQL)

En esta seccion trataremos los distintos procesos necesarios para el diseno de nuestra base de datos. Para este proyecto se ha tomado la dicision de usar un sistema de tratamiento de datos de tablas mediante el lenguaje de programacion SQL [(Structured Query Language o Lenguaje de Consulta Estructurado)](https://en.wikipedia.org/wiki/SQL).

Este sistema nos proporcionara la infraestructura necesaria para mantener un registro de toda actividad relacionada con los elementos a tratar o guardados para con el buen funcionamiento de nuestra aplicacion o sistema.

### Estructura basica

Para este proyecto, y habiendo escogido el sistema y lenguaje de tabals SQL hemos decidido por usar el entorno de codigo abierto mas usado en la actualidad, [MySQL](https://www.mysql.com/).

Haciendo referencia a la estructura de nuestra base de datos se ha ideado un sistema de tablas simple para el cual el administrador dispondra de las siguientes tablas para gestionar distintas secciones del funcionamiento de la aplicacion:

- **ALMACENAMIENTO**

    - Tabla **Almacen**

        Destiando a almacenar campo sencillos referentes a los productos adquiridos por el establecimiento tales como: **Nombre del producto y precio po unidad del mismo.**
        ```
        CREATE TABLE Almacen(
            id INT AUTO_INCREMENT,
            nombre VARCHAR(100),
            precio_unidad FLOAT,

            PRIMARY KEY (id)
        );
        ```

    - Tabla **Inventario**

        Referenciando a la tabla anterior (Almacen), establecemos una relacion con cada producto de la anterior aplicandole informacion adicional como: **Unidades actuales adquiridas por el local y la fecha de adquisicion del susodicho producto.**

        Mediante esta tabla podremos mantener un registro constante de actividad para con nuestros datos, tales como las adquisiciones como las sustracciones encaso de destinar elementos o ingredientes a la elaboracion de otros productos destinados a venta.

        ```
        CREATE TABLE Inventario(
            id INT AUTO_INCREMENT,
            id_almacen INT,
            unidades INT,
            fecha DATETIME,

            PRIMARY KEY (id),
            FOREIGN KEY (id_almacen) REFERENCES Almacen(id)
        );
        ```

- **ELABORACION**
    - Tabla **Productos**

        Tabla destinada al almacenamiento de informacion referente a las futuras recetas, las cuales estaran formadas por combinaciones de ingredientes y su posterior registro de sustraccion del Inventario.

        ```
        CREATE TABLE Productos(
            id INT AUTO_INCREMENT,
            nombre VARCHAR(100),
            precio_producto FLOAT,

            PRIMARY KEY (id)
        );
        ```

    - Tabla **Recetas**

        Tabla encargada de gestionar la asignacion de los distintos ingredientes encargados de conformar el producto final destinado a venta.

        Este sistema procesara tanto elementos elaborados(aquellos que precisan de otros productos figurantes en el Almacen), como de aquellos que ellos mismos representen el propio producto destinado a compra.

        ```
        CREATE TABLE Recetas(
            id INT AUTO_INCREMENT,
            id_producto INT,
            id_almacen INT,
            cantidad INT,

            PRIMARY KEY (id),
            FOREIGN KEY (id_producto) REFERENCES Productos(id),
            FOREIGN KEY (id_almacen) REFERENCES Almacen(id)
        );
        ```

    - Tabla **Stock**

        Habiendo realizado anteriormente la asignacion de las distintas recetas existentes en nuestro establecimiento, necesitaremos una tabla que se encargue de visualizar tanto las propias recetas existentes, como las unidades de las mismas disponibles a venta y la fecha en la cual fue registrada.

        ```
        CREATE TABLE Stock(
            id INT AUTO_INCREMENT,
            id_receta INT,
            unidades INT,
            fecha DATETIME,

            PRIMARY KEY (id),
            FOREIGN KEY (id_receta) REFERENCES Productos(id)
        );
        ```
### ENDPOINTS
```

Endpoints
========

/api/databases
- /                                                                                            - get all databases
- /:database_name/tables/                                                                      - get all database tables
- /:database_name/tables/:table_name                                                           - get table content

Endpoints for admin's use
--------------------------------------------------------------------------------------------------------------------------------------
- /:database_name/tables/:table_name                                                           - post database new element(s) IF NOT EXISTS
- /:database_name/tables/:table_name                                                           - put /patch database element(s) IF EXISTS
- /:database_name/tables/:table_name                                                           - delete  database new element(s) IF EXISTS
--------------------------------------------------------------------------------------------------------------------------------------

FILTER DATABASE TABLES CONTENT
- /:database_name/tables/:table_name/filter




```