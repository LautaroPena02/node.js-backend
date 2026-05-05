const app = require('./src/app')
require('dotenv').config() // Carga las variables de entorno desde el archivo .env
const port = process.env.PORT 

app.listen(port, (error) => {
  if (error) {
    throw new Error('Error al arrancar el servidor ${error}')
  } 
  console.log(`El servidor arrancó en http://localhost:${port}`)
})
