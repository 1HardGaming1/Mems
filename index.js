const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

let html;

let server = http.createServer(function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (req.url == '/jokes') {
		getAllJokes(req, res);
	}
	else  if(req.url == '/jokes' && req.method == 'POST'){
		addJokes(req, res);
	}
	else if (req.url.startsWith('/like')) {
		like(req, res);
	}
	else {
		res.writeHead(404, {'Content-Type':'text/html'});
		html = "<h3>Error 404 !!!</h3>"
		res.end(html);
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
 	let data;
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

function like(req, res) {
	let params = url.parse(req.url, true).query;
	let id = params.id;
	let dir = fs.readdirSync('data');
	let fileName = path.join('data', id+'.json');
	let file = fs.readFileSync(fileName);
	let jokeJson = file.toString();
	let joke = JSON.parse(jokeJson);
	joke.likes++;
	fs.writeFileSync(fileName, JSON.stringify(joke));
	res.end();
}

function dislike(req, res) {    
	let params = url.parse(req.url, true).query;
	let id = params.id;
	let dir = fs.readdirSync('data');
	let fileName = path.join('data', id+'.json');
	let file = fs.readFileSync(fileName);
	let jokeJson = file.toString();
	let joke = JSON.parse(jokeJson);
	joke.likes++;
	fs.writeFileSync(fileName, JSON.stringify(joke));
	res.end();
}