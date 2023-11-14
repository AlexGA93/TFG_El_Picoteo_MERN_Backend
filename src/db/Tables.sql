CREATE TABLE Almacen (id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(100), precio_unidad FLOAT, PRIMARY KEY(id));
CREATE TABLE Inventario(id INT NOT NULL AUTO_INCREMENT, id_almacen INT, unidades INT, fecha DATETIME, PRIMARY KEY (id), FOREIGN KEY (id_almacen) REFERENCES Almacen(id));
CREATE TABLE Productos(id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(100), precio_producto FLOAT, PRIMARY KEY(id));
CREATE TABLE Recetas(id INT NOT NULL AUTO_INCREMENT,id_producto INT ,id_almacen INT ,cantidad INT ,PRIMARY KEY (id),FOREIGN KEY (id_producto) REFERENCES Productos(id),FOREIGN KEY(id_almacen) REFERENCES Almacen(id));
CREATE TABLE Stock(id INT NOT NULL AUTO_INCREMENT,id_producto INT ,unidades INT ,fecha DATETIME ,PRIMARY KEY (id),FOREIGN KEY (id_producto) REFERENCES Productos(id));
CREATE TABLE Pagos(id INT NOT NULL AUTO_INCREMENT,nombre_pedido VARCHAR(100) ,id_producto INT ,metodo_pago VARCHAR(100), precio FLOAT,fecha DATETIME ,PRIMARY KEY (id),FOREIGN KEY (id_producto) REFERENCES Productos(id));
INSERT INTO Almacen(nombre, precio_unidad) VALUES('Pan de Molde', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pan de Barra', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pan de Hamburguesa', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Jamon Serrano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Jamon Cocido', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pechuga de Pollo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pechuga de Pavo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Filete Vacuno', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Filete de Cerdo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Huevos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Merluza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Salmon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lenguado', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Rape', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Dorada', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Atun', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lechuga', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Tomate', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Zanahoria', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pimientos Verdes', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pimientos Rojos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Berenjena', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Soja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Patatas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Platano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Naranja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Mandarina', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Manzana', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pera', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Melon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cereza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Sandia', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Soja Texturizada', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Queso de cabra', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Queso en lonchas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Yogur natural', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Arroz', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fideos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Macarrones', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lentejas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Garbanzos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Coca-cola', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Coca-cola zero', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fanta de Limon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fanta de Naranja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Agua Mineral', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cafe en grano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Manzanilla', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te verde', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te Chia', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te Roibos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Azucar Blanco', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Azucar Moreno', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Sacarina', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Aceite de Oliva', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Aceite de Girasol', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('mayonesa', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('ketchup', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('mostaza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cheetos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Conos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cacahuetes', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fritos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Doritos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2)));
INSERT INTO Inventario(id_almacen, unidades, fecha) VALUES (1, ROUND(1+(RAND()*(50-1))), NOW()), (2, ROUND(1+(RAND()*(50-1))), NOW()),(3, ROUND(1+(RAND()*(50-1))), NOW()),(4, ROUND(1+(RAND()*(50-1))), NOW()),(5, ROUND(1+(RAND()*(50-1))), NOW()),(6, ROUND(1+(RAND()*(50-1))), NOW()),(7, ROUND(1+(RAND()*(50-1))), NOW()),(8, ROUND(1+(RAND()*(50-1))), NOW()),(9, ROUND(1+(RAND()*(50-1))), NOW()),(10, ROUND(1+(RAND()*(50-1))), NOW()),(11, ROUND(1+(RAND()*(50-1))), NOW()),(12, ROUND(1+(RAND()*(50-1))), NOW()),(13, ROUND(1+(RAND()*(50-1))), NOW()),(14, ROUND(1+(RAND()*(50-1))), NOW()),(15, ROUND(1+(RAND()*(50-1))), NOW()),(16, ROUND(1+(RAND()*(50-1))), NOW()),(17, ROUND(1+(RAND()*(50-1))), NOW()),(18, ROUND(1+(RAND()*(50-1))), NOW()),(19, ROUND(1+(RAND()*(50-1))), NOW()),( 20, ROUND(1+(RAND()*(50-1))), NOW()),( 22, ROUND(1+(RAND()*(50-1))), NOW()),( 23, ROUND(1+(RAND()*(50-1))), NOW()),( 24, ROUND(1+(RAND()*(50-1))), NOW()),( 25, ROUND(1+(RAND()*(50-1))), NOW()),( 26, ROUND(1+(RAND()*(50-1))), NOW()),( 27, ROUND(1+(RAND()*(50-1))), NOW()),( 28, ROUND(1+(RAND()*(50-1))), NOW()),( 29, ROUND(1+(RAND()*(50-1))), NOW()),( 30, ROUND(1+(RAND()*(50-1))), NOW()),( 31, ROUND(1+(RAND()*(50-1))), NOW()),( 32, ROUND(1+(RAND()*(50-1))), NOW()),( 33, ROUND(1+(RAND()*(50-1))), NOW()),( 34, ROUND(1+(RAND()*(50-1))), NOW()),( 35, ROUND(1+(RAND()*(50-1))), NOW()),( 36, ROUND(1+(RAND()*(50-1))), NOW()),( 37, ROUND(1+(RAND()*(50-1))), NOW()),( 38, ROUND(1+(RAND()*(50-1))), NOW()),( 39, ROUND(1+(RAND()*(50-1))), NOW()),( 40, ROUND(1+(RAND()*(50-1))), NOW()),( 41, ROUND(1+(RAND()*(50-1))), NOW()),( 42, ROUND(1+(RAND()*(50-1))), NOW()),( 43, ROUND(1+(RAND()*(50-1))), NOW()),( 44, ROUND(1+(RAND()*(50-1))), NOW()),( 45, ROUND(1+(RAND()*(50-1))), NOW()),( 46, ROUND(1+(RAND()*(50-1))), NOW()),( 47, ROUND(1+(RAND()*(50-1))), NOW()),( 48, ROUND(1+(RAND()*(50-1))), NOW()),( 49, ROUND(1+(RAND()*(50-1))), NOW()),( 50, ROUND(1+(RAND()*(50-1))), NOW()),( 51, ROUND(1+(RAND()*(50-1))), NOW()),( 52, ROUND(1+(RAND()*(50-1))), NOW()),( 53, ROUND(1+(RAND()*(50-1))), NOW()),( 54, ROUND(1+(RAND()*(50-1))), NOW()),( 55, ROUND(1+(RAND()*(50-1))), NOW()),( 56, ROUND(1+(RAND()*(50-1))), NOW()),( 57, ROUND(1+(RAND()*(50-1))), NOW()),( 58, ROUND(1+(RAND()*(50-1))), NOW()),( 59, ROUND(1+(RAND()*(50-1))), NOW()),( 60, ROUND(1+(RAND()*(50-1))), NOW()),( 61, ROUND(1+(RAND()*(50-1))), NOW()),( 62, ROUND(1+(RAND()*(50-1))), NOW()),( 63, ROUND(1+(RAND()*(50-1))), NOW()),( 64, ROUND(1+(RAND()*(50-1))), NOW());
INSERT INTO Productos(nombre, precio_producto)VALUES('Sadwitch mixto', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Sadwitch vegano', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Sadwitch vegetal', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Chivito', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Bocadillo de Tortilla', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Hamburguesa', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Tortilla', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Tortilla de patatas', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Combinado de pavo', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Combinado de pollo', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2)));
INSERT INTO Recetas(id_producto, id_almacen, cantidad)VALUES(1,1,2),(1,5,1),(1,34,1),(2,1,2),(2,17,1),(2,18,2),(2,23,1),(2,55,1),(3,1,2),(3,17,1),(3,18,2),(3,16,1),(3,10,1),(4,2,2),(4,17,1),(4,18,2),(4,7,1),(4,10,1),(4,57,1),(5,2,2),(5,10,2),(5,22,2),(6,3,2),(6,17,1),(6,18,2),(6,8,1),(6,10,1),(6,22,10),(7,10,5),(8,10,5),(8,22,5),(9,7,2),(9,10,1),(9,22,10),(9,17,1),(9,18,1),(10,6,2),(10,10,1),(10,22,10),(10,17,1),(10,18,1);
