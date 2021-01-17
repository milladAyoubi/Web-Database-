const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'newToken')
        const user = await User.findOne({ _id: decode.id, 'tokens.token': token })
        console.log(token)
        console.log(user)

        if (!user)
            throw new Error()

        req.user = user
        next()


    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })
    }

}

module.exports = auth