const Blog= require('../models/blogmodel')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
  }

  module.exports = {
      blogsInDb
  }