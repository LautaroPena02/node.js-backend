import mongoose from 'mongoose';
import logger from '../utils/handle-logger.js';

const ProductosEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    categoria: {
      type: String,
    },
    stock: {
      type: Number,
    },
    codigo: {
      type: String,
    },
    precio: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductosModelo = mongoose.model('productos', ProductosEsquema);

const getAllProductos = async () => {
  try {
    const todosLosProductos = await ProductosModelo.find();
    return todosLosProductos;
  } catch (error) {
    throw error;
  }
};

const getProductoById = async (id) => {
  try {
    const producto = await ProductosModelo.findById(id);
    // const producto = await ProductosModelo.findOne({ _id: id})
    logger.info('Se encontró el producto');
    return producto;
  } catch (error) {
    throw error;
  }
};

const createProducto = async (nuevoProducto) => {
  try {
    await ProductosModelo.create(nuevoProducto);
  } catch (error) {
    throw error;
  }
};

const deleteByIdProducto = async (id) => {
  try {
    const productoEliminado = await ProductosModelo.findByIdAndDelete(id);
    return productoEliminado;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllProductos,
  createProducto,
  deleteByIdProducto,
  getProductoById,
};
