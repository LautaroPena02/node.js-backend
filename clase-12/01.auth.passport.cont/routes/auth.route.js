import express from 'express';
const routerAuth = express.Router();
import authController from '../controllers/auth.controller.js';


// !-------Rutas de Usuarios------! //

// ! Ruta donde recibo la info de logueo (usuario y password)
routerAuth.post('/login', authController.login);

// ! Ruta donde recibo la info de registro (nombre, correo, password, confirm-password)
routerAuth.post('/register', authController.register);

// ! Ruta de deslogueo de usuario
routerAuth.get('/logout', authController.logout);

export default routerAuth; // funcionalidad principal de este modulo
