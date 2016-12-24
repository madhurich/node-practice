var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express', 
  	myVal: req.session.myVal, 
  	myarr: ["mad", 1, false], 
  	errors: req.session.errors});

  req.session.myVal = null;
  req.session.errors = null;
});

router.get('/test/:id', function(req, res, next) {
  res.render('test', {output: req.params.id});
});

router.post('/test/submit', function(req, res, next) {
	var id = req.body.id;
  res.redirect('/test/'+ id);
});

router.post('/test/login', function(req, res, next){
	//checking for validation
	req.check('email', 'email invalid').isEmail();
	req.check('password', 'password not matched').isLength({min:6}).equals(req.body.confirmPassword);

	//this req.validationErrors() returns an array of objects containing 
	//these error messages, inside of a property called "msg"
	var errors = req.validationErrors();

	if(errors){
		req.session.errors = errors;
		req.session.myVal = false;
		console.log(errors);
	}else{
		req.session.myVal = true;
	}
	res.redirect('/');
});


module.exports = router;
