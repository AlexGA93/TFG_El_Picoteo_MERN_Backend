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
  unidades ENUM('kg', 'litros', 'unidad', 'metros', 'gramos') NOT NULL,
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
  tiempo_produccion_min INT NOT NULL,
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
  FOREIGN KEY (id_producto_stock) REFERENCES Stock(id),
  FOREIGN KEY (id_inventory) REFERENCES Inventory(id)
);

CREATE TABLE IF NOT EXISTS Sales(
  id INT NOT NULL AUTO_INCREMENT,
  fecha_venta DATETIME NOT NULL,
  metodo_pago ENUM('efectivo', 'tarjeta', 'bizum') NOT NULL,
  id_usuario INT NOT NULL,
  total_venta FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Sale_Items(
  id INT NOT NULL AUTO_INCREMENT,
  id_sale INT NOT NULL,
  id_stock INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario FLOAT NOT NULL,
  subtotal FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_sale) REFERENCES Sales(id),
  FOREIGN KEY (id_stock) REFERENCES Stock(id)
);

CREATE TABLE IF NOT EXISTS Purchases(
  id INT NOT NULL AUTO_INCREMENT,
  fecha_compra DATETIME NOT NULL,
  proveedor VARCHAR(255) NOT NULL,
  id_usuario INT NOT NULL,
  total_compra FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Purchase_Items(
  id INT NOT NULL AUTO_INCREMENT,
  id_purchase INT NOT NULL,
  id_inventory INT NOT NULL,
  cantidad FLOAT NOT NULL,
  precio_unitario FLOAT NOT NULL,
  subtotal FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_purchase) REFERENCES Purchases(id),
  FOREIGN KEY (id_inventory) REFERENCES Inventory(id)
);
