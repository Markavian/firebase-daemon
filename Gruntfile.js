module.exports = function(grunt) {
  
  // load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
	  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
	"uglify": {
	  options: {
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	  },
	  "build daemon": {
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Running the app
  grunt.registerTask('server', 'Start application as web server', function() {
	
	var server_port = process.env.FIREBASEDAEMON_NODEJS_PORT || 3000;
    var server_ip_address = process.env.FIREBASEDAEMON_NODEJS_IP || '';
	  
	var done = this.async();
	
	require('./bin/daemon.min.js').listen(server_port, server_ip_address, function() {
		grunt.log.write('Server started on http://' + server_ip_address + ':' + server_port + ' /, end this process to stop.\n');
	});
	
  });

  // Default tasks.
  grunt.registerTask('default', ['uglify', 'jasmine', 'server']);
};
