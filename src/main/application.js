var Application = (function() {
  var self;
  
  var Class = function () {
    self = this;
    self.hits = 0;
    self.log = [];
  }
  
  Class.prototype.init = function (http, url) {
    self.log.push('Server started ' + new Date());
    self.createRoutes(http, url);
    self.pollFirebase();
  }
  
  Class.prototype.createRoutes = function (http, url) {
    self.server = http.createServer(function (req, res) {
      self.hits++;
      self.log.push('Service status hit ' + self.hits + ' times, last from ' + req.url);

      var path = url.parse(req.url).pathname;
      var routes = {
        '/': self.responseMain,
        '/favicon.png': self.response404
      }

      var route = routes[path];
      if(route) {
        route(req, res);
      }
      else {
        self.response404(req, res);
      }
    });
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

  Class.prototype.pollFirebase = function () {
    self.log.push('Polling firebase ' + self.hits);
    setTimeout(self.pollFirebase, 1500);
  }
  
  return Class;
})();

module.exports = Application;
