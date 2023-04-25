-- mostrar bases de datos
SHOW DATABASES;
USE El_Picoteo;


SELECT * FROM el_picoteo.almacen;
SELECT * FROM el_picoteo.inventario;
SELECT * FROM el_picoteo.productos;
SELECT * FROM el_picoteo.recetas;
SELECT * FROM el_picoteo.stock;

/* 
Consulta contenido de almacen
[ nombre, precio unidad ][ Unidades , fecha ]
*/

SELECT a.nombre as 'Nombre', a.precio_unidad as 'Precio por Unidad', i.unidades as 'Unidades Registradas', i.fecha as 'Fecha'
FROM Almacen a
INNER JOIN Inventario i ON i.id_almacen=a.id
;

/* 
 Filtrado de stock
Nombre producto, precio producto, ingredientes producto, cantidad ingredientes producto, cantidad productos restantes
*/

SELECT p.nombre as 'Nombre'
FROM el_picoteo.stock s
INNER JOIN el_picoteo.recetas r ON s.id_receta=r.id
INNER JOIN el_picoteo.productos p ON r.id_producto=p.id
/* INNER JOIN el_picoteo.almacen a ON r.id_almacen=a.id */
;

SELECT p.nombre as 'Nombre', p.precio_producto as 'Precio del Producto', a.nombre as 'Ingredientes', r.cantidad as 'Cantidad del Ingrediente'
FROM Productos p
INNER JOIN Recetas r ON p.id=r.id_producto
INNER JOIN Almacen a ON r.id_almacen=a.id 
;








SELECT a.nombre as 'Nombre' , a.precio_unidad as 'Precion Unidad', i.unidades as 'Unidades Registradas', i.fecha as 'Fecha' 
FROM Almacen a
INNER JOIN Inventario i ON i.id_almacen=a.id
;














