const { body } = require('express-validator')

let validation = [
    body('title').notEmpty().withMessage('title is required')
        .isLength({ min: 2 }).withMessage('title must be more than 2 char'),

    body('author').notEmpty().withMessage('author is required'),

    body('image').notEmpty().withMessage('iamge is required'),

    body('price').notEmpty().withMessage('price is required'),

    body('description').notEmpty().withMessage('description is required'),
    body('tags').notEmpty().withMessage('tags is required')

]



module.exports = validation