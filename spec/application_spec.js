describe("Application Server", function() {

	var application;
	
	beforeEach(function() {
		application = new Application();
	});

	describe("constructor()", function() {
		it("should be initialised with the expected values", function() {
      expect(application.hits).toEqual(0);
      expect(application.log).toEqual([]);
		});
	});
});
