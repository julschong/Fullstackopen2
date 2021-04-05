const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config({ path: __dirname + '/../.env' })

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    console.log(user)
    const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordIsCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200)
        .send(
            {
                token,
                username: user.username,
                name: user.name
            })
})

module.exports = loginRouter