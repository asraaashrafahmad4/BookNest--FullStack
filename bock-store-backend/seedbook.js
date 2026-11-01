const mongoose = require('mongoose')
const books = require('./models/books')

const bookData = [
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        image: 'https://placehold.co/300x450?text=The+Alchemist',
        description: 'A story about following your dreams.',
        price: 30,
        tags: ['Fiction', 'Adventure']
    },
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        image: 'https://placehold.co/300x450?text=Harry+Potter',
        description: 'A young wizard begins his magical journey.',
        price: 40,
        tags: ['Fantasy', 'Adventure']
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        image: 'https://placehold.co/300x450?text=The+Hobbit',
        description: 'Bilbo Baggins goes on an unexpected adventure.',
        price: 35,
        tags: ['Fantasy', 'Adventure']
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        image: 'https://placehold.co/300x450?text=Pride+and+Prejudice',
        description: 'A classic story about love and society.',
        price: 25,
        tags: ['Romance', 'Classic']
    },
    {
        title: '1984',
        author: 'George Orwell',
        image: 'https://placehold.co/300x450?text=1984',
        description: 'A novel about society, control, and freedom.',
        price: 32,
        tags: ['Fiction', 'Classic']
    }
]

const addBooks = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/booknest')

        await books.deleteMany()

        await books.insertMany(bookData)

        console.log('Books added successfully')

        mongoose.connection.close()

    } catch (error) {
        console.log(error)
    }
}

addBooks()