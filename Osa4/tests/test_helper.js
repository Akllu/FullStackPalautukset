const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'John Doe',
    url: 'https://www.blogs.com/johndoe',
    likes: 1
  },
  {
    title: 'Second blog',
    author: 'John Wick',
    url: 'https://www.blogs.com/johnwick',
    likes: 67
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}