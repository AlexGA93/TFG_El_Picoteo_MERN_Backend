create table Almacen (id int not null auto_increment,nombre varchar(100),precio_unidad float,primary key (id));
create table Inventario (id int auto_increment,id_almacen int ,unidades int,fecha datetime,primary key (id),foreign key (id_almacen) references Almacen(id));
create table Productos (id int auto_increment,nombre varchar(100),precio_producto float,primary key(id));
create table Recetas (id int auto_increment,id_producto int ,id_almacen int,cantidad int,primary key (id),foreign key (id_producto) references Productos(id),foreign key (id_almacen) references Almacen(id));
create table Stock(id int auto_increment,id_producto int,unidades int, fecha datetime,primary	key(id),foreign key (id_producto) references Productos(id));
insert into Almacen (nombre, precio_unidad) values('Pan de Molde', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pan de Barra', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pan de Hamburguesa', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Jamon Serrano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Jamon Cocido', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pechuga de Pollo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pechuga de Pavo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Filete Vacuno', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Filete de Cerdo', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Huevos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Merluza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Salmon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lenguado', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Rape', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Dorada', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Atun', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lechuga', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Tomate', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Zanahoria', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pimientos Verdes', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pimientos Rojos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Berenjena', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Soja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Patatas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Platano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Naranja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Mandarina', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Manzana', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Pera', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Melon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cereza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Sandia', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Soja Texturizada', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Queso de cabra', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Queso en lonchas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Yogur natural', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Arroz', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fideos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Macarrones', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Lentejas', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Garbanzos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Coca-cola', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Coca-cola zero', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fanta de Limon', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fanta de Naranja', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Agua Mineral', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cafe en grano', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Manzanilla', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te verde', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te Chia', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Te Roibos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Azucar Blanco', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Azucar Moreno', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Sacarina', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Aceite de Oliva', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Aceite de Girasol', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('mayonesa', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('ketchup', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('mostaza', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cheetos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Conos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Cacahuetes', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Fritos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),('Doritos', CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2)));
insert into Inventario (id_almacen, unidades, fecha) values (1, round(1+(rand()*(50-1))), NOW()), (2, round(1+(rand()*(50-1))), NOW()),(3, round(1+(rand()*(50-1))), NOW()),(4, round(1+(rand()*(50-1))), NOW()),(5, round(1+(rand()*(50-1))), NOW()),(6, round(1+(rand()*(50-1))), NOW()),(7, round(1+(rand()*(50-1))), NOW()),(8, round(1+(rand()*(50-1))), NOW()),(9, round(1+(rand()*(50-1))), NOW()),(10, round(1+(rand()*(50-1))), NOW()),(11, round(1+(rand()*(50-1))), NOW()),(12, round(1+(rand()*(50-1))), NOW()),(13, round(1+(rand()*(50-1))), NOW()),(14, round(1+(rand()*(50-1))), NOW()),(15, round(1+(rand()*(50-1))), NOW()),(16, round(1+(rand()*(50-1))), NOW()),(17, round(1+(rand()*(50-1))), NOW()),(18, round(1+(rand()*(50-1))), NOW()),(19, round(1+(rand()*(50-1))), NOW()),( 20, round(1+(rand()*(50-1))), NOW()),( 22, round(1+(rand()*(50-1))), NOW()),( 23, round(1+(rand()*(50-1))), NOW()),( 24, round(1+(rand()*(50-1))), NOW()),( 25, round(1+(rand()*(50-1))), NOW()),( 26, round(1+(rand()*(50-1))), NOW()),( 27, round(1+(rand()*(50-1))), NOW()),( 28, round(1+(rand()*(50-1))), NOW()),( 29, round(1+(rand()*(50-1))), NOW()),( 30, round(1+(rand()*(50-1))), NOW()),( 31, round(1+(rand()*(50-1))), NOW()),( 32, round(1+(rand()*(50-1))), NOW()),( 33, round(1+(rand()*(50-1))), NOW()),( 34, round(1+(rand()*(50-1))), NOW()),( 35, round(1+(rand()*(50-1))), NOW()),( 36, round(1+(rand()*(50-1))), NOW()),( 37, round(1+(rand()*(50-1))), NOW()),( 38, round(1+(rand()*(50-1))), NOW()),( 39, round(1+(rand()*(50-1))), NOW()),( 40, round(1+(rand()*(50-1))), NOW()),( 41, round(1+(rand()*(50-1))), NOW()),( 42, round(1+(rand()*(50-1))), NOW()),( 43, round(1+(rand()*(50-1))), NOW()),( 44, round(1+(rand()*(50-1))), NOW()),( 45, round(1+(rand()*(50-1))), NOW()),( 46, round(1+(rand()*(50-1))), NOW()),( 47, round(1+(rand()*(50-1))), NOW()),( 48, round(1+(rand()*(50-1))), NOW()),( 49, round(1+(rand()*(50-1))), NOW()),( 50, round(1+(rand()*(50-1))), NOW()),( 51, round(1+(rand()*(50-1))), NOW()),( 52, round(1+(rand()*(50-1))), NOW()),( 53, round(1+(rand()*(50-1))), NOW()),( 54, round(1+(rand()*(50-1))), NOW()),( 55, round(1+(rand()*(50-1))), NOW()),( 56, round(1+(rand()*(50-1))), NOW()),( 57, round(1+(rand()*(50-1))), NOW()),( 58, round(1+(rand()*(50-1))), NOW()),( 59, round(1+(rand()*(50-1))), NOW()),( 60, round(1+(rand()*(50-1))), NOW()),( 61, round(1+(rand()*(50-1))), NOW()),( 62, round(1+(rand()*(50-1))), NOW()),( 63, round(1+(rand()*(50-1))), NOW()),( 64, round(1+(rand()*(50-1))), NOW());
insert into Productos(nombre, precio_producto)values('Sadwitch mixto', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Sadwitch vegano', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Sadwitch vegetal', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Chivito', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Bocadillo de Tortilla', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Hamburguesa', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Tortilla', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Tortilla de patatas', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Combinado de pavo', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),('Combinado de pollo', CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2)));
insert into Recetas(id_producto, id_almacen, cantidad)values(1,1,2),(1,5,1),(1,34,1),(2,1,2),(2,17,1),(2,18,2),(2,23,1),(2,55,1),(3,1,2),(3,17,1),(3,18,2),(3,16,1),(3,10,1),(4,2,2),(4,17,1),(4,18,2),(4,7,1),(4,10,1),(4,57,1),(5,2,2),(5,10,2),(5,22,2),(6,3,2),(6,17,1),(6,18,2),(6,8,1),(6,10,1),(6,22,10),(7,10,5),(8,10,5),(8,22,5),(9,7,2),(9,10,1),(9,22,10),(9,17,1),(9,18,1),(10,6,2),(10,10,1),(10,22,10),(10,17,1),(10,18,1);
