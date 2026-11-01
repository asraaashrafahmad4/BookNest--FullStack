const Order = require('../models/orders')
const { validationResult } = require('express-validator')


let getAllOrders = async (req, res) => {

    try {
        let orders = await Order.find({}, { '__v': false })

        res.json(orders)
    } catch {
        res.json({ error: 'Server error' })
    }
}


let getOrderById = async (req, res) => {
    try {
        let id = req.params.id
        let myorder = await Order.findById({
            _id: id
        })
            .populate("user", { password: false, "__v": false })
        if (!myorder) return res.json({ error: 'Order not found' })
        res.json(myorder)
    } catch {
        res.json({ error: 'Server error' })
    }
}

let addOrder = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.json({ error: error.array() })

        }
        let newOrder = new Order({
            user: req.user.id,
            customer: {
                name: req.body.customer.name,
                email: req.body.customer.email,
                phone: req.body.customer.phone,
                address: req.body.customer.address

            },
            items: req.body.items,
            total: req.body.total
        })
        await newOrder.save()

        res.json({ msg: 'Order Created Successfully' })
    } catch (error) {
        console.log('add order error', error)
        res.json({ error: 'Server error' })
    }
}

let getMyOrders = async (req, res) => {
    try {
        let orders = await Order.find({ user: req.user.id }, { "__v": false })

        res.json(orders)
    } catch (error) {
        console.log("get all orders:", error)
        res.json({ error: 'Server error' })
    }
}

let updateOrder = async (req, res) => {
    try {
        let id = req.params.id
        let order = await Order.updateOne({ _id: id },
            { $set: { ...req.body } }
        )
        if (!updateOrder.matchedCount) {
            return res.json({ error: 'Order not found' })
        }

        res.json({ msg: 'Order Updated' })
    } catch {
        res.json({ error: 'Server error' })
    }
}


let deleteOrder = async (req, res) => {
    try {
        let id = req.params.id
        let order = await Order.deleteOne({ _id: id })

        if (!deletedOrder.deletedCount) {
            return res.json({ error: 'Order not found' })
        }

        res.json({ msg: 'Order Deleted' })
    } catch {
        res.json({ error: 'Server error' })
    }
}

module.exports = {
    getAllOrders,
    getMyOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}