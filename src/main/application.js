var Application = (function() {
  
  var self;
  
  var Class = function () {
    self = this;
    self.hits = 0;
    self.log = [];
	self.routes = {};
	self.url = null;
	self.daemon = null;
  }
  
  Class.prototype.init = function (http, url) {
    self.log.push('Server started ' + new Date());
	self.url = url;
    self.registerDefaultRoutes(http);
    self.createDaemon();
  }
  
  Class.prototype.registerDefaultRoutes = function (http) {
	self.routes['/'] = self.responseMain;
	self.routes['/favicon.png'] = self.response404;
	
    self.server = http.createServer(self.handleRequest);
  }
  
  Class.prototype.handleRequest = function (req, res) {
	self.hits++;
	self.log.push('Service status hit ' + self.hits + ' times, last from ' + req.url);

	var path = self.url.parse(req.url).pathname;

	var route = routes[path];
	if(route) {
	  route(req, res);
	}
	else {
	  self.response404(req, res);
	}
  }

  Class.prototype.responseMain = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(self.log.join('\n'));
    res.end();
  }

  Class.prototype.response404 = function (req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('File not found: ' + req.url);
    res.end();
  }

  Class.prototype.createDaemon = function () {
    self.log.push('Creating firebase daemon ' + self.hits);
    self.daemon = new FirebaseDaemon();
  }
  
  return Class;
})();

module.exports = Application;
