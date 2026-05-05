const express = require('express')
const productos = require('../../constants/productos')
// ! El router en express nos permite separar responsabilidades.
// * Agrupar rutas relacionadas 
// * Permite versionar APIs
// * Facilita el mantenimiento del código y el testeo
// * Evita duplicación de rutas
// * Es obligatorio si el proyecto tiene más de 250 líneas
const routerProductos = express.Router()
// | CRUD COMPLETO

// ? R:READ -> LEER UN RECURSO
// ? Todos los productos -> http://localhost:8080/api/v1/productos
routerProductos.get('/api/v1/productos', (req, res) => {
  const { sort, order = 'asc'} = req.query

  let resultado = [...productos] // Para no modificar el array original, hacemos una copia del mismo

  if (sort) {
    resultado.sort((a, b) => { 
      if (order === 'desc') return (a[sort] < b[sort]) ? 1 : -1
      return (a[sort] > b[sort]) ? 1 : -1
    })
  }
  res.json(resultado)
})


routerProductos.get('/api/v1/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const producto = productos.find(p => p.id === id)

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }
  
  res.json(producto)
})


// ? C:CREATE -> CREAR UN RECURSO
routerProductos.post('/api/v1/productos', (req, res) => {
  // console.log(req.body)
  //el identificador unico lo genera el backend
  const {nombre, categoria, precio} = req.body

  if ( !nombre || !categoria || !precio) {
    return res.status(400).json({ error: 'Faltan datos para crear el producto' })
  }
const nuevoProducto = {
  id: productos.length ? productos.at(-1).id +1 : 1,
  nombre,
  categoria,
  precio
}

console.log(nuevoProducto)
productos.push(nuevoProducto)

res.status(201).json(nuevoProducto)
})


// ? U:UPDATE -> ACTUALIZAR UN RECURSO
routerProductos.put('/api/v1/productos/:id', (req, res) => {
  let {id} = req.params
  id = Number(id)
  const producto = req.body
  const index = productos.findIndex(p => p.id === Number(id))

  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  productos[index] = {
    ...productos[index],
    ...producto
  }
  res.json({
    producto: productos[index],
    msg: 'Producto actualizado',
  })
})


// ? D:DELETE -> ELIMINAR UN RECURSO 
routerProductos.delete('/api/v1/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = productos.findIndex(p => p.id === id)
  
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  const eliminado = productos.splice(index, 1)

  res.json({
    msg: 'Producto eliminado',
    producto: eliminado[0]
  })
})

module.exports = routerProductos