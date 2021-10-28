const blogsRouter = require('express').Router()//
const { response } = require('express')
const Blog = require('../models/blogmodel')
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const helpfunc = require('../utils/list_helper.js')


/*
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
      }
    return null
}
*/


blogsRouter.get('/', async (request, response) => {
    const b = await Blog.find({}).populate('user')
    //helpfunc.mostBlogs(b)
    helpfunc.mostLikes(b)
    response.json(b)
})


blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    /*
        const token = request.token
        const decodedToken = jwt.verify(token, config.SECRET)
    
        if (!(token && decodedToken.id)) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await users.findById(decodedToken.id)
    */
    //const allusers = await users.find({})
    //const randomUser = allusers[0]

    const user = request.user

    const blog = new Blog({
        title: body.title,
        auther: body.auther,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    try {
        const saved = await blog.save()

        user.blogs = user.blogs.concat(saved._id)
        await user.save()

        response.status(201).json(saved)
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.delete('/:id', async (request, response,next) => {
    /*
        const token = request.token
        const decodedToken = jwt.verify(token, config.SECRET)
        
    if (!(token && decodedToken.id)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    */
    console.log('hhhh')
    const user = request.user
    console.log(user)
    try {
        //await Blog.findByIdAndRemove(request.params.id)
        const blogToDelete = await Blog.findById(request.params.id)
        console.log('hhhh')
        if (blogToDelete.user._id.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
        //
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    console.log('hhhh')
    const body = request.body
    const b = {
        likes: body.likes
    }
    
    try {
        const saved = await Blog.findByIdAndUpdate(request.params.id, b, { new: true })
        response.status(201).json(saved)

    } catch (exception) {
        next(exception)
    }

})


module.exports = blogsRouter