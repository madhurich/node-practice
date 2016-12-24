var fs = require('fs');
var url = require('url');


function renderView(url_path, res){
		fs.readFile(url_path, null, function(err, data){
			if(err){
				res.writeHead(404);
				res.write('page not found');
			}else{
				res.write(data);
				res.end();
			}
		});
}

module.exports = {
	handleReq: function(req, res){
		res.writeHead(200, {'Content-Type':'text/html'});

		var path = url.parse(req.url).pathname;
		switch(path){
			case '/':
				renderView('./index.html', res);
				break;
			case '/login':
				renderView('./login.html', res);
				break;
			default:
				res.write('url not found', res);
				res.end(); //don't forget to end the response else the page
				//will be going on loading when it is the wrong url.
				break;		
		}
	}
};