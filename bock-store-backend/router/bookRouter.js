const express = require('express')
const bookController = require('../controller/bookController')
const Validation = require("../validation/bookValidation.js")
const { auth, admin } = require('../middleware/auth_middleware.js')


let router = express.Router()



router.route('/')
    .get(bookController.getAllBooks)
    .post(auth, admin, Validation, bookController.addBook)

router.route('/:id')
    .get(bookController.getBookById)
    .patch(auth, admin, bookController.updateBook)
    .delete(auth, admin, bookController.deleteBook)

module.exports = router
