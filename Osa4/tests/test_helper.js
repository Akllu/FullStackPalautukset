const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'John Doe',
    url: 'https://www.blogs.com/johndoe',
    likes: 1,
    user: '61cb02d5b86b4e2fd6626fe2'
  },
  {
    title: 'Second blog',
    author: 'John Wick',
    url: 'https://www.blogs.com/johnwick',
    likes: 67,
    user: '61cb02d5b86b4e2fd6626fe2'
  }
]

const initialUsers = [
  {
    username: 'TestUser',
    name: 'John Doe',
    password: 'test123'
  },
  {
    username: 'TestUser2',
    name: 'John Wick',
    password: 'test123'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}