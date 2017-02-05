var express = require('express');
// get an instance of router
var router = express.Router();

/* GET users listing. */
router.get('/user1', function(req, res, next) {
  res.send('respond with a user 1 resource');
});

router.get('/user2', function(req, res, next) {
  res.send('respond with a user 2 resource');
});

// route with parameters (http://localhost:3000/pages/anyname)
router.get('/:name', function(req, res, next) {
  res.send('hello ' + req.params.name + '!');
});

module.exports = router;
