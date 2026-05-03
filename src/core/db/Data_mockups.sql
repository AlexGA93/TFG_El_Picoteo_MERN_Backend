-- ====================================
-- Reset de datos (orden correcto por FK)
-- ====================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Purchase_Items;
TRUNCATE TABLE Purchases;
TRUNCATE TABLE Sale_Items;
TRUNCATE TABLE Sales;
TRUNCATE TABLE Ingredients;
TRUNCATE TABLE Stock;
TRUNCATE TABLE Inventory;
TRUNCATE TABLE Users;
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================
-- Datos para la tabla Users
-- ====================================
INSERT INTO Users (id, nombre, apellidos, email, password, rol_usuario) VALUES
(1, 'Juan', 'Perez Gomez', 'juan.perez@elpicoteo.com', 'hashed_pass_1', 'admin'),
(2, 'Maria', 'Lopez Sanchez', 'maria.lopez@elpicoteo.com', 'hashed_pass_2', 'employee'),
(3, 'Carlos', 'Ramirez Diaz', 'carlos.ramirez@elpicoteo.com', 'hashed_pass_3', 'employee');

-- ====================================
-- Datos para la tabla Inventory
-- ====================================
INSERT INTO Inventory (id, nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES
(1, 'Harina', 'Cereales', 'kg', 120, 'Molinos SA', 0.80, '2025-01-10 09:30:00'),
(2, 'Leche', 'Lacteos', 'litros', 250, 'Lacteos del Sur', 0.60, '2025-01-12 11:00:00'),
(3, 'Huevos', 'Lacteos', 'unidad', 500, 'Granja Los Pinos', 0.10, '2025-01-15 08:45:00'),
(4, 'Azucar', 'Especias', 'kg', 200, 'Distribuidora Dulce', 1.20, '2025-01-18 14:20:00'),
(5, 'Mantequilla', 'Lacteos', 'gramos', 5000, 'Lacteos del Norte', 0.005, '2025-01-20 10:00:00'),
(6, 'Pollo', 'Carnes', 'kg', 60, 'Avicola SA', 3.50, '2025-01-21 08:00:00'),
(7, 'Merluza', 'Pescados', 'kg', 40, 'Pesquera Norte', 6.00, '2025-01-22 07:30:00'),
(8, 'Tomate', 'Verduras', 'kg', 180, 'Huerto Feliz', 0.90, '2025-01-23 10:00:00'),
(9, 'Lechuga', 'Verduras', 'unidad', 90, 'Huerto Feliz', 0.50, '2025-01-23 10:05:00'),
(10, 'Manzana', 'Frutas', 'kg', 220, 'Frutas del Valle', 0.70, '2025-01-24 09:45:00'),
(11, 'Pimienta', 'Especias', 'gramos', 1200, 'Especias Iberia', 0.020, '2025-01-25 11:20:00'),
(12, 'Aceite de oliva', 'Aceites', 'litros', 60, 'Olivar Real', 4.50, '2025-01-26 12:00:00'),
(13, 'Cerveza', 'Bebidas', 'litros', 300, 'Cervecera SA', 0.90, '2025-01-27 13:00:00'),
(14, 'Arroz', 'Cereales', 'kg', 180, 'Molinos SA', 1.10, '2025-01-28 14:00:00'),
(15, 'Queso', 'Lacteos', 'kg', 45, 'Lacteos del Norte', 10.00, '2025-01-29 15:00:00');

-- ====================================
-- Datos para la tabla Stock
-- ====================================
INSERT INTO Stock (id, nombre_producto, precio_producto, tiempo_produccion_min, dificultad, url) VALUES
(1, 'Pan casero', 1.50, 45, 'facil', 'pan_casero.jpg'),
(2, 'Bizcocho de vainilla', 8.00, 60, 'media', 'bizcocho-de-maicena.jpg'),
(3, 'Tarta de chocolate', 15.00, 90, 'dificil', 'tarta_chocolate.jpg'),
(4, 'Empanada de pollo', 3.50, 50, 'media', 'empanada-de-pollo.jpg'),
(5, 'Ensalada mixta', 5.50, 15, 'facil', 'ensalada-mixta.jpg'),
(6, 'Smoothie de manzana', 3.00, 10, 'facil', 'smoothie_tarta_manzana.jpg'),
(7, 'Pizza margarita', 9.00, 75, 'media', 'pizza_margherita.jpg'),
(8, 'Croquetas', 6.00, 55, 'dificil', 'croquetas-de-jamon-caseras.jpg'),
(9, 'Sandwich vegetal', 4.50, 20, 'facil', 'sandwich-vegetal.jpg'),
(10, 'Tarta de queso', 14.00, 120, 'dificil', 'tarta-de-queso.jpg');

-- ====================================
-- Datos para la tabla Ingredients
-- ====================================
INSERT INTO Ingredients (id, id_producto_stock, id_inventory, cantidades, unidad, fecha_registro) VALUES
(1, 1, 1, 0.25, 'kg', '2025-01-22 09:00:00'),
(2, 1, 2, 0.10, 'litros', '2025-01-22 09:00:00'),
(3, 1, 3, 2, 'unidad', '2025-01-22 09:00:00'),
(4, 2, 1, 0.30, 'kg', '2025-01-22 09:10:00'),
(5, 2, 3, 3, 'unidad', '2025-01-22 09:10:00'),
(6, 2, 4, 0.20, 'kg', '2025-01-22 09:10:00'),
(7, 2, 5, 100, 'gramos', '2025-01-22 09:10:00'),
(8, 3, 1, 0.50, 'kg', '2025-01-22 09:20:00'),
(9, 3, 2, 0.20, 'litros', '2025-01-22 09:20:00'),
(10, 3, 3, 4, 'unidad', '2025-01-22 09:20:00'),
(11, 3, 4, 0.30, 'kg', '2025-01-22 09:20:00'),
(12, 3, 5, 150, 'gramos', '2025-01-22 09:20:00'),
(13, 4, 6, 0.40, 'kg', '2025-01-23 08:00:00'),
(14, 4, 1, 0.20, 'kg', '2025-01-23 08:00:00'),
(15, 4, 11, 5, 'gramos', '2025-01-23 08:00:00'),
(16, 4, 12, 0.05, 'litros', '2025-01-23 08:00:00'),
(17, 5, 8, 0.30, 'kg', '2025-01-23 10:30:00'),
(18, 5, 9, 2, 'unidad', '2025-01-23 10:30:00'),
(19, 5, 12, 0.03, 'litros', '2025-01-23 10:30:00'),
(20, 6, 10, 0.25, 'kg', '2025-01-24 09:00:00'),
(21, 6, 2, 0.20, 'litros', '2025-01-24 09:00:00'),
(22, 7, 1, 0.35, 'kg', '2025-01-24 12:00:00'),
(23, 7, 15, 0.20, 'kg', '2025-01-24 12:00:00'),
(24, 7, 8, 0.25, 'kg', '2025-01-24 12:00:00'),
(25, 7, 12, 0.04, 'litros', '2025-01-24 12:00:00'),
(26, 8, 1, 0.20, 'kg', '2025-01-24 13:00:00'),
(27, 8, 2, 0.15, 'litros', '2025-01-24 13:00:00'),
(28, 8, 5, 80, 'gramos', '2025-01-24 13:00:00'),
(29, 8, 3, 2, 'unidad', '2025-01-24 13:00:00'),
(30, 9, 1, 0.15, 'kg', '2025-01-25 09:00:00'),
(31, 9, 9, 1, 'unidad', '2025-01-25 09:00:00'),
(32, 9, 8, 0.20, 'kg', '2025-01-25 09:00:00'),
(33, 9, 15, 0.10, 'kg', '2025-01-25 09:00:00'),
(34, 10, 15, 0.25, 'kg', '2025-01-28 10:00:00'),
(35, 10, 4, 0.10, 'kg', '2025-01-28 10:00:00'),
(36, 10, 1, 0.20, 'kg', '2025-01-28 10:00:00');

-- ====================================
-- Datos para la tabla Purchases (gastos)
-- ====================================
INSERT INTO Purchases (id, fecha_compra, proveedor, id_usuario, total_compra) VALUES
(1, '2025-02-13 08:30:00', 'Molinos SA', 1, 150.00),
(2, '2025-02-14 07:50:00', 'Lacteos del Norte', 2, 95.00),
(3, '2025-02-15 08:10:00', 'Huerto Feliz', 3, 120.00),
(4, '2025-02-15 16:40:00', 'Avicola SA', 1, 210.00);

INSERT INTO Purchase_Items (id, id_purchase, id_inventory, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 100, 0.80, 80.00),
(2, 1, 14, 50, 1.10, 55.00),
(3, 1, 4, 12.5, 1.20, 15.00),
(4, 2, 2, 100, 0.60, 60.00),
(5, 2, 5, 7000, 0.005, 35.00),
(6, 3, 8, 80, 0.90, 72.00),
(7, 3, 9, 60, 0.50, 30.00),
(8, 3, 10, 25.7143, 0.70, 18.00),
(9, 4, 6, 50, 3.50, 175.00),
(10, 4, 12, 5, 4.50, 22.50),
(11, 4, 11, 625, 0.02, 12.50);

-- ====================================
-- Datos para la tabla Sales (ventas)
-- ====================================
INSERT INTO Sales (id, fecha_venta, metodo_pago, id_usuario, total_venta) VALUES
(1, '2025-02-14 09:35:00', 'efectivo', 2, 18.50),
(2, '2025-02-14 14:10:00', 'tarjeta', 3, 27.50),
(3, '2025-02-15 11:55:00', 'bizum', 2, 24.00),
(4, '2025-02-15 19:20:00', 'tarjeta', 1, 33.00),
(5, '2025-02-16 09:20:00', 'efectivo', 2, 48.00),
(6, '2025-02-16 13:10:00', 'tarjeta', 3, 61.50),
(7, '2025-02-16 20:25:00', 'bizum', 1, 57.50),
(8, '2025-02-17 12:05:00', 'tarjeta', 2, 72.50),
(9, '2025-02-17 18:45:00', 'efectivo', 3, 80.50),
(10, '2025-02-18 11:30:00', 'tarjeta', 1, 97.00),
(11, '2025-02-18 16:55:00', 'bizum', 2, 112.00),
(12, '2025-02-18 21:10:00', 'tarjeta', 3, 130.50);

INSERT INTO Sale_Items (id, id_sale, id_stock, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 3, 1.50, 4.50),
(2, 1, 6, 2, 3.00, 6.00),
(3, 1, 9, 1, 4.50, 4.50),
(4, 1, 4, 1, 3.50, 3.50),
(5, 2, 3, 1, 15.00, 15.00),
(6, 2, 5, 2, 5.50, 11.00),
(7, 2, 1, 1, 1.50, 1.50),
(8, 3, 7, 1, 9.00, 9.00),
(9, 3, 6, 2, 3.00, 6.00),
(10, 3, 1, 3, 1.50, 4.50),
(11, 3, 9, 1, 4.50, 4.50),
(12, 4, 10, 1, 14.00, 14.00),
(13, 4, 3, 1, 15.00, 15.00),
(14, 4, 6, 1, 3.00, 3.00),
(15, 4, 1, 1, 1.00, 1.00),
(16, 5, 3, 2, 15.00, 30.00),
(17, 5, 7, 1, 9.00, 9.00),
(18, 5, 6, 2, 3.00, 6.00),
(19, 5, 1, 2, 1.50, 3.00),
(20, 6, 10, 2, 14.00, 28.00),
(21, 6, 3, 1, 15.00, 15.00),
(22, 6, 5, 2, 5.50, 11.00),
(23, 6, 9, 1, 4.50, 4.50),
(24, 6, 6, 1, 3.00, 3.00),
(25, 7, 7, 3, 9.00, 27.00),
(26, 7, 4, 4, 3.50, 14.00),
(27, 7, 1, 6, 1.50, 9.00),
(28, 7, 6, 1, 3.00, 3.00),
(29, 7, 9, 1, 4.50, 4.50),
(30, 8, 3, 3, 15.00, 45.00),
(31, 8, 10, 1, 14.00, 14.00),
(32, 8, 8, 2, 6.00, 12.00),
(33, 8, 1, 1, 1.50, 1.50),
(34, 9, 10, 2, 14.00, 28.00),
(35, 9, 3, 2, 15.00, 30.00),
(36, 9, 7, 2, 9.00, 18.00),
(37, 9, 6, 1, 3.00, 3.00),
(38, 9, 1, 1, 1.50, 1.50),
(39, 10, 3, 4, 15.00, 60.00),
(40, 10, 10, 2, 14.00, 28.00),
(41, 10, 7, 1, 9.00, 9.00),
(42, 11, 3, 5, 15.00, 75.00),
(43, 11, 10, 2, 14.00, 28.00),
(44, 11, 7, 1, 9.00, 9.00),
(45, 12, 3, 4, 15.00, 60.00),
(46, 12, 10, 3, 14.00, 42.00),
(47, 12, 7, 2, 9.00, 18.00),
(48, 12, 6, 2, 3.00, 6.00),
(49, 12, 1, 3, 1.50, 4.50);
