-- ====================================
-- Reset de datos (orden correcto por FK)
-- ====================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Ingredientes;
TRUNCATE TABLE Pagos;
TRUNCATE TABLE Stock;
TRUNCATE TABLE Inventario;
TRUNCATE TABLE Usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================
-- Datos para la tabla Usuarios
-- ====================================
INSERT INTO Usuarios (id, nombre, apellidos, email, password, rol_usuario) VALUES
(1, 'Juan', 'Perez Gomez', 'juan.perez@elpicoteo.com', 'hashed_pass_1', 'admin'),
(2, 'Maria', 'Lopez Sanchez', 'maria.lopez@elpicoteo.com', 'hashed_pass_2', 'employee'),
(3, 'Carlos', 'Ramirez Diaz', 'carlos.ramirez@elpicoteo.com', 'hashed_pass_3', 'employee');
-- ====================================
-- Datos para la tabla Inventario
-- ====================================
INSERT INTO Inventario (id, nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES
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
INSERT INTO Stock (id, nombre_producto, precio_producto, tiempo_produccion_min, dificultad) VALUES
(1, 'Pan casero', 1.50, 45, 'facil'),
(2, 'Bizcocho de vainilla', 8.00, 60, 'media'),
(3, 'Tarta de chocolate', 15.00, 90, 'dificil'),
(4, 'Empanada de pollo', 3.50, 50, 'media'),
(5, 'Ensalada mixta', 5.50, 15, 'facil'),
(6, 'Smoothie de manzana', 3.00, 10, 'facil'),
(7, 'Pizza margarita', 9.00, 75, 'media'),
(8, 'Croquetas', 6.00, 55, 'dificil'),
(9, 'Sandwich vegetal', 4.50, 20, 'facil'),
(10, 'Tarta de queso', 14.00, 120, 'dificil');


-- ====================================
-- Datos para la tabla Ingredientes
-- ====================================
INSERT INTO Ingredientes (id, id_producto_stock, id_inventario, cantidades, unidad, fecha_registro) VALUES
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
-- Datos para la tabla Pagos
-- ====================================
INSERT INTO Pagos (id, id_stock, fecha_pago) VALUES
(1, 1, '2025-02-01 10:00:00'),
(2, 2, '2025-02-02 12:30:00'),
(3, 3, '2025-02-03 15:45:00'),
(4, 4, '2025-02-04 09:15:00'),
(5, 5, '2025-02-05 10:00:00'),
(6, 6, '2025-02-06 11:00:00'),
(7, 7, '2025-02-07 12:00:00'),
(8, 8, '2025-02-08 13:00:00'),
(9, 9, '2025-02-09 14:00:00'),
(10, 10, '2025-02-10 15:00:00');
