const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    items: [{
        book: Object,
        price: Number,
        quantity: Number

    }],
    total: Number,
    status: {
        type: String,
        default: "Pending"
    }
})



let orders = mongoose.model('Order', orderSchema)

module.exports = orders