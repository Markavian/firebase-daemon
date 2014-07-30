describe("Application Server", function() {

	var application;
	
	var http = { createServer: jasmine.createSpy('http.createServer') };
	var url = { parse: jasmine.createSpy('url.parse') };
	
	beforeEach(function() {
		application = new Application();
	});

	describe("constructor()", function() {
		it("should be initialised with the expected values", function() {
			expect(application.hits).toEqual(0);
			expect(application.log).toEqual([]);
			expect(application.routes).toEqual({});
		});
	});

	describe("init()", function() {
		beforeEach(function() {
			application.init(http, url);
		});
		
		it("should log a message about the server starting up", function() {
			expect(application.log[0]).toContain("Server started");
		});
		
		it("should store a reference to the url parser", function() {
			expect(application.url).toBe(url);
		});
		
		it("should create a server instance to handle requests", function() {
			expect(http.createServer).toHaveBeenCalledWith(application.handleRequest);
		});
		
		it("should register default routes", function() {
			expect(application.routes['/']).toBe(application.responseMain);
			expect(application.routes['/favicon.png']).toBe(application.response404);
		});
		
		it("should create a firebase daemon", function() {
			
		});
	});
});

