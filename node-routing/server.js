var http = require('http');
var app = require('./app');

http.createServer(app.handleReq).listen('8200', function(){
	console.log('server started on port 8200');
});