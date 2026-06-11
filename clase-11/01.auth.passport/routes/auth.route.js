import express from 'express';
import bcrypt from 'bcrypt';
import UsuarioModelo from '../models/auth.model.js';
const routerAuth = express.Router();

// !-------Rutas de Usuarios------! //

// ! Ruta donde recibo la info de logueo (usuario y password)
routerAuth.post('/login', (req, res) => {
  res.send('login');
});

// ! Ruta donde recibo la info de registro (nombre, correo, password, confirm-password)
routerAuth.post('/register', async (req, res) => {
  try {
    //para recibir un usuario
    // ! 1. recibir los datos -> nombre, correo, password, confirm-password
    console.log(req.body); //<-- para recibir los datos
    const { nombre, correo, password, confirm_password } = req.body;

    // ! 2. controlar si el correo existe en la DB
    const usuario = await UsuarioModelo.findOne({ correo });

    if (usuario) {
      return res.status(200).json({ msg: 'El correo ya existe' });
    }

    // ! 3. controlar si los password coinciden (password === confirm_password)
    if (password !== confirm_password) {
      return res.status(400).json({ msg: 'Las contraseñas no coinciden' });
    }

    // ! 4. guardar el usuario en una coleccion dentro de Mongo DB
    const usuarioPorCrear = new UsuarioModelo({ nombre, correo, password }); // Password sin encriptar (hashar)
    // Tenemos diferentes tipos de algoritmos de hasheo (encriptación)
    // Simple vía -> Una vez hasheado, no se puede recuperar el valor original -> 123456 -> Nunca más voy a ver ese valor -> (bcrypt)
    // Doble vía -> Un vez hasheado, puedo deshashar y recuperar el valor original.
    const salt = await bcrypt.genSalt(10); // Semilla (SaltRound -> Factor de Coste) A Mayor valor, mas tiempo y coste de procesamiento para generar la semilla
    usuarioPorCrear.password = await bcrypt.hash(password, salt);

    const usuarioCreado = await usuarioPorCrear.save();
    console.log(usuarioCreado);

    // ! 5. Respuesta con OK
    res.status(201).json({
      msg: 'Todo salió bien, se creó el usuario',
      usuario: { ok: true, usuario: usuarioCreado },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo registrar el usuario' });
  }
});

// ! Ruta de deslogueo de usuario
routerAuth.get('/logout', (req, res) => {
  res.send('logout');
});

export default routerAuth; // funcionalidad principal de este modulo
