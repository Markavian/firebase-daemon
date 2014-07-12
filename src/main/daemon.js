var FirebaseDaemon = (function() {
	
	var Class = function (firebase) {
		this.firebase = firebase;
		this.updates = 0;
	};
	
	Class.prototype.report = function() {
		return {
			"updates": this.updates
		};
	};
	
	Class.prototype.listen = function(path) {
		this.firebase.child(path).on('value', this.handleResponse);
	};
	
	Class.prototype.handleResponse = function(snapshot) {
		// TODO: Monitor specific value for changes
		// TODO: Write monitored value to new locations
	};
	
	return Class;
	
})();

