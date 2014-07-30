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
		"A" : "Invalid config: no path set",
		"B" : "Invalid config: no matcher set",
		"C" : "Invalid config: no targets set"
	}
	
	Class.prototype.report = function() {
		return {
			"updates": this.updates
		};
	};
	
	Class.prototype.addConfig = function(config) {
		if(!config.path) throw new Error(this.errors.A);
		if(!config.matcher) throw new Error(this.errors.B);
		if(!config.targets && !(config.targets instanceof Array)) throw new Error(this.errors.C);
		
		this._configs.push(config);
	}
	
	Class.prototype.listConfigs = function() {
		return this._configs;
	}
	
	Class.prototype.listen = function(path) {
		this.firebase.child(path).on('value', this.handleResponse);
	};
	
	Class.prototype.handleResponse = function(snapshot) {
		// TODO: Monitor specific value for changes
		var values = snapshot.val();
		
		var configs = this.listConfigs();
		
		// TODO: Write monitored value to new locations
		this.writeResponse('x', 'y');
	};
	
	Class.prototype.writeResponse = function(path, value) {
		this.updates++;
	}
	
	return Class;
	
})();

