import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import modelo from '../models/productos.model.js';
import logger from '../utils/handle-logger.js';

const obtenerPagina = async (view, data = {}) => {
  console.log(__dirname);
  const rutaALaPagina = path.join('views', 'pages', view + '.ejs');
  console.log(rutaALaPagina);
  return ejs.renderFile(rutaALaPagina, data); // Devolverme la plantilla ya renderizada
};

const getAllProductos = async (req, res) => {
  try {
    const productos = await modelo.getAllProductos();
    const body = await obtenerPagina('productos', { productos }); // nuevo obj y dentro pasar lo que necesite
    logger.info('Se obtuvieron los productos para el listado público');
    res.render('layout', { titulo: 'Listado Productos', body });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'Falló el listar productos público' });
  }
};

const getOneProductos = async (req, res) => {
  //console.log(req.params);
  const id = req.params.id;
  try {
    const producto = await modelo.getProductoById(id);
    console.log(producto);
    const body = await obtenerPagina('private/producto-detail', { producto });
    res.render('layout', { titulo: 'Detalle de producto', body });
  } catch (error) {
    console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'No se pudo obtener el producto solicitado' });
  }
};

const getAllProductosPrivado = async (req, res) => {
  try {
    const productos = await modelo.getAllProductos();
    const body = await obtenerPagina('private/dashboard', { productos }); // nuevo obj y dentro pasar lo que necesite
    logger.info('Se obtuvieron los productos para el listado privado');
    res.render('layout', { titulo: 'Listado Productos', body });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'Falló el listar productos privado' });
  }
};

const showCreateFormu = async (req, res) => {
  try {
    const body = await obtenerPagina('private/create-formu'); // nuevo obj y dentro pasar lo que necesite
    logger.info('Se pudo mostrar el formulario de creación de producto');
    res.render('layout', { titulo: 'Formulario carga producto', body });
  } catch (error) {
    //console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'No se pudo mostrar el formulario' });
  }
};

const showEditFormu = async (req, res) => {
  try {
    const id = req.params.id;

    const producto = await modelo.getProductoById(id);

    const body = await obtenerPagina('private/create-formu', { producto }); // nuevo obj y dentro pasar lo que necesite
    logger.info('Se pudo mostrar el formulario de edición de producto');
    res.render('layout', { titulo: 'Formulario edición de producto', body });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ msg: 'No se pudo mostrar el formulario de edición' });
  }
};

const saveProduct = async (req, res) => {
  try {
    const productoACrear = req.body;
    console.log(productoACrear);
    await modelo.createProducto(productoACrear);
    logger.info('Se guardó el producto correctamente');
    res.status(201).redirect('/dashboard');
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'No se puedo guardar el producto' });
  }
};

const removeProduct = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;

  try {
    const productoBorrado = await modelo.deleteByIdProducto(id);

    console.log(productoBorrado);
    res.json(productoBorrado);
  } catch (error) {
    //console.log(error);
    logger.error(error);
    res.status(500).json({ msg: 'No se pudo borrar el producto' });
  }
};

export default {
  getAllProductos,
  getOneProductos,
  getAllProductosPrivado,
  showCreateFormu,
  saveProduct,
  removeProduct,
  showEditFormu,
};
