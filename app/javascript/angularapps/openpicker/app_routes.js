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
        .when('/channels/web_link', {
            templateUrl : 'template_web_link',
            controller : 'WebLinkController'
        })
        .when('/edit/image', {
            templateUrl : 'template_image_edit',
            controller  : 'ImageEditController'
        })
        .when('/upload', {
            templateUrl : 'template_upload',
            controller  : 'UploadController'
        })        
        .when('/fetched_image_preview', {
            templateUrl : 'template_fetched_image_preview',
            controller  : 'FetchedImagePreviewController'
        })
        .otherwise({
        	redirectTo: '/'
      	});
});


