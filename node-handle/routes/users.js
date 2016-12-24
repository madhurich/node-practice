var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost/employees';

router.get('/', function(req, res, next){
	var usersHere = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('myusers').find();
		cursor.forEach(function(users, err){//swapped the parameters then worked??
			assert.equal(null, err);
			usersHere.push(users);
		}, function(){
			db.close();
			res.render('users', {getUsers: usersHere});
		});
	});

	
});

router.post('/create', function(req, res, next){
	var newUser = {
		username: req.body.username,
		age: req.body.age,
		hobby: req.body.hobby
	};

	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('myusers').insertOne(newUser, function(err, users){
			assert.equal(null, err);
			console.log('user created');
			db.close();
			res.redirect('/users');
		});
	});

});

router.post('/update', function(req, res, next){
	var newUser = {
		username: req.body.username,
		age: req.body.age,
		hobby: req.body.hobby
	};

	var id = req.body.id;

	mongo.connect(url, function(err, db){//$set is not working?
		assert.equal(null, err);
		db.collection('myusers').updateOne({_id: objectId(id)}, {$set: newUser}, function(err, users){
			assert.equal(null, err);
			console.log('user updated');
			db.close();
			res.redirect('/users');
		});
	});

});

router.post('/delete', function(req, res, next){
	
	var id = req.body.id;

	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('myusers').deleteOne({_id: objectId(id)}, function(err, users){
			assert.equal(null, err);
			console.log('user deleted');
			db.close();
			res.redirect('/users');
		});
	});

});
module.exports = router;