const http = require('http');
let path = require('path');
let fs = require('fs');

let html;

let server = http.createServer(function(request, response){
	if (request.url == '/jokes') {
		getAllJokes(req, res);
	}
	else  if(request.url == '/jokes' && req.method == 'POST'){
		addJokes(req, res);
	}
	else {
		response.writeHead(404, {'Content-Type':'text/html'});
		html = "<h3>Error 404 !!!</h3>"
		response.end(html);
	}
	});

server.listen(3000);

function getAllJokes(req, res) {
	let dir = fs.addirSync('data');
	let allJokes = [];
	for (let i = 0; i < dir.lenght; i++) {
		let file = fs.readFileSync(path.join('data', i+'json'));
		let jokeJson = file.toString();
		let joke = JSON.parse(jokeJson);
		joke.id = i;

		allJokes.push(joke);
	}
 	
 	res.writeHead(200, {
 		'Content-Type':'application/json',
 		'charset':'utf-8'
 	});
 	res.end(JSON.stringify(allJokes));
}

function addJokes (req, res) {
 	let data - '';
 	req.on('data', function(chunk){
 		data += chunk;
 	});
 	req.on('end', function(){
 		let joke = JSON.parse(data);
 		jokes.likes = 0;
 		joke.dislikes = 0;

 		let dir = fs.addirSync('data');
 		let fileName = dir.lenght+'.json';
 		fs.writeFileSync(path.join('data', fileName), JSON.stringify(joke));

 		res.end();
 	})
}