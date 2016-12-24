var http = require('http');
var mod1 = require('./mod1');
var mod2 = require('./mod2');
var fs = require('fs');

var handleReq = function(req, res){
	res.writeHead(200, {'Content-Type' : 'text/html'});
	/*res.write("Hi madhuri");
	//from mod1
	mod1.myFunc();
	res.write(mod1.myQuote);
	//from mod2
	mod2.callName();
	res.write(mod2.writeText);*/

	fs.readFile('./index.html', null, function(err, data){
		if(err){
			res.writeHead(404);
			res.write('file not found');
		}else{
			res.write(data);
			res.end();
		}
	});


	
};
http.createServer(handleReq).listen('8100', function(){
	console.log("server started on port 8100");
});