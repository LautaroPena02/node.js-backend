// commonjs -> require / module.exports
// ES Modules -> import / export

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8888;

// ! Middlewares

// ? Cookie
app.use(cookieParser());

// ? Express Session

// * secret -> cadena de caracteres que se va a usar para generar sesiones ->  Esto va dentro de una variable de entorno -> secret es una semilla que me va permitir generar un sid único para mi servidor
// * resave -> false (recomendado) -> Permite indica si se va a estar guardando cada vez que se haga una petición.
// * saveUninitialized -> false (recomendado) -> Ni bien crea sesión, si crea vacía no la guardo.
// * cookie. Controla que la cookie sea segura.
// * store: Permite especificar donde se van a guardar las sesiones creadas. Por defecto si no le coloco, guarda en memoria.

app.use(
  session({
    name: "sid", // nombre de la cookie que se va a crear para almacenar el valor (el identificador)
    secret: "clave-ultra-secreta",
    resave: false, // no reescribir si no cambió
    saveUninitialized: false, // no guardar sesión vacía
    cookie: {
      httpOnly: true, // no permitir acceso a la cookie desde JavaScript
      secure: false, // solo enviar cookie por HTTPS (en producción debería ser true)
      maxAge: 1000 * 60 * 60, // duración de la cookie (1 hora)
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.get("/set-cookie", (req, res) => {
  res.cookie("nombre", "Lautaro");
  res.cookie("modo", "dark");
  res.send("Cookie seteada");
});

app.get("/get-cookies", (req, res) => {
  console.log(req.cookies);
  res.send("Cookies recibidas");
});

// ! ----------------------------------

// ! SESIONES
// ! ----------------------------------
let contadorsinSesion = 0;

app.get("/sin-sesion", (req, res) => {
  res.json({ contador: ++contadorsinSesion });
});

app.get("/con-sesion", (req, res) => {
  console.log(req.session);

  if (req.session.contador) {
    // si no existe
    req.session.contador++;
    res.json({
      mensaje: `Has visitado esta página ${req.session.contador} veces`,
    });
  } else {
    req.session.contador = 1;
    res.json({ mensaje: "Bienvenido!" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
