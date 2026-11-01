const { body } = require('express-validator')

let registerValidation = [
    body('name').notEmpty().withMessage('name is required')
        .isLength({ min: 2 }).withMessage('name is required'),

    body("email").notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be valid'),

    body("password").notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage('password must be at least 6 char'),
]



let loginValidation = [
    body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be valid'),

    body('password').notEmpty().withMessage('password is required')
]

module.exports = {
    registerValidation,
    loginValidation
}