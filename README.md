# Documentacion Backend - El Picoteo

## 1) Docker y Comandos a Usar

### Requisitos
- Docker + Docker Compose plugin.
- Puerto API por defecto: `5000`.
- MySQL segun `docker-compose-dev.yml`.

### Arranque en desarrollo (recomendado)
```bash
docker compose -f docker-compose-dev.yml up --build
```

### Parar entorno
```bash
docker compose -f docker-compose-dev.yml down
```

### Reconstruir imagenes (sin cache)
```bash
docker compose -f docker-compose-dev.yml build --pull --no-cache
```

### Logs
```bash
docker compose -f docker-compose-dev.yml logs -f
```

### Entrar al contenedor backend
```bash
docker exec -it <nombre_contenedor_backend> bash -l
```

### Entrar a MySQL dentro del contenedor
```bash
mysql --user="root" --password="123456"
```

### Comandos Docker utiles
```bash
docker images
docker ps -a
docker logs -f <container>
docker rm -f <container>
docker network ls
```

### Comando de chequeo TypeScript
```bash
npx tsc --noEmit
```
---

## 1.1) Acciones Sobre la Base de Datos

### Actualizacion de Tablas

Habiendo accedido al contenedor de la base de datos y acreditandonos podemos cualquier serie de acciones. Entre otras, incorporamos una nueva columna adicional con nuevos registros:
```bash
ALTER TABLE Stock ADD COLUMN url VARCHAR(255) NOT NULL DEFAULT '';
```

Si quisieramos incorporarla despues de cualquier columna existente:
```bash
ALTER TABLE Stock
ADD COLUMN imagen VARCHAR(255) NOT NULL DEFAULT '' AFTER columna_existente;
```

Habiendo habilitado la nueva columna, toca incorporar nuevos datos para los registros existentes. **Para este caso**, dado que tenemos un total de X (ej: 10) registros, formamos la siguiente query para actualizar varios de golpe:
```bash
UPDATE Stock
SET imagen = CASE id
  WHEN 1 THEN 'pan_casero.jpg'
  WHEN 2 THEN 'bizcocho-de-maicena.jpg'
  WHEN 3 THEN 'tarta_chocolate.jpg'
  WHEN 4 THEN 'empanada-de-pollo.jpg'
  WHEN 5 THEN 'ensalada-mixta.jpg'
  WHEN 6 THEN 'smoothie_tarta_manzana.jpg'
  WHEN 7 THEN 'pizza_margherita.jpg'
  WHEN 8 THEN 'croquetas-de-jamon-caseras.jpg'
  WHEN 9 THEN 'sandwich-vegetal.jpg'
  WHEN 10 THEN 'tarta-de-queso.jpg'
END
WHERE id IN (1,2,3,4,5,6,7,8,9,10);

```  

---

## 2) Estructura Segun MVC (General)

La arquitectura actual sigue MVC para API REST con separacion por modulos.

### Flujo general
`route -> controller -> service -> model -> view`

### Explicacion MVC en este backend
- `Model`: capa de acceso a datos. Aqui viven las queries SQL y la comunicacion con MySQL.
- `View`: capa de presentacion de salida. En este proyecto no renderiza HTML; transforma/estandariza respuestas JSON.
- `Controller`: capa HTTP. Recibe request, valida flujo, llama servicios y devuelve respuesta.
- `Service` (capa intermedia): orquesta reglas de negocio entre controller y model. En este proyecto se usa para mantener controladores delgados.
- `Route`: puerta de entrada HTTP. Declara endpoints y aplica middlewares (auth, validaciones).

En practica, cada modulo sigue este ciclo:
1. La request entra por `routes`.
2. El `controller` interpreta parametros/body.
3. El `service` ejecuta logica de negocio.
4. El `model` consulta/actualiza base de datos.
5. La `view` devuelve un JSON estandar al cliente.

### Esquema MVC
```txt
Cliente HTTP
   |
   v
Route (Express)
   |
   v
Controller (HTTP)
   |
   v
Service (negocio)
   |
   v
Model (SQL / MySQL)
   |
   v
View (respuesta JSON)
   |
   v
Cliente HTTP
```

### Esquema de carpetas MVC
```txt
src/
  core/                           # componentes compartidos
    auth/                         # JWT y autorizacion por roles
    db/                           # conexion y bootstrap de DB
    middleware/                   # validate-jwt, error-handler
    routes/                       # agregador global de rutas
    security/                     # hashing y utilidades de seguridad
    types/                        # tipos globales
    utils/                        # async-handler, http-error, constantes
    views/                        # respuesta API estandar

  modules/
    <modulo>/                     # auth, users, inventario, etc.
      *.routes.ts                 # Route
      *.controller.ts             # Controller
      *.service.ts                # Service
      *.model.ts                  # Model
      *.view.ts (si aplica)       # View especifica del modulo
```

### Estructura principal
```txt
src/
  app.ts
  index.ts

  core/
    auth/
    db/
    middleware/
    routes/
    security/
    types/
    utils/
    views/

  modules/
    auth/
    users/
    database/
    dashboard/
    inventario/
    stock/
    ingredientes/
    pagos/
```

### Rol de cada capa
- `routes`: define endpoints y middlewares por ruta.
- `controllers`: capa HTTP (request/response), sin SQL directo.
- `services`: logica de negocio/orquestacion.
- `models`: acceso a datos (queries SQL).
- `views`: formato de salida de API (respuesta estandar).
- `core`: piezas transversales compartidas (auth, db, middleware, utilidades, tipos).

---

## 3) Endpoints y Respuestas

### Base URL
- Local: `http://localhost:5000`

### Header de autenticacion
- Para rutas protegidas: `x-auth-token: <jwt>`

### Formato estandar de respuesta

#### Exito
```json
{
  "success": true,
  "message": "texto",
  "data": {}
}
```

#### Error
```json
{
  "success": false,
  "message": "texto",
  "error": null
}
```

### Endpoints

#### Health
- `GET /`

#### Auth (`/api/auth`)
- `POST /register`
- `POST /login`
- `GET /renew` (protegido)
- `GET /validate` (protegido)

#### Users (`/api/users`)
- `GET /` (admin)
- `GET /:id` (admin o employee)
- `PUT /:id` (admin)
- `DELETE /:id` (admin)

#### Database y dashboard (`/api/databases`)
- `GET /` (admin)
- `GET /create-tables` (admin)
- `GET /mockup-insertion` (admin)
- `GET /dashboard` (admin o employee)
- `GET /tables` (admin o employee)
- `GET /tables/:table_name` (admin o employee)

#### CRUD Inventario (`/api/databases/inventario`)
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

#### CRUD Stock (`/api/databases/stock`)
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

#### CRUD Ingredientes (`/api/databases/ingredientes`)
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

#### CRUD Pagos (`/api/databases/pagos`)
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### Ejemplos rapidos

#### Login
`POST /api/auth/login`
```json
{
  "email": "admin@elpicoteo.com",
  "password": "Password123"
}
```

#### Respuesta login (exito)
```json
{
  "success": true,
  "message": "Inicio de sesion correcto",
  "data": {
    "token": "<jwt>"
  }
}
```

#### Error de validacion
```json
{
  "success": false,
  "message": "Errores de validacion",
  "error": [
    {
      "msg": "Email must have a valid format"
    }
  ]
}
```
