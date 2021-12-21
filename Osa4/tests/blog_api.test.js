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

describe('Initialized blogs', () => {
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
})

describe('Addition of a new blog', () => {
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

    const authors = blogsAtEnd.map(b => b.author)
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

  test('post will return status code 400 if something is missing', async () => {
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

describe('Update of a blog', () => {
  test('succeeds if nothing is missing', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      author: 'putTest',
      title: 'putTest',
      url: 'putTest',
      likes: 87
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const authors = blogsAtEnd.map(b => b.author)

    expect(authors).toContain('putTest')
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const blogsAtStart = await blogsInDb()

    const testBlog = {
      title: 'notUpdating',
      author: 'notUpdating',
      url: 'notUpdating'
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(testBlog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const authors = blogsAtEnd.map(a => a.author)

    expect(authors).not.toContain(blogToDelete.author)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})