const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        let token =
            req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Access deiend. No token provided"
            })
        }
        token = token.split(' ')[1]

        const docoded = jwt.verify(
            token, process.env.JWT_SECRET,
        )
        req.user = docoded;

        next()
    } catch {
        return res.status(401).json({
            message: "invalid or expired token"
        })

    }
}
let admin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.json({ error: 'Admin only' })
    }

    next()
}

module.exports = {
    auth,
    admin
}