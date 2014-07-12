var hits = 0;
var log = [];
log.push('Server started ' + new Date());

var http = require('http');
var url = require('url');

server = http.createServer(function (req, res) {
  hits++;
  log.push('Service status hit ' + hits + ' times, last from ' + req.url);
  
  var path = url.parse(req.url).pathname;
  var routes = {
	'/': responseMain,
	'/favicon.png': response404
  }
  
  var route = routes[path];
  if(route) {
	route(req, res);
  }
  else {
	response404(req, res);
  }
  
});

function responseMain (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(log.join('\n'));
  res.end();
}

function response404 (req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('File not found: ' + req.url);
  res.end();
}

function pollFirebase() {
	log.push('Polling firebase ' + hits);
	setTimeout(pollFirebase, 1500);
}

pollFirebase();

module.exports = server;