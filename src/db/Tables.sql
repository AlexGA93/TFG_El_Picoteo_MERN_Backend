CREATE TABLE Usuarios(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Inventario (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  unidades ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL, -- Mas seguro
  n_unidades FLOAT NOT NULL,
  proveedor VARCHAR(255) NOT NULL,
  precio_unidad FLOAT NOT NULL,
  fecha_registro DATETIME NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE Stock (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_producto VARCHAR(255) NOT NULL,
  precio_producto FLOAT NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE Ingredientes(
  id INT NOT NULL AUTO_INCREMENT,
  id_producto_stock INT NOT NULL,
  id_inventario INT NOT NULL,
  cantidades FLOAT NOT NULL,
  unidad ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL,
  fecha_registro DATETIME NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_producto_stock) REFERENCES Stock(id), -- Muchos a mucho
  FOREIGN KEY (id_inventario) REFERENCES Inventario(id) -- Muchos a muchos
);

CREATE TABLE Pagos(
  id INT NOT NULL AUTO_INCREMENT,
  id_stock INT NOT NULL,
  fecha_pago DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_stock) REFERENCES Stock(id) -- muchos a uno
);

-- ====================================
-- Datos para la tabla Usuarios
-- ====================================
INSERT INTO Usuarios (nombre, apellidos, email, password) VALUES
('Juan', 'Pérez Gómez', 'juan.perez@example.com', 'hashed_pass_1'),
('María', 'López Sánchez', 'maria.lopez@example.com', 'hashed_pass_2'),
('Carlos', 'Ramírez Díaz', 'carlos.ramirez@example.com', 'hashed_pass_3'),
('Lucía', 'Martínez Torres', 'lucia.martinez@example.com', 'hashed_pass_4');

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
INSERT INTO Ingredientes (id_producto_stock, id_inventario,cantidades, fecha_registro) VALUES
-- Pan casero
(1, 1, 0.25, 'kg', '2025-01-22 09:00:00'),
(1, 2, 0.10, 'litros', '2025-01-22 09:00:00'),
(1, 3, 2, 'unidad', '2025-01-22 09:00:00'),

-- Bizcocho de vainilla
(2, 1, 0.30, 'kg', '2025-01-22 09:10:00'),
(2, 3, 3, 'unidad', '2025-01-22 09:10:00'),
(2, 4, 0.20, 'kg', '2025-01-22 09:10:00'),
(2, 5, 100, 'gramos', '2025-01-22 09:10:00'),

-- Tarta de chocolate
(3, 1, 0.50, 'kg', '2025-01-22 09:20:00'),
(3, 2, 0.20, 'litros', '2025-01-22 09:20:00'),
(3, 3, 4, 'unidad', '2025-01-22 09:20:00'),
(3, 4, 0.30, 'kg', '2025-01-22 09:20:00'),
(3, 5, 150, 'gramos', '2025-01-22 09:20:00');

-- ====================================
-- Datos para la tabla Pagos
-- ====================================
INSERT INTO Pagos (id_stock, fecha_pago) VALUES
(1, '2025-02-01 10:00:00'),
(2, '2025-02-02 12:30:00'),
(3, '2025-02-03 15:45:00'),
(1, '2025-02-04 09:15:00');
