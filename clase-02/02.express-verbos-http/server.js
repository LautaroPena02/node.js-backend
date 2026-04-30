const express = require('express')
const app = express()
const port = 8080

// ! Middeware
app.use(express.json()) // para parsear el cuerpo de las peticiones en formato json

// | CRUD COMPLETO

// ? R:READ -> LEER UN RECURSO
// ? Todoss los usuarios -> http://localhost:8080/api/v1/usuarios
app.get('/api/v1/usuarios', (req, res) => {
  // console.log(req.query)
  const { sort, order } = req.query
  // console.log(req) el objeto que representa una petición (request) del protocolo http
  // console.log(res) el objeto que representa una respuesta (response) del protocolo http
  res.send(`Me devuelve todos los usuarios ordenados por ${sort} y en direccion asc ${order}`)
})


// ? Obtener un usuario -> http://localhost:8080/api/v1/usuarios/5 por ejemplo
app.get('/api/v1/usuarios/:id', (req, res) => {
  const { id } = req.params
  res.send(`Obteniendo el usuario con id: ${id}`)
})


// ? C:CREATE -> CREAR UN RECURSO
// app.post('/api/v1/usuarios', (req, res) => {
//   console.log(req.body) // el cuerpo de la petición, es decir, los datos que se envían para crear un nuevo recurso
//   // post -> crear un nuevo recurso
//   res.send('Me crea un nuevo usuario')
// })
  
app.post('/api/v1/usuarios', (req, res) => {
  const usuario = req.body
  res.status(201).json(usuario)
})


// ? U:UPDATE -> ACTUALIZAR UN RECURSO
app.put('/api/v1/usuarios/', (req, res) => {
  // put -> actualizar un recurso existente
  const { id } = req.params
  res.send(`Me edita el usuario`)
}) 


// ? D:DELETE -> ELIMINAR UN RECURSO 
app.delete('/api/v1/usuarios/', (req, res) => {
  // delete -> eliminar un recurso existente
  res.send(`Me elimina el usuario`)
})


// ? U:UPDATE -> ACTUALIZAR UN RECURSO
// * El actualizar necesita la info que se está actualizando
// * Pero también necesita cual usuario está editando
app.put('/api/v1/usuarios/:id', (req, res) => {
  // put -> actualizar un recurso existente
  const { id } = req.params
  res.send(`Edita el usuario con el id: ${id}`)
})


// ? D:DELETE -> ELIMINAR UN RECURSO
// * El eliminar necesita el id del recurso a eliminar
// * Por eso se le pasa el id como parámetro en la ruta
app.delete('/api/v1/usuarios/:id', (req, res) => {
  // delete -> eliminar un recurso existente
  const { id } = req.params
  res.send(`Elimina el usuario con el id: ${id}`)
})


// app.get('/{*splat}', (req, res) => {
//   // 404 -> no se encontró la ruta
//   res.status(404).send('ruta GET no encontrada')
// })

// app.post('/{*splat}', (req, res) => {
//   // 404 -> no se encontró la ruta
//   res.status(404).send('ruta POST no encontrada')
// })

// ? Para evitar repetir el mismo código para cada verbo http, podemos usar app.all() para manejar todas las rutas no encontradas 
app.all('/{*splat}', (req, res) => {
  // 404 -> no se encontró la ruta
  const metodo = req.method
  const laRuta =req.url
  res.status(404).send(`La ruta ${laRuta} con el método ${metodo} no es valida`)
})


app.listen(port, () => {
  console.log(`El servidor arrancó en http://localhost:8080/api/v1/usuarios`)
})
