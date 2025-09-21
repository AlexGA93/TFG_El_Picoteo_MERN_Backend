-- ====================================
-- Datos para la tabla Inventario
-- ====================================
INSERT INTO Inventario (nombre, tipo, unidades, n_unidades, proveedor, precio_unidad, fecha_registro) VALUES
('Harina', 'Alimento', 'kg', 50, 'Molinos SA', 0.80, '2025-01-10 09:30:00'),
('Leche', 'Bebida', 'litros', 200, 'Lácteos del Sur', 0.60, '2025-01-12 11:00:00'),
('Huevos', 'Alimento', 'unidad', 300, 'Granja Los Pinos', 0.10, '2025-01-15 08:45:00'),
('Azúcar', 'Alimento', 'kg', 100, 'Distribuidora Dulce', 1.20, '2025-01-18 14:20:00'),
('Mantequilla', 'Alimento', 'gramos', 5000, 'Lácteos del Norte', 0.005, '2025-01-20 10:00:00');

-- ====================================
-- Datos para la tabla Stock
-- ====================================
INSERT INTO Stock (nombre_producto, precio_producto) VALUES
('Pan casero', 1.50),
('Bizcocho de vainilla', 8.00),
('Tarta de chocolate', 15.00);

-- ====================================
-- Datos para la tabla Ingredientes
-- Pan casero: Harina, Leche, Huevos
-- Bizcocho: Harina, Huevos, Azúcar, Mantequilla
-- Tarta: Harina, Huevos, Azúcar, Mantequilla, Leche
-- ====================================
INSERT INTO Ingredientes (id_producto_stock, id_inventario, fecha_registro) VALUES
-- Pan casero
(1, 1, '2025-01-22 09:00:00'),
(1, 2, '2025-01-22 09:00:00'),
(1, 3, '2025-01-22 09:00:00'),

-- Bizcocho de vainilla
(2, 1, '2025-01-22 09:10:00'),
(2, 3, '2025-01-22 09:10:00'),
(2, 4, '2025-01-22 09:10:00'),
(2, 5, '2025-01-22 09:10:00'),

-- Tarta de chocolate
(3, 1, '2025-01-22 09:20:00'),
(3, 2, '2025-01-22 09:20:00'),
(3, 3, '2025-01-22 09:20:00'),
(3, 4, '2025-01-22 09:20:00'),
(3, 5, '2025-01-22 09:20:00');

-- ====================================
-- Datos para la tabla Pagos
-- ====================================
INSERT INTO Pagos (id_stock, fecha_pago) VALUES
(1, '2025-02-01 10:00:00'),
(2, '2025-02-02 12:30:00'),
(3, '2025-02-03 15:45:00'),
(1, '2025-02-04 09:15:00');
