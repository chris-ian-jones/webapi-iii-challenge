require('dotenv').config()

const express = require('express')

const usersRoutes = require('./users/userRouter')
const postsRoutes = require('./posts/postRouter')

const server = express()

server.use(express.json())

// global/application wide middleware to be used on every endpoint
server.use(logger)

// on each request this middleware console logs: timestamp, request method & request url
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  )
  next()
}

server.use('/api/users', usersRoutes)
server.use('/api/posts', postsRoutes)

// SECRET_MESSAGE is defined on Heroku under 'Config Vars' in settings
server.use('/', (req, res) => res.send(process.env.SECRET_MESSAGE))

const port = process.env.PORT || 7777

server.listen(port, () => console.log(`\n ** API on port ${port} **\n`))