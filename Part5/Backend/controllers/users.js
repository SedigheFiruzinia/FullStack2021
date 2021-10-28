const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const userModel = require('../models/userModel')
const Blog = require('../models/blogmodel')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.password || body.password.length<3) {
        return response.status(400).json({ error: 'unvalid password' })
    }

    saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new userModel({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)

    } catch (exception) {
        next(exception)
    }
})


usersRouter.get('/', async (request, response) => {
    const users = await userModel.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter