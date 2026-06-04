const express = require('express')
require('dotenv').config()
const {mongoose, version} = require('mongoose');


const handleConnect = require('./utils/handle-connect');

//Variables / Constantes
const app = express()
const PORT = 8080
const MONGOSC = process.env.MONGOSC

//Configuraciones
// SCHEMA -> Lo que hago al crear un esquema es diciendole a Mongoose como va a ser el documento (Los fields que va a tener mi documento)
/// https://mongoosejs.com/docs/schematypes.html
// mongoose.Schema(<definición-del-doc>, <configuracion-del-esquema>)

const EsquemaUsuario = new mongoose.Schema(
    {
    nombre: String,
    apellido: String,
    correo: String,
    edad: Number,
    password: String
  },
  {
    versionKey: false, // quita el field __v que mongoose agrega por defecto a cada documento para controlar las versiones de los mismos
    timestamps: true // agrega los fields createdAt y updatedAt a cada documento, con la fecha de creación y última actualización del mismo
  }
)

// MODELO -> Lo que le digo a Mongoose cuando creo un modelo es cual es el nombre de la colección y que fields tiene cada documento que se va a guardar en esa colección
// mongoose.model('<nombre-colección-plural>, <que-fields-va-a-tener-ese-documento(esquema)>)

const ModeloUsuario = mongoose.model('usuarios', EsquemaUsuario);

//Middleware
app.use(express.json())

//Rutas
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

// GET ALL
app.get('/usuarios', async (req, res) => {
  try {
    /* const usuarios = await ModelUsuarios.find{}, {passaword 0}) */
    const usuarios =  await ModeloUsuario.find().select('-password')
    console.log(usuarios)
    res.json(usuarios)
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, message: 'Error al obtener los usuarios'})
  }
})

// GET ONE
app.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id
  try {
    /* if (id) { */
    if (mongoose.Types.ObjectId.isValid(id)) {
      const usuario = await ModeloUsuario.findById(id).select('-password')
      console.log(usuario)
      res.json(usuario)
    } else {
      res.status(400).json({ok: false, message: 'ID inválido'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, message: 'Error al obtener el usuario'})
  }
})   

// CREATE (Crear)
app.post('/usuarios', async (req, res) => {
  // console.log(req.body)
  const usuarioACrear = req.body
  try {
    // ! 1. Opción
    //const usuarioGuardado = await ModeloUsuario.create(usuarioACrear)
    //console.log(usuarioGuardado)
    // ! 2. Opción
    const usuarioAGuardar = new ModeloUsuario(usuarioACrear)
    const usuarioGuardado = await usuarioAGuardar.save()
    console.log(usuarioGuardado)
    // ! 3. Opción
    // const usuarioGuardado = await ModeloUsuario.insertOne(usuarioACrear)

    res.status(201).json(usuarioGuardado)
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, msg: 'No se pudo guardar el usuario'})
  }
})

// DELETE (Eliminar)
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id
        if (mongoose.Types.ObjectId.isValid(idUsuario)) {
          // const usuarioEliminado = await ModeloUsuario.deleteOne({ _id: id})
          const usuarioEliminado = await ModeloUsuario.findByIdAndDelete(idUsuario)
          if(!usuarioEliminado) {
            res.status(404).send('No se encontro usuario');
          }
          res.status(200).json({ message: 'Usuario eliminado correctamente' })    
        } else {
          res.status(400).json({ok: false, msg: 'ID inválido'})
        }
    } catch (err) {
        console.log('Error al eliminar usuario', err)
        res.status(500).json({ error: 'Error al eliminar usuario' })
    }
})

// PUT (editar)
app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id
  const usuarioAEditar = req.body

  try { 
    if (mongoose.Types.ObjectId.isValid(id)) {
      const options = {new: true, select: '-password'} // con esta opción le digo a Mongoose que me devuelva el documento ya editado, sino me devuelve el documento antes de ser editado
      const usuarioEditado = await ModeloUsuario.findByIdAndUpdate(id, usuarioAEditar, options)
      console.log(usuarioEditado)      
      res.json(usuarioEditado)
    } else {
      res.status(400).json({ok: false, message: 'ID inválido'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, message: 'Error al editar el usuario'})
  }
})


//Levanta servidor
app.listen(PORT, (err) => { 
    if (err) { throw new Error('El servidor no se pudo levantar') }
    console.log(`El servidor está escuchando en el puerto: http://localhost:${PORT}`)
    handleConnect(MONGOSC)
})