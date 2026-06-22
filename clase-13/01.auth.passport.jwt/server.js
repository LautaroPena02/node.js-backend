import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './utils/handle-passport.js';

// ! Variables de entorno
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;
const SECRET = process.env.SECRET;

// ! Configuraciones de la aplicación //

// !Middlewares //

// ! Middleware para procesar el json
app.use(express.json()); // Me parsea y me codifica el body cuando llega a traves del json

// ! Middleware de cookies
app.use(cookieParser()); // Decodificar las cookies que nos lleguen desde el cliente

// ! Middleware de sesiones
// ! Sesiones
// * secret -> cadena de caracteres que se va a usar para generar sesiones ->  Esto va dentro de una variable de entorno -> secret es una semilla que me va permitir generar un sid único para mi servidor
// * resave -> false (recomendado) -> Permite indica si se va a estar guardando cada vez que se haga una petición.
// * saveUninitialized -> false (recomendado) -> Ni bien crea sesión, si crea vacía no la guardo.
// * cookie. Controla que la cookie sea segura.
// * store: Permite especificar donde se van a guardar las sesiones creadas. Por defecto si no le coloco, guarda en memoria.

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    /* cookie: { secure: true } */
    store: MongoStore.create ({ mongoUrl: STRING_CONEXION }),
  })
);

// !Middleware de passwport
app.use(passport.initialize());
app.use(passport.session());


// ! Rutas //
app.use('/', routerAuth);
app.use('/', routerProductos);

app.get('/', (req, res) => {
  res.send('Pagina principal');
});

// ! Arranque del servidor
app.listen(PORT, async () => {
  console.log(`servidor funcionando en http://localhost:${PORT}`);

  try {
    console.time('Conexión a la base de datos');
    await mongoose.connect(STRING_CONEXION);
    console.log('Conexión a la base de datos exitosa');
    console.timeEnd('Conexión a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});
