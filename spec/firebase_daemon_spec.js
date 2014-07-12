describe("Firebase Daemon", function() {

	var firebase;
	var daemon;
	
	beforeEach(function() {
		var url = firebaseURL();
		firebase = new Firebase(url);
		daemon = new FirebaseDaemon(firebase);
	});

	describe("construtor()", function() {
		it("should be initialised with the expected values", function() {
			expect(daemon.updates).toEqual(0);
		});
		it("should store a reference to the firebase parameter", function() {
			expect(daemon.firebase).toEqual(firebase);
		});
	});

	describe("report()", function() {
		it("should return the expected report", function() {
			expect(daemon.report()).toEqual({updates: 0});
		});
	});
	
	describe("addConfig() and listConfigs()", function() {
		
		var result = null;
		var validConfig = {
			'path': 'path/to/listen-on/',
			'matcher': 'some/data/structure/values/*',
			'targets': [
				'first/path/to/write/to/',
				'second/path/to/write/to/'
			]
		};
		var invalidPathConfig = {
		};
		var invalidMatcherConfig = {
			'path': 'some path'
		};
		var invalidTargetsConfig = {
			'path': 'some path',
			'matcher': 'some matcher'
		};
		
		beforeEach(function() {
			result = daemon.listConfigs();
		});
		
		it("should return an empty array by default", function() {
			expect(result).toEqual([]);
		});
		
		it("should return a configuration if a valid configuration has been added", function() {
			daemon.addConfig(validConfig);
			expect(result).toEqual([validConfig]);
		});
		
		it("should throw errors for invalid configs", function() {
			expect(function() { daemon.addConfig(invalidPathConfig) }).toThrow(new Error("Invalid config: no path set"));
			expect(function() { daemon.addConfig(invalidMatcherConfig) }).toThrow(new Error("Invalid config: no matcher set"));
			expect(function() { daemon.addConfig(invalidTargetsConfig) }).toThrow(new Error("Invalid config: no targets set"));
			expect(result).toEqual([]);
		});
	});

	describe("listen()", function() {
		var mockChild = { "on": jasmine.createSpy('child.on') };
		var expectedPath = 'path/to/listen-on/'
		
		beforeEach(function() {
			spyOn(firebase, 'child').and.returnValue(mockChild);
			
			daemon.listen(expectedPath);
		});
	
		it("should register to listen on expected firebase node for changes", function() {
			expect(firebase.child).toHaveBeenCalledWith(expectedPath);
			expect(mockChild.on).toHaveBeenCalledWith('value', daemon.handleResponse);
		});
	});

	describe("handleResponse()", function() {
		var snapshotStructure = {
			"some": {
				"data": {
					"structure": {
						"values": [
							"beacon1",
							"beacon2",
							"beacon3"
						]
					}
				}
			}
		};
		var mockSnapshot = {"val": jasmine.createSpy('snapshot.val').and.returnValue(snapshotStructure)};
		var mockTargetChildren = {"target/data/structure/beacon1": true, "target/data/structure/beacon2": true};
		var mockTarget = {
			"hasChild": function(path) { 
				return mockTargetChildren[path];
			}
		};
		
		beforeEach(function() {
			spyOn(daemon, 'writeResponse');
			spyOn(daemon, 'listConfigs').and.callThrough();
			spyOn(mockTarget, 'hasChild').and.callThrough();
			daemon.handleResponse(mockSnapshot);
		});
	
		it("should test values in path based against configurations", function() {
			expect(mockSnapshot.val).toHaveBeenCalled();
			expect(daemon.listConfigs).toHaveBeenCalled();
			
			expect(mockTarget.hasChild).toHaveBeenCalledWith("target/data/structure/beacon1");
			expect(mockTarget.hasChild).toHaveBeenCalledWith("target/data/structure/beacon2");
			expect(mockTarget.hasChild).toHaveBeenCalledWith("target/data/structure/beacon3");
			pending();
		});
	
		it("should write missing values to configuration target", function() {
			expect(daemon.writeResponse).toHaveBeenCalledWith('path/to/write/to/', 'beacon3');
			pending();
		});
	});
	
	describe("writeResponse()", function() {
		beforeEach(function() {
			daemon.writeResponse("x", "y");
		});
		
		it("should increment the updates counter for each written response", function() {
			expect(daemon.updates).toEqual(1);
			
			for(var i=0; i<10; i++) {
				daemon.writeResponse("x", "y");
			}
			expect(daemon.updates).toEqual(11);
		});
		
		it("should write data to the firebase instance", function() {
			pending();
		});
	});
  
});
