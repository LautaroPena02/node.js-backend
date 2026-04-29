const express = require('express')
const app = express()
const port = 8080

//callback -> anonima
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(port, () => {
  console.log(`El servidor arrancó en http://localhost:${port}`)
})
