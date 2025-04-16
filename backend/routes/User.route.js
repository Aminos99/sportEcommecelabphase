const express = require('express')
router = express.Router()
const UserController = require('../controllers/UserController')
const authenticateToken = require('../middlewares/auth')
router.post('/adduser',UserController.adduser)
router.post('/login',UserController.login)


module.exports = router