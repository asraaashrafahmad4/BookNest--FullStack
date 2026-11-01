const express = require('express')
const userController = require('../controller/userController')

const {
    registerValidation,
    loginValidation
} = require('../validation/userValidation')

const { auth, admin } = require('../middleware/auth_middleware')

let router = express.Router()

router.route('/register')
    .post(registerValidation, userController.register)

router.route('/login')
    .post(loginValidation, userController.login)

router.route('/')
    .get(auth, admin, userController.getAllUsers)

router.route('/:id')
    .get(auth, admin, userController.getUserById)
    .patch(auth, admin, userController.updateUser)
    .delete(auth, admin, userController.deleteUser)

module.exports = router