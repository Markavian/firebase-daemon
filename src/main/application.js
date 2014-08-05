var Application = (function() {
  
  var self;
  
  var Class = function () {
    self = this;
    self.hits = 0;
    self._log = [];
	self.routes = {};
	self.url = null;
	self.daemon = null;
  }
  
  Class.prototype.init = function (http, url) {
    self.log('Server started ' + new Date());
	self.url = url;
    self.registerDefaultRoutes(http);
  }
  
  Class.prototype.registerDefaultRoutes = function (http) {
	self.routes['/'] = self.responseMain;
	self.routes['/status'] = self.responseStatus;
	self.routes['/favicon.png'] = self.response404;
	
    self.server = http.createServer(self.handleRequest);
  }
  
  Class.prototype.handleRequest = function (req, res) {
	self.hits++;
	self.log('Service status hit ' + self.hits + ' times, last from ' + req.url);

	var path = self.url.parse(req.url).pathname;

	var route = self.routes[path];
	if(route) {
	  route(req, res);
	}
	else {
	  self.response404(req, res);
	}
  }

  Class.prototype.responseMain = function (req, res) {
    res.writeHead(301, {
	  'Content-Type': 'text/plain',
	  'Location': 'status'
	});
	res.write("Application running, redirecting to status page...\n");
    res.end();
  }
  
  Class.prototype.responseStatus = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("Application status: \n");
	res.write("=================== \n");
    res.write(self._log.join('\n'));
    res.end();
  }

  Class.prototype.response404 = function (req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('File not found: ' + req.url);
    res.end();
  }

  Class.prototype.log = function (message) {
    self._log.push(message);
  }
  
  return Class;
})();

if(!module.exports) module.exports = {};
module.exports.Application = Application;
