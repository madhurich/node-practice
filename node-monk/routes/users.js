var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/employees');
var myUsers = db.get('myusers');

router.get('/', function(req, res, next){
	res.render('users');
});

router.get('/', function(req, res, next){
	var allUsers = myUsers.find({});
	allUsers.on('success', function(someusers){
		console.log(someusers);
		res.render('users', {getUsers: someusers});
		//res.redirect('/users');
	});
});

router.post('/create', function(req, res, next){
	var newUser = {
		username: req.body.username,
		age: req.body.age,
		hobby: req.body.hobby
	};

	myUsers.insert(newUser);
	res.redirect('/users');

});

router.post('/update', function(req, res, next){
	var newUser = {
		username: req.body.username,
		age: req.body.age,
		hobby: req.body.hobby
	};

	var id = req.body.id;

	//myUsers.update({'id': db.id(id)}, newUser);//this is anotehr method where 
	//we convert the id to object id
	myUsers.updateById(id, newUser);
	res.redirect('/users');


});

router.post('/delete', function(req, res, next){
	
	var id = req.body.id;

	//myUsers.remove({'id': db.id(id)});//another method to remove
	myUsers.removeById(id);
	res.redirect('/users');

});
module.exports = router;