CREATE TABLE IF NOT EXISTS Users(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol_usuario ENUM('admin', 'employee') NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Inventory (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  tipo ENUM('Carnes','Pescados','Verduras','Frutas','Especias','Lacteos','Cereales','Aceites','Bebidas') NOT NULL,
  unidades ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL, -- Mas seguro
  n_unidades FLOAT NOT NULL,
  proveedor VARCHAR(255) NOT NULL,
  precio_unidad FLOAT NOT NULL,
  fecha_registro DATETIME NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Stock (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_producto VARCHAR(255) NOT NULL,
  precio_producto FLOAT NOT NULL,
  tiempo_produccion_min INT NOT NULL, -- antes era string "45 min" en mock
  dificultad ENUM('facil','media','dificil') NOT NULL,
  url VARCHAR(500) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Ingredients(
  id INT NOT NULL AUTO_INCREMENT,
  id_producto_stock INT NOT NULL,
  id_inventory INT NOT NULL,
  cantidades FLOAT NOT NULL,
  unidad ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL,
  fecha_registro DATETIME NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_producto_stock) REFERENCES Stock(id), -- Muchos a mucho
  FOREIGN KEY (id_inventory) REFERENCES Inventory(id) -- Muchos a muchos
);

CREATE TABLE IF NOT EXISTS Payments(
  id INT NOT NULL AUTO_INCREMENT,
  id_stock INT NOT NULL,
  fecha_pago DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_stock) REFERENCES Stock(id) -- muchos a uno
);
