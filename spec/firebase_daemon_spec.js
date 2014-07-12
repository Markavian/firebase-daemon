describe("Firebase Daemon", function() {

	var firebase;
	var daemon;
	
	beforeEach(function() {
		var url = firebaseURL();
		firebase = new Firebase(url);
	});

	describe("listen()", function() {
		
		var expectedPath = 'path/to/listen-on/'
		
		beforeEach(function() {
			spyOn(firebase, 'child');
		});
	
		it("should register to listen on expected firebase node for changes", function() {
			
			var responder = function() { alert('Responder!'); };
			
			expect(firebase.child).toHaveBeenCalledWith(expectedPath);
			expect(firebase.child(expectedPath).on).toHaveBeenCalledWith('value', responder);
			
		});
	});
  
});
