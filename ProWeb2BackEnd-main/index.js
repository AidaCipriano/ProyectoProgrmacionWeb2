const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const app = express()
const port = 3000

/*app.use(express.json())
app.use('/api', userRoutes)
mongoose.connect(
  'mongodb+srv://user:SPt2EjQXKV3iSNxS@proweb2.djh2qpr.mongodb.net/?retryWrites=true&w=majority'
)

app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})*/


app.get('/ingresar', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../html/Registro.html'))
})