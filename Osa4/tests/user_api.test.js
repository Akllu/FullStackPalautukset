const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('Initialized users', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are saved to database', async () => {
    const users = await usersInDb()

    expect(users).toHaveLength(initialUsers.length)
  })
})

describe('Addition of a new user', () => {
  test('wont be added to database if username is shorter than 3 chars', async () => {

    const newUser = {
      username: 'te',
      name: 'test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('wont be added to database if password is shorter than 3 chars', async () => {

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'te'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})