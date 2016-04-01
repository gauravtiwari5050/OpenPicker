// configure our routes
app.config(function($routeProvider) {
    $routeProvider
    	// route for the home page
        .when('/', {
            templateUrl : '/templates/primary.html.ejs',
            controller  : 'PrimaryController'
        })
        .when('/channels/my_computer', {
            templateUrl : '/templates/my_computer.html.ejs',
            controller  : 'MyComputerController'
        })
        .when('/edit/image', {
            templateUrl : '/templates/image_edit.html.ejs',
            controller  : 'ImageEditController'
        })
        .when('/upload', {
            templateUrl : '/templates/upload.html.ejs',
            controller  : 'UploadController'
        })
        .otherwise({
        	redirectTo: '/'
      	});
});


