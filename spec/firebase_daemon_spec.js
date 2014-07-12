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
  
});
