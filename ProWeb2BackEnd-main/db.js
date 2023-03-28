// DISCLAIMER:
// ESTOS SON EJEMPLOS DE LAS ACCIONES QUE SE PUEDEN REALIZAR CON MONGOOSE
// NO REALIZA NINGUNA ACCION CON EL INDEX.JS

const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://user:SPt2EjQXKV3iSNxS@proweb2.djh2qpr.mongodb.net/?retryWrites=true&w=majority'
)

//Modelos
//Para Crear un Modelo en MongoDB
const User = mongoose.model('User', {
  username: String,
  edad: Number,
})

// -----------CREATE -----------------
const crear = async () => {
  const user = new User({ username: 'Prueba2', edad: 25 })
  const savedUser = await user.save() //Retorna una promesa
  console.log(savedUser)
}
// crear()

// -----------GET ALL -----------------
const buscarTodo = async () => {
  const users = await User.find()
  console.log(users)
}
//buscarTodo()

// -----------GET  -----------------
const buscar = async () => {
  const user = await User.find({ username: 'Prueba' }) //Devuelve un arreglo
  console.log(user)
}
//buscar()

// -----------GET ONE -----------------
const buscarUno = async () => {
  const user = await User.findOne({ username: 'Prueba2' }) //Devuelve un objeto, Si no encuentra devuelve un NULL
  console.log(user)
}
//buscarUno()

// -----------UPDATE -----------------
const actualizar = async () => {
  const user = await User.findOne({ username: 'Prueba' })
  console.log(user)
  user.edad = 30
  await user.save()
}
//actualizar()

// -----------DELETE -----------------
const eliminar = async () => {
  const user = await User.findOne({ username: 'Prueba' })
  console.log(user)
  if (user) {
    await user.remove() //Siempre y cuando el recurso exista
  }
}

eliminar()
