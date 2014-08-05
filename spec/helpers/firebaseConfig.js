var firebaseURL = function() { return 'https://burning-fire-3352.firebaseio.com/' };

var firebaseDataset = function(index) {
	switch(index) {
		case 1:
			return {
				harness: {
					queue: [ ],
					beacons: {
						"B50123" : { "users": [ "anna", "john", "sean", "loui" ] },
						"B20127" : { "users": [ "anna", "sean", "loui" ] },
						"B80129" : { "users": [ "john", "sean", "loui" ] },
						"B10130" : { "users": [ "anna", "loui" ] },
						"B45690" : { "users": [ "john", "sean" ] }
					},
					users: {
						"anna": { uid: "anna", updates: [] },
						"john": { uid: "john", updates: [] },
						"sean": { uid: "sean", updates: [] },
						"loui": { uid: "loui", updates: [] }
					}
				}
			};
			
		case 2:
			return [
				{ task: "signal users", beacon: "B50123" },
				{ task: "signal users", beacon: "B20127" },
				{ task: "signal users", beacon: "B80129" },
				{ task: "signal users", beacon: "B10130" },
				{ task: "signal users", beacon: "B45690" }
			];
			
		default: 
			return {};
	}
}
