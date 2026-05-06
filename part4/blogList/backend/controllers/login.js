const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// When a user signs in, the browser sends a post request to /api/login
// with his/her username and password.
// The backend verifies the user and sends back a token if the user has
// been successfully verified.
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter