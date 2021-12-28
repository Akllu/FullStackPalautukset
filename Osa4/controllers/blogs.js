const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  if (!body.title || !body.author || !body.url) {
    return res.status(400).json({
      error: 'Something is missing!'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'you are unauthorized!' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter