# Curso de Node.js Backend - EducaciónIT

Repositorio del curso de desarrollo backend con Node.js, desde los fundamentos hasta conceptos avanzados: APIs RESTful, bases de datos, autenticación, WebSockets, motores de plantillas y más.

---

## Contenido del Curso

### Clase 01 — Introducción a Node.js y Express

- Qué es Node.js (Ryan Dahl, motor V8)
- Instalación de herramientas: VS Code, Git, Node.js, NPM
- `npm init -y`, `package.json`, scripts
- Conceptos de Git: init, status, add, commit
- Primeros pasos con Express (`express@^5`)
- `node_modules`, `package-lock.json`

### Clase 02 — Express y Verbos HTTP

- Primer servidor Express (`app.get`, `app.listen`)
- Métodos HTTP: GET, POST, PUT, PATCH, DELETE
- Mapeo a operaciones CRUD
- Parámetros de ruta (`:id`), query string, cuerpo de la petición
- `express.json()` middleware
- Códigos de estado HTTP y manejo de 404

### Clase 03 — CRUD Completo, Rutas y Variables de Entorno

- CRUD de productos con validación de datos in-memory
- Auto-generación de IDs, `find()`, `findIndex()`, `splice()`
- Separación de rutas con `express.Router()`
- Arquitectura modular con `module.exports` / `require`
- Variables de entorno con `dotenv` (`.env`, `.env.example`)
- Puerto configurable vía `process.env.PORT`

### Clase 04 — Middleware y Express Validator

- Concepto de middleware en Express
- Middleware incorporado: `express.json()`, `express.static()`
- Middleware de aplicación (logger de fecha)
- Middleware de ruta (validación de token, rol admin)
- Middleware de error (`errorHandler`)
- `path.join()`, `__filename`, `__dirname`
- Validación de formularios con `express-validator`
- `check()`, `validationResult()`
- `express.urlencoded()` para datos de formulario

### Clase 05 — Validación Avanzada y Subida de Archivos

- Validadores modulares en archivos separados
- Validaciones encadenadas: `notEmpty().isLength().isInt().isEmail()`
- Mensajes de error personalizados
- Middleware de validación reutilizable
- Subida de archivos con `multer`
- `diskStorage()` con destino y nombre personalizado
- Generación de UUID con `uuid` v4
- Servir archivos estáticos con `express.static`

### Clase 06 — CORS, Frontend Upload y MongoDB

- Configuración de CORS (`cors` middleware)
- Modularización de la configuración de Multer
- Devolver URL del archivo subido
- Frontend en React + Vite para subida de imágenes
- `FormData`, `fetch()`, renderizado de imagen subida
- Introducción a bases de datos NoSQL vs SQL
- Concepto de documentos JSON y esquemas flexibles

### Clase 07 — MongoDB Shell

- MongoDB: `mongod`, `mongosh`
- Comandos: `show dbs`, `use`, `show collections`
- CRUD: `insertOne()`, `insertMany()`, `find()`, `findOne()`, `countDocuments()`
- Operadores de comparación: `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$in`, `$nin`
- `ObjectId`, documentos anidados, `_id` personalizado
- JSON vs BSON

### Clase 08 — Backup y Restore de MongoDB

- Dump de base de datos MongoDB (BSON + metadata)
- Colecciones: `productos`, `usuarios`
- Preparación de datos para usar con Mongoose

### Clase 09 — Mongoose: Modelos y CRUD

- Conexión a MongoDB con Mongoose
- Definición de esquemas (`Schema`) con tipos y opciones
- `timestamps: true`, `versionKey: false`
- Modelos: `find()`, `findById()`, `findByIdAndUpdate()`, `findByIdAndDelete()`
- `select('-password')` para excluir campos
- Validación de `ObjectId` con `mongoose.Types.ObjectId.isValid()`
- Patrones async/await y then/catch

### Clase 10 — Cookies y Sesiones

- `cookie-parser`: leer cookies del cliente
- `express-session`: manejo de sesiones en servidor
- Configuración: `secret`, `resave`, `saveUninitialized`, `cookie.httpOnly`
- Contador con sesión vs sin sesión
- ES Modules (`"type": "module"`, import/export)

### Clase 11 — Autenticación con Passport (Registro)

- Modelo de usuario con Mongoose (nombre, correo, password)
- Hash de contraseñas con `bcrypt` (`genSalt`, `hash`)
- Validación de correo duplicado
- Confirmación de contraseña
- `passport`, `passport-local`, `connect-mongo`
- Configuración de herramientas: ESLint, Prettier, EditorConfig

### Clase 12 — Passport Local + Arquitectura MVC

- Estrategia Local de Passport (`usernameField: correo`)
- `serializeUser` / `deserializeUser`
- Almacenamiento de sesiones en MongoDB con `connect-mongo`
- Middleware `isAuthenticated()`
- Arquitectura MVC: Models, Controllers, Routes
- Métodos de modelo: `encriptarPassword()`, `comprobarPassword()`

### Clase 13 — JWT y WebSockets

- **JWT**: `jsonwebtoken` + `passport-jwt`
- Cookie extractor para JWT
- Generación de token: `jwt.sign(payload, secret, {expiresIn})`
- Autenticación stateless (`session: false`)
- **Socket.io**: servidor WebSocket sobre Express
- `createServer` + `Server` de socket.io
- Comunicación bidireccional en tiempo real

### Clase 14 — Chat en Vivo y Motores de Plantillas

- **Socket.io Chat**: eventos `connection`, `disconnect`, `nuevo-mensaje`
- Autenticación vía `socket.handshake.auth`
- Broadcasting con `io.sockets.emit()`
- Cliente Socket.io con UI en Tailwind CSS
- **EJS**: motor de plantillas (`app.set('view engine', 'ejs')`)
- Layouts, parciales (`header.ejs`, `footer.ejs`)
- Renderizado de vistas con datos del controlador
- Panel de administración con acciones CRUD

### Clase 16 — Proyecto Integrador

- Aplicación completa con todas las capas
- CRUD completo de productos con Mongoose
- Autenticación Passport Local con sesiones
- Validación avanzada con `express-validator`
- Reglas: código alfanumérico, categorías predefinidas, precio/stock numéricos
- Logging estructurado con `pino` (archivo `./logs/app.log`)
- Dashboard admin con búsqueda y filtro por categoría
- Eliminación vía fetch + SweetAlert2 (confirmación)
- UI responsive con Tailwind CSS
- Buenas prácticas: `.editorconfig`, `.prettierrc`, ESLint, `.gitignore`

---

## Paquetes Utilizados

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `express` | ^5.2.1 | Framework web |
| `dotenv` | ^17.4.2 | Variables de entorno |
| `nodemon` | ^3.1.14 | Recarga automática en desarrollo |
| `express-validator` | ^7.3.2 | Validación de datos |
| `multer` | ^2.1.1 | Subida de archivos |
| `uuid` | ^14.0.0 | Generación de IDs únicos |
| `cors` | ^2.8.6 | Control de acceso CORS |
| `mongoose` | ^9.x | ODM para MongoDB |
| `cookie-parser` | ^1.4.7 | Parseo de cookies |
| `express-session` | ^1.19.0 | Manejo de sesiones |
| `bcrypt` | ^6.0.0 | Hashing de contraseñas |
| `connect-mongo` | ^6.0.0 | Almacenamiento de sesiones en MongoDB |
| `passport` | ^0.7.0 | Autenticación |
| `passport-local` | ^1.0.0 | Estrategia de autenticación local |
| `jsonwebtoken` | ^9.0.3 | Tokens JWT |
| `passport-jwt` | ^4.0.1 | Estrategia JWT para Passport |
| `socket.io` | ^4.8.3 | WebSockets |
| `ejs` | ^6.0.1 | Motor de plantillas |
| `pino` | ^10.3.1 | Logging estructurado |

---

## Estructura del Proyecto

```
node.js-backend/
├── clase-01/        Introducción a Node.js y Express
│   ├── 01.intro-node/
│   └── 02.intro-node-express/
├── clase-02/        Verbos HTTP en Express
│   ├── 01.intro-node-express.cont/
│   └── 02.express-verbos-http/
├── clase-03/        CRUD, Rutas y Variables de Entorno
│   ├── 01.express-verbos-http.cont/
│   ├── 02.crud-completo-productos/
│   ├── 03.routes/
│   └── 04.variables/
├── clase-04/        Middleware y Express Validator
│   ├── 01.middlewares/
│   └── 02.express-validator/
├── clase-05/        Validación Avanzada y Multer
│   ├── 01.express-validator.cont/
│   └── 02.middleware-multer/
├── clase-06/        CORS, Frontend Upload y MongoDB Intro
│   ├── 01.middleware-multer.cont/
│   ├── 02.front-upload-image/
│   └── 03.mongo-mongose/
├── clase-07/        MongoDB Shell (CRUD, operadores)
│   └── 01.mongo-mongose/
├── clase-08/        Backup y Restore de MongoDB
│   └── 01.mongo-mongose.cont/
├── clase-09/        Mongoose (conexión, esquemas, CRUD)
│   └── 01.mongoose-mongo/
├── clase-10/        Cookies y Sesiones
│   └── 01.cookies-sesiones/
├── clase-11/        Autenticación con Passport
│   └── 01.auth.passport/
├── clase-12/        Passport Local + MVC
│   └── 01.auth.passport.cont/
├── clase-13/        JWT + WebSockets
│   ├── 01.auth.passport.jwt/
│   └── 02.socket-io/
├── clase-14/        Chat Socket.io + EJS
│   ├── 01.socket.io/
│   └── 02.auth.passport/
├── clase-16/        Proyecto Integrador
│   └── 01.integrador/
└── README.md
```

---

## Requisitos

- Node.js (LTS recomendada)
- NPM
- MongoDB (clases 07 a 16)
- VS Code (recomendado)

## Cómo usar

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd node.js-backend

# Ir a una clase y ejecutar
cd clase-XX/0X-nombre-del-proyecto
npm install
npm run dev
```

Cada proyecto incluye su propio `package.json` con las dependencias necesarias.
