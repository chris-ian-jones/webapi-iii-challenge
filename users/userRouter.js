const express = require('express')

const router = express.Router();

const db = require('./userDb')

router.post('/', (req, res) => {
  db.insert(req.body)
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

router.post('/:id/posts', validateUserId, (req, res) => {

})

router.get('/', (req, res) => {
  db.get()
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

  db.getById(id)
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

  db.getUserPosts(id)
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

  db.remove(id)
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

  db.update(id, req.body)
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

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params

  db.getById(id)
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

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {

}

module.exports = router;
