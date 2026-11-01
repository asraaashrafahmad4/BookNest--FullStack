const express = require('express')
const validation = require('../validation/orderValidation')
const orderController = require('../controller/orderController.js')
const { auth, admin } = require('../middleware/auth_middleware.js')


let router = express.Router()

router.route('/')
    .get(auth, admin, orderController.getAllOrders)
    .post(auth, validation, orderController.addOrder)


router.route('/my')
    .get(auth, orderController.getMyOrders)


router.route('/:id')
    .get(auth, admin, orderController.getOrderById)
    .patch(auth, admin, orderController.updateOrder)
    .delete(auth, admin, orderController.deleteOrder)

module.exports = router