const express = require('express')

const router = express.Router();

const userDb = require('./userDb')
const postDb = require('./../posts/postDb')

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
    .then(user => {
      res.status(201).json({
        user
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'There was an error saving the new user to the database'
      })
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { id } = req.params

  const newPost = {
    text: req.body.text,
    user_id: parseInt(id)
  }

  postDb.insert(newPost)
    .then(createdPost => {
      res.status(201).json({
        createdPost
      })
    })
    .catch(error => {
      res.status(5000).json({
        error: 'The new post could not be created in the database'
      })
    })
})

router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json({
        users
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The users could not be retrieved from the database'
      })
    })
})

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params

  userDb.getById(id)
    .then(user => {
      res.status(200).json({
        user
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The user could not be retrieved from the database'
      })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params

  userDb.getUserPosts(id)
    .then(posts => {
      res.status(200).json({
        posts
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'Could not retrieve that users posts'
      })
    })
})

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params

  userDb.remove(id)
    .then(deletedUser => {
      res.status(200).json({
        message: 'User has been deleted'
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: `Could not delete user from database`
      })
    })
})

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params

  userDb.update(id, req.body)
    .then(updatedUser => {
      res.status(200).json({
        message: `Users name has been updated`
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'Could not update the user in the database'
      })
    })
})

// Custom middleware

// validateUserId validates the user id on every request that expects a user id parameter
function validateUserId(req, res, next) {
  const { id } = req.params

  userDb.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({
          message: 'invalid user id'
        })
      } else {
        next()
      }
    })
}

// validateUser validates the body on a request to create a new user
// when using express.json() middleware, an empty request body will resolve to an empty object
// using the Object.keys() method to return an array of the (request body's) object's keys and check if array is empty
function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'missing user data'
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    next()
  }
}

// validatePost validates the body on a request to create a new post
// see comment for function above
function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'missing post data'
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    next()
  }
}

module.exports = router;