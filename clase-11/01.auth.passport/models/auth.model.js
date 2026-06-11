import mongoose from 'mongoose';

const UsuarioEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ! Creamos el modelo
//                                  (collección, cuales van a ser los field del documento)
const usuarioModelo = mongoose.model('usuarios', UsuarioEsquema);

export default usuarioModelo;
