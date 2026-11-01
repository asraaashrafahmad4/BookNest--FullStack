const books = require('../models/books')
const { validationResult } = require('express-validator')


let getAllBooks = async (req, res) => {
    try {
        let book = await books.find({}, { '__v': false })
        res.json(book)
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Server error' })
    }
}


let getBookById = async (req, res) => {
    try {
        let id = req.params.id
        let book = await books.findById(id, { '__v': false })
        if (!book) {
            res.json({ error: 'book not found' })
        }
        res.json(book)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: error.message
        })
    }
}
let addBook = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty) {
            return res.json({ error: errors.array() })

        }
        let newBook = await new books({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            image: req.body.image,
            tags: req.body.tags,
            description: req.body.description,


        })
        await newBook.save()
        res.json({ msg: 'Created Successfully' })
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Server error' })
    }
}


let updateBook = async (req, res) => {
    try {
        let id = req.params.id

        let updatebook = await books.updateOne({ _id: id },
            { $set: { ...req.body } })

        if (!updatebook.matchedCount) {
            return res.json({ error: 'book not found' })
        }

        res.json({ msg: 'book Updated' })
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Server error' })
    }
}


let deleteBook = async (req, res) => {
    try {
        let id = req.params.id

        let deletedbook = await books.deleteOne({ _id: id })

        if (!deletedbook.deletedCount) {
            return res.json({ error: 'book not found' })
        }

        res.json({ msg: 'book Deleted' })
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}