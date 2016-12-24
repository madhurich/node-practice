var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', myVal: false });
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Users Page'});
});

router.get('/users/details', function(req, res, next) {
  res.send('user details page');
});

module.exports = router;
