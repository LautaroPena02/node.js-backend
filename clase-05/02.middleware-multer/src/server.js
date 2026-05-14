const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const app = express()
const port = process.env.PORT


// ! Configuraciones 

const storage = multer.diskStorage({
  /* Carpeta donde va a guardarse los recursos */
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
    /* nombre del archivo */
  filename: function (req, file, cb) {
    console.log(file)
    const array = file.originalname.split('.')
    const extension = array.at(-1)
    console.log(extension)
    // const extension2 = array[array.length - 1]
    //console.log(extension2)
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const nombreArchivo = `${uuidv4()}.${extension}`
    cb(null, nombreArchivo)
  }
})

// ! Middlewares
const upload = multer({ storage: storage })
app.use(express.static('./uploads'))


// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/uploads', upload.single('archivo'), (req, res) => {
  // console.log(req.file)
  res.send('Todo Okey')
})


// ! El arranque
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})