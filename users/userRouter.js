const express = require('express')

const router = express.Router();

const db = require('./userDb')

function validateUserId(req, res, next) {
  if (!req.id) {
    res.status(400).json({
      message: 'invalid user id'
    })
  }
  next();
}

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

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
});

router.get('/:id', (req, res) => {
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
});

router.get('/:id/posts', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(deletedUser => {
      res.status(200).json({
        deletedUser
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: `Could not delete user`
      })
    })
});

router.put('/:id', (req, res) => {
  
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
