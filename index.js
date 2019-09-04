const express = require('express')

const usersRoutes = require('./users/userRouter')
const postsRoutes = require('./posts/postRouter')

const server = express()

server.use(express.json())
server.use(logger)

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.headers.host}`
  )
  next()
}

server.use('/api/users', usersRoutes)
server.use('/api/posts', postsRoutes)

server.use('/', (req, res) => res.send('Api is working...'))

const port = 7777

server.listen(port, () => console.log(`\n ** API on port ${port} **\n`))