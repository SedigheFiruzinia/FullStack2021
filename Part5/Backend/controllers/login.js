const loginRouter = require('express').Router()
const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


loginRouter.post('/', async (request, response) => {

    const user = await User.findOne({ username: request.body.username })

    const passwordCorrect = user === null
        ? false
        : await bcryptjs.compare(request.body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter