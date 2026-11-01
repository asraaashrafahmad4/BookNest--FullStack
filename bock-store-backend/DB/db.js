const mongoose = require('mongoose')

let connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/booknest')
        console.log('connected to database')
    }
    catch (error) {
        console.log('error connecting to database', error)
    }
}
module.exports = connectDB
