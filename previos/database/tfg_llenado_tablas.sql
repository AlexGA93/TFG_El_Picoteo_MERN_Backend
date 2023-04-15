/* ****************************** CREACION INFRAESTRUCTURA ****************************** */
show databases;
create database Picoteo;
use Picoteo;

show tables;

create table Almacen (
id int auto_increment,
nombre varchar(100),
precio_unidad float,

primary key (id)
);

create table Inventario (
id int auto_increment,
id_almacen int ,
unidades int,
fecha datetime,

primary key (id),
foreign key (id_almacen) references Almacen(id)
);

-- lo que se vende en tabla stock
create table Productos (
id int auto_increment,
nombre varchar(100),
precio_producto float,

primary key(id)
);

-- plantilla coleccion de ingredientes de cada producto
create table Recetas (
id int auto_increment,
id_producto int ,
id_almacen int,
cantidad int,

primary key (id),
foreign key (id_producto) references Productos(id),
foreign key (id_almacen) references Almacen(id)
);

create table Stock(
id int auto_increment,
id_producto int,
unidades int, 
fecha datetime,

primary	key(id),
foreign key (id_producto) references Productos(id) 
);

/* ****************************** ADQUISICION DE INGREDIENTES Y REGISTRO ****************************** */
-- precios asignados de forma random entre 1 y 10 euros con dos decimales
insert into Almacen
(nombre, precio_unidad)
values
-- panes
("Pan de Molde", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pan de Barra", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pan de Hamburguesa", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- carnes
("Jamon Serrano", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Jamon Cocido", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pechuga de Pollo", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pechuga de Pavo", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Filete Vacuno", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Filete de Cerdo", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Huevos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- pescados
("Merluza", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Salmon", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Lenguado", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Rape", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Dorada", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Atun", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- verduras
("Lechuga", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Tomate", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Zanahoria", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pimientos Verdes", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pimientos Rojos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Berenjena", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Soja", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Patatas", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- frutas
("Platano", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Naranja", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Mandarina", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Manzana", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Pera", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Melon", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Cereza", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Sandia", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Soja Texturizada", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- lacteos
("Queso de cabra", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Queso en lonchas", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Yogur natural", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- arroces/pastas/legumbres
("Arroz", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Fideos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Macarrones", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Lentejas", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Garbanzos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- refrescos
("Coca-cola", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Coca-cola zero", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Fanta de Limon", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Fanta de Naranja", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Agua Mineral", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- cafes/infusiones
("Cafe en grano", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Manzanilla", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Te verde", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Te Chia", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Te Roibos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- edulcorantes
("Azucar Blanco", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Azucar Moreno", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Sacarina", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- salsas y condemientos
("Aceite de Oliva", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Aceite de Girasol", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("mayonesa", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("ketchup", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("mostaza", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
-- snacks
("Cheetos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Conos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Cacahuetes", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Fritos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2))),
("Doritos", CAST(ROUND((RAND()*(10.00-1.00)+1.00), 2)as decimal(18,2)))

;

select * from Almacen;

-- edicion de registro con el numerode unidades random desde 0 a 49
insert into Inventario
(id_almacen, unidades, fecha)
values
(1, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(2, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(3, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(4, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(5, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(6, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(7, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(8, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(9, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(10, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(11, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(12, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(13, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(14, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(15, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(16, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(17, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(18, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(19, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(20, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(22, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(23, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(24, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(25, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(26, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(27, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(28, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(29, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(30, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(31, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(32, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(33, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(34, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(35, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(36, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(37, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(38, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(39, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(40, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(41, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(42, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(43, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(44, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(45, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(46, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(47, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(48, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(49, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(50, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(51, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(52, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(53, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(54, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(55, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(56, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(57, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(58, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(59, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(60, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(61, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(62, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(63, round(1+(rand()*(50-1))), "2023-04-13 17:17:00"),
(64, round(1+(rand()*(50-1))), "2023-04-13 17:17:00")
;

select * from Inventario;


/* ****************************** PREPARACION DE RECETAS Y PRODUCTOS ****************************** */
-- Insercion de Producto final con nombre y precio
insert into Productos
(nombre, precio_producto)
values
("Sadwitch mixto", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Sadwitch vegano", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Sadwitch vegetal", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Chivito", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Bocadillo de Tortilla", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Hamburguesa", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Tortilla", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Tortilla de patatas", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Combinado de pavo", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2))),
("Combinado de pollo", CAST(ROUND((RAND()*(3.00-1.00)+1.00), 2)as decimal(18,2)))
;

select * from Productos;
-- Asociacion de producto con receta - CREACION DE RECETA
insert into Recetas
(id_producto, id_almacen, cantidad)
values
--mixto = pan de molde, jamon, queso
(1,1,2),(1,5,1),(1,34,1),
-- vegano = pan de molde, lechuga, tomate, soja, aceite de oliva
(2,1,2),(2,17,1),(2,18,2),(2,23,1),(2,55,1),
-- vegetal = pan de molde, lechuga, tomate, atun, huevo
(3,1,2),(3,17,1),(3,18,2),(3,16,1),(3,10,1),
-- Chivito = pan de barra, lechuga, tomate, pechugade pavo, huevo, mayonesa
(4,2,2),(4,17,1),(4,18,2),(4,7,1),(4,10,1),(4,57,1),
-- Bocadillo de tortilla = pan de Barra, tortilla de patatas(huevos , patatas)
(5,2,2),(5,10,2),(5,22,2),
-- hamburguesa = pan de hamburguesa, lechuga, tomate, fielete vacuno, patatas, huevo
(6,3,2),(6,17,1),(6,18,2),(6,8,1),(6,10,1),(6,22,10),
-- tortilla = huevos
(7,10,5),
-- tortilla de patatas = huevos , patatas
(8,10,5),(8,22,5),
-- combinado de pavo = Pechuga de pavo, huevo, patatas, lechuga, tomate 
(9,7,2),(9,10,1),(9,22,10),(9,17,1),(9,18,1),
-- combinado de pollo = Pechuga de pollo, huevo, patatas, lechuga, tomate
(10,6,2),(10,10,1),(10,22,10),(10,17,1),(10,18,1)
;

select * from Recetas;

-- Registro en tabla inventario para registrar la retirada de los ingredientes destinados a la recetas

-- Actualizar tabla de stock con el registro de los productos
















/* ****************************** BORRADO DE TABLAS DE BASE DE DATOS ****************************** */

drop table Recetas;
drop table Inventario;
drop table Almacen;

drop database Picoteo;