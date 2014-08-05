var FirebaseDaemon = (function() {
	
	var Class = function () {
		this.init.apply(this, arguments);
	};
	
	Class.prototype.init = function(firebase) {
		this.firebase = firebase;
		this.updates = 0;
		
		this._configs = [];
	}
	
	Class.prototype.errors = {
		NO_PATH : "Invalid config: no path set",
		NO_MATCHER : "Invalid config: no matcher set",
		NO_TARGETS : "Invalid config: no targets set"
	}
	
	Class.prototype.report = function() {
		return {
			"updates": this.updates
		};
	};
	
	Class.prototype.addConfig = function(config) {
		if(!config.path) throw new Error(this.errors.NO_PATH);
		if(!config.matcher) throw new Error(this.errors.NO_MATCHER);
		if(!config.targets && !(config.targets instanceof Array)) throw new Error(this.errors.NO_TARGETS);
		
		this._configs.push(config);
	}
	
	Class.prototype.listConfigs = function() {
		return this._configs;
	}
	
	Class.prototype.listen = function(path) {
		this.firebase.child(path).on('value', this.handleResponse);
		this.log("Listening on path: " + path);
	};
	
	Class.prototype.handleResponse = function(snapshot) {
		// TODO: Read instructions from queue
		var queue = snapshot.val();
		
		this.log("Queue size: " + queue.length);
		
		var configs = this.listConfigs();
		
		// TODO: Write monitored value to new locations
		this.writeResponse('x', 'y');
	};
	
	Class.prototype.writeResponse = function(path, value) {
		this.updates++;
	}
	
	Class.prototype.log = function(message) {
		if(this._logger) {
			this._logger(message);
		}
	}
	
	Class.prototype.logTo = function(callback) {
		this._logger = callback;
	}
	
	return Class;
	
})();

if(!module.exports) module.exports = {};
module.exports.FirebaseDaemon = FirebaseDaemon;