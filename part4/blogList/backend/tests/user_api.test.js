const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test.helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'first last', passwordHash: passwordHash })

    await user.save()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 1)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')

    const usernames = response.body.map(e => e.username)
    const names = response.body.map(e => e.name)
    assert(usernames.includes('root'))
    assert(names.includes('first last'))
  })

  describe('addition of a new user', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const createdUser = usersAtEnd.find(u => u.username === newUser.username)
      assert.ok(createdUser, 'User should exist in the database')
      assert.strictEqual(createdUser.username, newUser.username)
      assert.strictEqual(createdUser.name, newUser.name)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with missing username with status code 400 and proper error message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'John Watson',
        password: 'random',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.ok(result.body.error.includes('username: Path `username` is required.'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with missing password with status code 400 and proper error message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newuser',
        name: 'John Watson'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('password must be at least 3 characters long'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with username 2 characters', async () => {
      const newUser = {
        username: 'newuser',
        name: 'New User',
        password: 'pw'
      }

      const usersAtStart = await helper.usersInDb()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})