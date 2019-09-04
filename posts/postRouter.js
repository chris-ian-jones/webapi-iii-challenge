const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Api for /api/posts is working...')
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;