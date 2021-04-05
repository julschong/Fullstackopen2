const userRouter = require('express').Router()
const User = require('../models/user')
const bcrpt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

userRouter.post('/', async (req, res) => {

    const body = req.body
    const saltRounds = 10
    if (!body.password.match('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')) {
        return res.status(401).json({ error: pwInvalidMessage })
    }

    const pwHash = await bcrpt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: pwHash,
    })

    const returnedUser = await newUser.save()
    res.json(returnedUser)
})

const pwInvalidMessage = {
    err1: 'At least one digit [0-9]',
    err2: 'At least one lowercase character[a - z]',
    err3: 'At least one uppercase character[A - Z]'
}


module.exports = userRouter