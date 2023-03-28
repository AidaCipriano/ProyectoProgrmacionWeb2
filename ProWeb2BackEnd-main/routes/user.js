const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.get('/user', user.list)
router.get('/user:id', user.get)
router.get('/user/login', user.login)
router.post('/user', user.create)
router.put('/user:id', user.update)
router.delete('/user:id', user.destroy)

module.exports = router
