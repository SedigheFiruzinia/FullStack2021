const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const api = supertest(app)




test('the number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
}, 1000000)




test('existence of id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

}, 1000000)



test('a valid blog can be added', async () => {

  const blogsInDbPre = await helper.blogsInDb()
  
  const newBlog = {
    title: 'Hospital',
    auther: 'Hossein',
    url: '//',
    likes : 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlZGlnaGUiLCJpZCI6IjYxNjQwZDJhODE2M2ZhNDcxOGQwNDNkMCIsImlhdCI6MTYzMzk0NzI4NH0.cT3pzme0wsmfoNSPDcbDlXzdMPuxcO_xUE1ILENmgnE') 
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsInDb = await helper.blogsInDb()
  const dbLength = blogsInDb.length

  expect (blogsInDbPre).toHaveLength(dbLength - 1)
  expect (response.body).toHaveLength(blogsInDb.length)

  const b = response.body.map (b => b.title)
  expect(b).toContain(newBlog.title)
  const q = response.body.map (b => b.auther)
  expect(q).toContain(newBlog.auther)

  expect(response.body[dbLength -1].auther).toBe(newBlog.auther)
  expect(response.body[dbLength -1].title).toBe(newBlog.title)
  expect(response.body[dbLength -1].likes).toBe(newBlog.likes || 0)
  expect(response.body[dbLength -1].url).toBe(newBlog.url)

})


test('missing like property', async () => {

  
  const newNote = {
    title: 'f',
    auther: 'h',
    url: 'kk//kk',
    likes : 58
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(201)

  const blogsInDb = await helper.blogsInDb()
  const dbLength = blogsInDb.length

  expect(response.body[dbLength -1].likes).toBe(0)

})


test('a blog without title and url', async () => {

  
  const newNote = {
    auther: 'f',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(400)

})


afterAll(() => {
  mongoose.connection.close()
})