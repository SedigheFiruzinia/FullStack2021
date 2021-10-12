const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs= require('../models/blogmodel')



test('delete all blogs', async () => {
await Blogs.deleteMany({})
}, 100000)






test('missing password property', async () => {

  
    const newUser = {

      name: 'fuuko',
      username: 'hjhudhfjk',
      password: 'k'

    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
  })


  test('unvalid username', async () => {

    const newUser = {
     // username: 'h',
      name: 'fuuo',
      password: 'hjkgldd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
  })


  test('valid user', async () => {

    const newUser = {
      username: 'Sedighe',
      name: 'sedi',
      password: 'HIIII'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  
  },100000)