require('dotenv').config()
const express = require('express');
const cors = require('cors');


const connectDB = require('./DB/db')


const userRouter = require('./router/userRouter')
const orderRouter = require('./router/orderRouter')
const bookRouter = require('./router/bookRouter')


const app = express();


app.use(cors());
app.use(express.json());

connectDB()




app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Pet House API'
    })
})
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/books', bookRouter)



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`booknester backend is running on port ${port}`)
})