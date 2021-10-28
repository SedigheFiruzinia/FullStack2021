const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Users = require('../models/userModel')



const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('user:  ', request.user)
    logger.info('---')
    next()
}

/*
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
  }
*/
const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        const decodedToken = jwt.verify(request.token, config.SECRET)
        console.log('Hellllllllooo')
        if ((decodedToken.id)) {
            request.user = await Users.findById(decodedToken.id)
            
        }
        

    }
    next()
}


module.exports = {
    requestLogger,
    userExtractor
}