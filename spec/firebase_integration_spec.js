describe("Firebase Integration", function() {
	
	var url = firebaseURL();
	var firebase = new Firebase(url);
	
	beforeEach(function() {
		
	});
	
	describe("simple operational tests for firebase", function() {
		
		it("should write data to the firebase instance", function(done) {
			var dataset = firebaseDataset(1);
			firebase.set(dataset, function(error) {
				if (error) {
					throw ("Data could not be saved. " + error);
				}
				done();
			});
		});
		
		it("should be able to push items to a queue", function(done) {
			var dataset = firebaseDataset(2);
			for(key in dataset) {
				var entry = dataset[key];
				firebase.child("harness/queue").push(entry);
			}
			done();
		});
		
		it("should be able to remove an item from a queue", function(done) {
			firebase.once('child_added', function(snapshot) {
				var values = snapshot.val();
				
				var keys = [];
				for(var key in values.queue) { 
					keys.push(key);
				}
				
				var keyToRemove = keys[2]; /* pick the third */
				var lastChild = firebase.child("harness/queue/" + keyToRemove);
				lastChild.remove(function(error) {
					if (error) {
						throw ("Value could not be removed. " + error);
					}
					done();
				});
			});
		});
		
		it("should read the data from firebase and log to the console", function(done) {
			firebase.once('child_added', function(snapshot) {
				var values = snapshot.val();
				console.log(values);
			});
			done();
		});
	}); 
});
