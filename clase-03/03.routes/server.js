const app = require('./src/app')
const port = 8080

app.listen(port, (error) => {
  if (error) {
    throw new Error('Error al arrancar el servidor ${error}')
  } 
  console.log(`El servidor arrancó en http://localhost:${port}`)
})
