import authModel from '../models/auth.model.js';
import passport from 'passport';

const register = async (req, res) => {
  try {
    //para recibir un usuario
    // ! 1. recibir los datos -> nombre, correo, password, confirm-password
    console.log(req.body); //<-- para recibir los datos
    const { nombre, correo, password, confirm_password } = req.body;

    // ! 2. controlar si el correo existe en la DB

    const usuario = await authModel.getByCorreo(correo);
    if (usuario) {
      return res.status(200).json({ msg: 'El correo ya existe' });
    }

    // ! 3. controlar si los password coinciden (password === confirm_password)
    if (password !== confirm_password) {
      return res.status(400).json({ msg: 'Las contraseñas no coinciden' });
    }

    // ! 4. guardar el usuario en una coleccion dentro de Mongo DB

    const usuarioCreado = await authModel.createUser(
      nombre,
      correo,
      password
    );

    // ! 5. Respuesta con OK
    res.status(201).json({
      msg: 'Todo salió bien, se creó el usuario',
      usuario: { ok: true, usuario: usuarioCreado },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo registrar el usuario' });
  }
};

const login = passport.authenticate('local', {
  successRedirect: '/productos', // es correcto -> true
  failureRedirect: '/', // es incorrecto -> false
});

const logout = (req, res) => {
  res.send('logout');
};

export default {
  register,
  login,
  logout,
};
