import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';

// ! Variables de entorno
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;

// ! Configuraciones

// ! Middlewares
app.use(express.json()); // Me parsea y me codifica el body cuando llega a traves del json

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
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
