const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expresJwt = require('express-jwt')

const signToken = (_id) => jwt.sign({ _id }, 'hola')

const User = {
  login: async (req, res) => {
    const user = new Users(req.body)
    try {
      const isUser = await Users.findOne({ email: user.email })
      if (!isUser) {
        res.status(403).send('Email o contraseña inválida')
      } else {
        const isMatch = await bcrypt.compare(user.password, isUser.password)
        if (isMatch) {
          const signed = signToken(isUser._id)
          res.status(200).send(signed)
        } else {
          res.status(403).send('Email o contraseña inválida')
        }
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  get: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    res.status(200).send(user)
  },

  list: async (req, res) => {
    const users = await Users.find()
    res.status(200).send(users)
  },

  create: async (req, res) => {
    const user = new Users(req.body)
    try {
      const isUser = await Users.findOne({ email: user.email })
      if (isUser) {
        return res.status(403).send('Usuario ya existente')
      }
      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(user.password, salt)
      user.salt = salt
      const signed = signToken(user.id) //Mi JSON WebToken

      await user.save()
      res.status(201).send(signed)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    Object.assign(user, req.body)
    await user.save()
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    if (user) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = User
