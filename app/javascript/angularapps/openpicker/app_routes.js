// configure our routes
app.config(function($routeProvider) {
    $routeProvider
    	// route for the home page
        .when('/', {
            templateUrl : 'template_primary',
            controller  : 'PrimaryController'
        })
        .when('/channels/my_computer', {
            templateUrl : 'template_my_computer',
            controller  : 'MyComputerController'
        })
        .when('/edit/image', {
            template : 'template_image_edit',
            controller  : 'ImageEditController'
        })
        .when('/upload', {
            templateUrl : 'template_upload',
            controller  : 'UploadController'
        })
        .otherwise({
        	redirectTo: '/'
      	});
});


