const user = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        let error = validationResult(req)
        console.log('REGISTER REQUEST RECEIVED');
        console.log(error)

        if (!error.isEmpty()) {
            return res.json({ error: error.array() })
        }

        let founduser = await user.findOne({ email: req.body.email })
        if (founduser) {
            return res.json({ error: "Email Already exists" })
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10)

        let newuser = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashpassword,
            role: req.body.role,

        })
        await newuser.save()

        res.json({ msg: 'Registered Successfully' })
    }
    catch (error) {
        console.log(error);

        res.json({
            error: 'Server error'
        })
    }
}


let login = async (req, res) => {
    try {
        let error = validationResult(req)
        console.log(error)

        if (!error.isEmpty()) {
            return res.json({ error: error.array() })
        }
        let founduser = await user.findOne({ email: req.body.email })

        if (!founduser) {
            return res.json({ error: 'Email or password is incorrect' })
        }

        let correctpassword = await bcrypt.compare(
            req.body.password,
            founduser.password
        )
        if (!correctpassword) {
            return res.json({ error: 'Email or password is incorrect' })

        }

        let token = jwt.sign({
            id: founduser._id,
            role: founduser.role
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '3d'
            })
        res.json({
            msg: 'Login Successfully',
            token: token
        })
    } catch {
        res.json({ error: 'Server error' })
    }
}


let getAllUsers = async (req, res) => {
    try {
        let users = await user.find({}, { password: false, '__v': false })
        res.json({ users })
    } catch {
        res.json({ error: 'Server error' })
    }
}

let getUserById = async (req, res) => {
    try {
        let id = req.params.id
        let founduser = await user.findOne({ _id: id }
            , { password: false, "__v": false }
        )
        if (!founduser) return res.json({ error: 'User not found' })
        res.json(founduser)
    } catch {
        res.json({ error: 'Server error' })
    }
}


let updateUser = async (req, res) => {
    try {
        let id = req.params.id

        let updatedUser = await user.updateOne({ _id: id }, { $set: { ...req.body } }

        )
        if (!updatedUser.matchedCount) {
            return res.json({ error: 'User not found' })
        }

        res.json({ msg: 'User Updated' })
    } catch {
        res.json({ error: 'Server error' })
    }
}


let deleteUser = async (req, res) => {
    try {
        let id = req.params.id

        let deletedUser = await user.deleteOne({ _id: id })

        if (!deletedUser.deletedCount) {
            return res.json({ error: 'User not found' })
        }

        res.json({ msg: 'User Deleted' })
    } catch {
        res.json({ error: 'Server error' })
    }
}

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}

