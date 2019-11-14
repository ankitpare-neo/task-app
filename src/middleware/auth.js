const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        console.log("decoded", decoded);
        const user = await User.findOne({ name: decoded.name, 'tokens.token': token })    

        if (!user) {
            throw new Error()
        }

        req.user = user
         req.token = token
      
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth