const express = require('express')

const router = express.Router();

const postDb = require('./postDb')

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json({
        posts
      })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params

  postDb.getById(id)
    .then(post => {
      res.status(200).json({
        post
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The post could not be retrived from the database'
      })
    })


});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;