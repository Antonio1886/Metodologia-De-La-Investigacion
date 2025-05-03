## Modelo Entidad-Relacion
### USUARIO 
  - ID_Usuario INT PRIMARY KEY,
  - Nombre VARCHAR(100) NOT NULL,
  - Email VARCHAR(100) UNIQUE NOT NULL,
  - Contraseña VARCHAR(255) NOT NULL,
  - Fecha_Registro DATE NOT NULL


### PRODUCTO 
  - ID_Producto INT PRIMARY KEY,
  - Nombre VARCHAR(100) NOT NULL,
  - Genero VARCHAR(50) NOT NULL,
  - Precio_Base DECIMAL(10,2) NOT NULL,
  - Desarrollador VARCHAR(100) NOT NULL,
  - Fecha_Lanzamiento DATE NOT NULL,
  - Descripcion TEXT,
  - Requisitos_Sistema TEXT


### DESCUENTO 
 - ID_Descuento INT PRIMARY KEY,
 - ID_Producto INT NOT NULL,
 - Porcentaje DECIMAL(5,2) NOT NULL,
 - Fecha_Inicio DATE NOT NULL,
 - Fecha_Fin DATE NOT NULL,
 - FOREIGN KEY (ID_Producto) REFERENCES PRODUCTO(ID_Producto)


### PEDIDO 
- ID_Pedido INT PRIMARY KEY,
- ID_Usuario INT NOT NULL, 
- Fecha_Pedido DATETIME NOT NULL,
- Total DECIMAL(10,2) NOT NULL,
- Estado VARCHAR(20) NOT NULL,
- FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario)


### DETALLE_PEDIDO 
 - ID_Detalle INT PRIMARY KEY,
 - ID_Pedido INT NOT NULL,
 - ID_Producto INT NOT NULL,
 - Cantidad INT NOT NULL DEFAULT 1,
 - Precio_Unitario DECIMAL(10,2) NOT NULL,
 - FOREIGN KEY (ID_Pedido) REFERENCES PEDIDO(ID_Pedido),
 - FOREIGN KEY (ID_Producto) REFERENCES PRODUCTO(ID_Producto)


### VALORACION 
 - ID_Valoracion INT PRIMARY KEY,
 - ID_Usuario INT NOT NULL,
 - ID_Producto INT NOT NULL,
 - Puntuacion INT NOT NULL,
 - Comentario TEXT,
 - Fecha DATE NOT NULL,
 - FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario),
 - FOREIGN KEY (ID_Producto) REFERENCES PRODUCTO(ID_Producto)

## diagrama Racional 


![Modelo Racional](/Practica10/assets/Screenshot%202025-04-17%20185709.png)
