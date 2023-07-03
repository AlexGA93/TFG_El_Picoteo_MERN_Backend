/* ****************************** EJEMPLO ****************************** */

/*
En este ejemplo se desea, justo despues de realizar simulacion de ingreso de productos en el almacen,
preparar un grupo de productos elaborados a un precio determinado quefigurara en Stock y a los cuales se
podra accerder a los ingredientes:
- Mixto
- Vegetal 
- Chivito 
- Suponer de las inserciones en las tablas anteriores:
    - precio por unidad en Almacen aleatorio (entre 1 a 10 euros con dos decimales)
    - unidades del inventario aleatorios (entre 1 y 50)
    - precios aleatorios (entre 1 a 3 euros con dos decimales)

En stock figurara una cantidad total de 10 unidades de cada uno de los productos anteriores, de los cuales se 
simulara la compra de 3,2 y 5 unidades de cada uno respectivamente.
*/
INSERT INTO el_picoteo.almacen
(nombre, precio_unidad)
VALUES
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

INSERT INTO el_picoteo.inventario
(id_almacen, unidades, fecha)
VALUES
(1, round(1+(rand()*(50-1))), now()),
(2, round(1+(rand()*(50-1))), now()),
(3, round(1+(rand()*(50-1))), now()),
(4, round(1+(rand()*(50-1))), now()),
(5, round(1+(rand()*(50-1))), now()),
(6, round(1+(rand()*(50-1))), now()),
(7, round(1+(rand()*(50-1))), now()),
(8, round(1+(rand()*(50-1))), now()),
(9, round(1+(rand()*(50-1))), now()),
(10, round(1+(rand()*(50-1))), now()),
(11, round(1+(rand()*(50-1))), now()),
(12, round(1+(rand()*(50-1))), now()),
(13, round(1+(rand()*(50-1))), now()),
(14, round(1+(rand()*(50-1))), now()),
(15, round(1+(rand()*(50-1))), now()),
(16, round(1+(rand()*(50-1))), now()),
(17, round(1+(rand()*(50-1))), now()),
(18, round(1+(rand()*(50-1))), now()),
(19, round(1+(rand()*(50-1))), now()),
(20, round(1+(rand()*(50-1))), now()),
(22, round(1+(rand()*(50-1))), now()),
(23, round(1+(rand()*(50-1))), now()),
(24, round(1+(rand()*(50-1))), now()),
(25, round(1+(rand()*(50-1))), now()),
(26, round(1+(rand()*(50-1))), now()),
(27, round(1+(rand()*(50-1))), now()),
(28, round(1+(rand()*(50-1))), now()),
(29, round(1+(rand()*(50-1))), now()),
(30, round(1+(rand()*(50-1))), now()),
(31, round(1+(rand()*(50-1))), now()),
(32, round(1+(rand()*(50-1))), now()),
(33, round(1+(rand()*(50-1))), now()),
(34, round(1+(rand()*(50-1))), now()),
(35, round(1+(rand()*(50-1))), now()),
(36, round(1+(rand()*(50-1))), now()),
(37, round(1+(rand()*(50-1))), now()),
(38, round(1+(rand()*(50-1))), now()),
(39, round(1+(rand()*(50-1))), now()),
(40, round(1+(rand()*(50-1))), now()),
(41, round(1+(rand()*(50-1))), now()),
(42, round(1+(rand()*(50-1))), now()),
(43, round(1+(rand()*(50-1))), now()),
(44, round(1+(rand()*(50-1))), now()),
(45, round(1+(rand()*(50-1))), now()),
(46, round(1+(rand()*(50-1))), now()),
(47, round(1+(rand()*(50-1))), now()),
(48, round(1+(rand()*(50-1))), now()),
(49, round(1+(rand()*(50-1))), now()),
(50, round(1+(rand()*(50-1))), now()),
(51, round(1+(rand()*(50-1))), now()),
(52, round(1+(rand()*(50-1))), now()),
(53, round(1+(rand()*(50-1))), now()),
(54, round(1+(rand()*(50-1))), now()),
(55, round(1+(rand()*(50-1))), now()),
(56, round(1+(rand()*(50-1))), now()),
(57, round(1+(rand()*(50-1))), now()),
(58, round(1+(rand()*(50-1))), now()),
(59, round(1+(rand()*(50-1))), now()),
(60, round(1+(rand()*(50-1))), now()),
(61, round(1+(rand()*(50-1))), now()),
(62, round(1+(rand()*(50-1))), now()),
(63, round(1+(rand()*(50-1))), now()),
(64, round(1+(rand()*(50-1))), now())
;

INSERT INTO el_picoteo.productos
(nombre, precio_producto)
VALUES
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

-- Tantos como elementos ponga el local a disposicion del cliente
;
INSERT INTO el_picoteo.recetas
(id_producto, id_almacen, cantidad)
VALUES
(1,1,2),(1,5,1),(1,34,1),
-- vegano = pan de molde, lechuga, tomate, soja, aceite de oliva
(2,1,2),(2,17,1),(2,18,2),(2,23,1),(2,55,1),
-- vegetal = pan de molde, lechuga, tomate, atun, huevo
(3,1,2),(3,17,1),(3,18,2),(3,16,1),(3,10,1),
-- Chivito = pan de barra, lechuga, tomate, pechugade pavo, huevo, mayonesa
(4,2,2),(4,17,1),(4,18,2),(4,7,1),(4,10,1),(4,57,1),
-- Bocadillo de tortilla = pan de Barra, tortilla de patatas(huevos , patatas)
(5,2,2),(5,10,2),(5,24,2),
-- hamburguesa = pan de hamburguesa, lechuga, tomate, fielete vacuno, patatas, huevo
(6,3,2),(6,17,1),(6,18,2),(6,8,1),(6,10,1),(6,24,10),
-- tortilla = huevos
(7,10,5),
-- tortilla de patatas = huevos , patatas
(8,10,5),(8,24,5),
-- combinado de pavo = Pechuga de pavo, huevo, patatas, lechuga, tomate 
(9,7,2),(9,10,1),(9,24,10),(9,17,1),(9,18,1),
-- combinado de pollo = Pechuga de pollo, huevo, patatas, lechuga, tomate
(10,6,2),(10,10,1),(10,24,10),(10,17,1),(10,18,1)

-- Tantos como elementos ponga el local a disposicion del cliente
;

SELECT * FROM el_picoteo.recetas;


-- 2.extraemos sus ids y los usamos en la tabla stock
INSERT INTO el_picoteo.stock
(id_receta, unidades, fecha)
VALUES
-- mixto [id_receta: 1, unidades: 3]
(1,3,now()),
-- vegetal [id_receta: 3, unidades: 2]
(3,2,now()),
-- chivito [id_receta: 4, unidades: 5]
(4,5,now())
;

SELECT * from el_picoteo.stock;
-- 3
-- mostrar agrupacionde los nombres y precios de Productos junto con los ingredientes(id_almacen) y cantidad de Recetas
/* SELECT p.nombre, p.precio_producto, r.id_almacen, r.cantidad
FROM Productos p JOIN Recetas r on p.id = r.id_producto
ORDER BY p.id; */
/* 
SELECT p.nombre, p.precio_producto, a.nombre, r.cantidad
FROM Productos p
INNER JOIN Recetas r ON p.id=r.id_producto
INNER JOIN Almacen a ON r.id_almacen=a.id
; */

insert into Inventario
(id_almacen, unidades, fecha)
values
/*
Multiplicamos por (-2) ya que necesitamos que el registro sea negativo(por sustraccion) y tanto como elementos finales
ponemos en stoock. En este caso cada ingrediente tendra su (-)(numero de ingredientes * numero_elementos finales)
*/
(1, 2*(-3), now()),
(5, 1*(-3), now()), 
(34, 1*(-3), now()), 

-- vegetal
(1, 2*(-2), now()),
(17, 1*(-2), now()), 
(18, 2*(-2), now()), 
(16, 1*(-2), now()), 
(10, 1*(-2), now()), 
-- Chivito
(2, 2*(-5), now()), 
(17, 1*(-5), now()), 
(18, 2*(-5), now()), 
(7, 1*(-5), now()), 
(10, 1*(-5), now()),
(57, 1*(-5), now()) 
;





SELECT * FROM el_picoteo.almacen;
SELECT * FROM el_picoteo.inventario;
SELECT * FROM el_picoteo.productos;
SELECT * FROM el_picoteo.recetas;
SELECT * FROM el_picoteo.stock;


