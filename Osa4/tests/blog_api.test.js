const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('Blogs', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are saved to database', async () => {
    const blogs = await blogsInDb()

    expect(blogs).toHaveLength(initialBlogs.length)
  })

  test('identifying fields are named as id', async () => {
    const blogs = await blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })

  test('length grows when using post method ', async () => {
    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const authors = blogsAtEnd.map(r => r.author)
    expect(authors).toContain('test')
  })

  test('likes will be zero if no initialized value is given', async () => {
    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test'
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const blogsLikes = blogsAtEnd.map(b => b.likes)
    expect(blogsLikes[initialBlogs.length]).toBe(0)
  })

  test('post will return status 400 if something is missing', async () => {
    const testBlog = {
      author: 'test'
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})