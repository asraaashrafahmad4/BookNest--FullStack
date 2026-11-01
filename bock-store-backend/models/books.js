const mongoose = require('mongoose')

const boohSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    tags: [{
        type: String
    }]
})

let book = mongoose.model('book', boohSchema)
module.exports = book