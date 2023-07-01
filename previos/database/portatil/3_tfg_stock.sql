
-- Cuando se hace una compra debemos registrar en stock la cuenta negativa.
-- EN ESTE CASO HEMOS VENDIDO 1 MIXTO, 2 VEGETALES, 2 CHIVITOS

INSERT INTO Stock
(id_receta, unidades, fecha)
VALUES
-- mixto [id_receta: 1, unidades: 3]
(1,3-1,now()),
-- vegetal [id_receta: 3, unidades: 2]
(3,2-2,now()),
-- chivito [id_receta: 4, unidades: 5]
(4,5-2,now())
;
SELECT * FROM Stock;