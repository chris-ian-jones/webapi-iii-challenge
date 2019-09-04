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
        error: 'The posts could not be retirbved from the database'
      })

    })
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

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
