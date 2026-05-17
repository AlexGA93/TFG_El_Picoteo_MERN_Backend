# Backend - El Picoteo (MERN)

API REST en TypeScript + Express + MySQL para gestionar usuarios, recetas, stock, inventario, ventas y compras.

## 1. Stack y arquitectura

- Node.js + TypeScript
- Express
- MySQL 8
- Docker / Docker Compose
- Arquitectura por módulos con patrón `route -> controller -> service -> model -> view`

Estructura principal:

```txt
src/
  app.ts
  index.ts
  core/
    auth/
    db/
      Tables.sql
      Data_mockups.sql
      init.ts
    middleware/
    routes/
    utils/
    views/
  modules/
    auth/
    users/
    database/
    dashboard/
    recipes/
    stock/
    inventory/
    ingredients/
    purchases/
    sales/
    menu/
```

## 2. Variables de entorno

El proyecto usa `.env`. Variables relevantes:

- `NODE_LOCAL_PORT`
- `NODE_DOCKER_PORT`
- `MYSQL_HOST`
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_LOCAL_PORT`
- `MYSQL_DOCKER_PORT`
- `JWT_SECRET`

Notas:

- En Docker, `MYSQL_HOST` debe ser `mysqldb` (nombre del servicio en compose).
- El servidor escucha en `NODE_DOCKER_PORT` (fallback `5000`).

## 3. Levantar el proyecto

### Desarrollo (recomendado)

```bash
docker compose -f docker-compose-dev.yml up --build
```

### Producción/local simple

```bash
docker compose up --build
```

### Parar contenedores

```bash
docker compose -f docker-compose-dev.yml down
```

## 4. Bootstrap de base de datos

Al arrancar el servidor se ejecuta `ensureDatabaseAndTables()` (`src/core/db/init.ts`):

1. Crea la base de datos si no existe.
2. Ejecuta el schema de `src/core/db/Tables.sql`.

Importante:

- Este proceso **crea tablas faltantes**, pero no aplica migraciones complejas automáticamente (renombrar columnas, cambios de tipos, drop de columnas, etc.).
- `Data_mockups.sql` no se carga automáticamente en el arranque; se inserta vía endpoint de base de datos.

## 5. Endpoints

Base URL local:

- `http://localhost:5000`

### Health

- `GET /`

### Auth (`/api/auth`)

- `POST /register`
- `POST /login`
- `GET /renew` (JWT)
- `GET /validate` (JWT)

### Users (`/api/users`)

- `GET /` (admin)
- `GET /:id` (admin/employee)
- `PUT /:id` (admin)
- `DELETE /:id` (admin)

### Database (`/api/databases`)

- `GET /` (admin)
- `GET /create-tables` (admin)
- `GET /mockup-insertion` (admin)
- `GET /dashboard` (admin/employee)

Submódulos protegidos (`admin/employee`):

- `/api/databases/recipes`
- `/api/databases/stock`
- `/api/databases/inventory`
- `/api/databases/ingredients`
- `/api/databases/purchases`

Cada uno expone:

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### Público (`/api/public`)

- `GET /menu`
- `/api/public/sales` (CRUD completo de ventas)

## 6. Archivos estáticos e imágenes

- Se sirve `public/` de forma estática.
- Las imágenes se guardan en `public/images`.
- Al arrancar, el servidor crea `public/images` si no existe.
- En `recipes` y `stock`, `POST`/`PUT` usan `multer` con campo `imagen`.

## 7. Formato de respuesta

Respuesta de éxito (shape general):

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Respuesta de error (shape general):

```json
{
  "success": false,
  "message": "...",
  "error": null
}
```

## 8. Comandos útiles

Ver logs:

```bash
docker compose -f docker-compose-dev.yml logs -f
```

Entrar a backend:

```bash
docker compose -f docker-compose-dev.yml exec server bash -l
```

Entrar a MySQL:

```bash
docker compose -f docker-compose-dev.yml exec mysqldb mysql -uroot -p
```

## 9. Actualizaciones de BBDD en contenedores Docker

Esta sección resume cómo aplicar cambios de base de datos cuando trabajas con contenedores.

### 9.1. Entender persistencia

- MySQL usa volumen persistente (`mysql-data:/var/lib/mysql`).
- Si cambias `Tables.sql`, **los datos existentes del volumen no se recrean solos**.
- Reiniciar backend no equivale a migrar schema existente.

### 9.2. Escenario A: tabla nueva o `CREATE TABLE IF NOT EXISTS`

Si el cambio en `Tables.sql` solo agrega tablas nuevas compatibles:

```bash
docker compose -f docker-compose-dev.yml restart server
```

Alternativa segura:

```bash
docker compose -f docker-compose-dev.yml up -d --build
```

El backend volverá a ejecutar `ensureDatabaseAndTables()` y creará las faltantes.

### 9.3. Escenario B: cambio estructural en tabla existente (ALTER, DROP, rename)

Debes aplicar SQL manualmente al contenedor MySQL:

```bash
docker compose -f docker-compose-dev.yml exec mysqldb mysql -uroot -p
```

Luego:

```sql
USE ElPicoteo;
ALTER TABLE Stock ADD COLUMN url VARCHAR(255) NOT NULL DEFAULT '';
```

Recomendación:

- Guardar estos cambios en un script versionado dentro de `src/core/db/` (por ejemplo `migration_YYYYMMDD.sql`) para trazabilidad.

### 9.4. Escenario C: reset completo de base de datos (solo desarrollo)

Si necesitas reconstruir schema y empezar limpio:

```bash
docker compose -f docker-compose-dev.yml down -v
docker compose -f docker-compose-dev.yml up --build
```

Esto elimina el volumen `mysql-data` y por tanto **borra todos los datos**.

### 9.5. Cargar datos mock

Con contenedores activos y autenticación de admin, usar:

- `GET /api/databases/mockup-insertion`

Ese flujo inserta datos desde `src/core/db/Data_mockups.sql`.

### 9.6. Checklist recomendado antes de tocar schema

1. Respaldar datos (si no es entorno efímero).
2. Aplicar cambio SQL en MySQL.
3. Actualizar `Tables.sql` para reflejar estado esperado.
4. Ajustar `constants.ts`, models y services afectados.
5. Probar endpoints CRUD relacionados.

## 10. Notas de integridad referencial

Hay relaciones con claves foráneas entre `Stock`, `Ingredients`, `Sale_Items`, `Inventory`, `Purchase_Items`, etc.

Al eliminar entidades con dependencias, primero deben eliminarse registros hijos o manejarse en transacción desde servicio. Ejemplo ya implementado: borrado de receta limpiando referencias en `Sale_Items` antes de eliminar `Stock`.
