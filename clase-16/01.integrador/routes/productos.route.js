import express from 'express';
import productosController from '../controllers/productos.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';
import createProductoValidator from '../validators/producto.validator.js';
import productoMiddleware from '../middlewares/producto.middleware.js';

const routerProductos = express.Router();

// ! ---------------------- Rutas Productos
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get('/productos', productosController.getAllProductos);

// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get('/productos/:id', productosController.getOneProductos);

// ! ---------------------- Rutas Privadas a Productos (Dashboard)

routerProductos.get('/dashboard', productosController.getAllProductosPrivado);

routerProductos.get('/product-detail/:id', productosController.getOneProductos);

routerProductos.get('/create-formu', productosController.showCreateFormu);
routerProductos.get('/edit-formu/:id', productosController.showEditFormu);

routerProductos.post(
  '/create-formu',
  createProductoValidator,
  productoMiddleware,
  productosController.saveProduct
);

routerProductos.delete('/remove/:id', productosController.removeProduct);

export default routerProductos;
