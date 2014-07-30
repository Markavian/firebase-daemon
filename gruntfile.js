module.exports = function(grunt) {
  
  /* Load grunt plugins */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
	  
  /* Project configuration */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    "uglify" : {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      "build daemon" : {
        files: {
          'bin/daemon.min.js': ['src/**/*.js']
        }
      }
    },
	
    "jasmine" : {
      "firebase daemon template": {
        src: 'src/main/**/*.js',
        options: {
          specs: ['spec/**/*spec.js'],
          helpers: ['spec/helpers/*.js'],
          vendor: [
            'https://cdn.firebase.com/js/client/1.0.17/firebase.js',
          'https://cdn.firebase.com/js/simple-login/1.6.1/firebase-simple-login.js'
          ],
          keepRunner: true,
          outfile: 'bin/SpecRunner.html'
        }
	  }
	}
  });

  /* Harness to run the app as a node.js server */
  grunt.registerTask('server', 'Start application as web server', function() {
	
    /* Environment variables */
	  var server_port = process.env.FIREBASEDAEMON_NODEJS_PORT || 3000;
    var server_ip_address = process.env.FIREBASEDAEMON_NODEJS_IP || '';
    
    /* External require dependencies */
    var http = require('http');
    var url = require('url');
      
    /* Create a thread to hold the server process */
    var thread = this.async();
    
    /* Create and run the application */
    var application = new (require('./bin/daemon.min.js'));
    application.init(http, url);
    application.server.listen(server_port, server_ip_address, function() {
      
      /* Report that the server has started */
      var server_name = (server_ip_address != '') ? server_ip_address : 'localhost';
	  	var server_url = 'http://' + server_name + ':' + server_port + '/';
      grunt.log.write('Server started on ' + server_url + ', end this process to stop.\n');

      /* Kill the server process after a period of time */
      grunt.log.write("Server in debug mode, will automatically shut down in 30 seconds.\n")
      setTimeout(function(end) {
        grunt.log.write("Server thread stopping.");
        end();
      }, 30000, thread)
      
	  });
	  
  });

  /* Default tasks */
  grunt.registerTask('default', ['uglify', 'jasmine', 'server']);
};
