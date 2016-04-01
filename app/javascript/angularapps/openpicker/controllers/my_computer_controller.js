
MyComputerController = function($scope,$timeout,DataAccessService,$sce,$filter,$location,Upload,FileService) {
	var self = this;
	
	self.scope = $scope;
	self.timeout = $timeout;

	self.sce = $sce;
	self.location = $location;
	self.Upload = Upload;
	self.FileService = FileService;
 
	
	self.data_access_service = new DataAccessService();


	self.setupScopeMethods();
	
	self.initialize(); 

};

MyComputerController.prototype.setupScopeMethods = function() {
	var self = this;
	self.scope.uploadFiles = function (files) {
		console.log("Files are");
		console.log(files);
		for(var i = 0;i<files.length;i++){
			self.FileService.addFile(files[i]);
		}
		if(self.scope.options.conversions.length > 0 && files.length === 1) {
			self.location.path('/edit/image');
		} else {
			self.location.path('/upload');
		}
      
    }
};

MyComputerController.prototype.initialize = function() {
	var self = this;
	self.scope.channels = self.FileService.getChannels();
	self.scope.options = self.FileService.getOptions();
	console.log("Options are");
	console.log(self.scope.options);
	self.forceUpdateView();
};

MyComputerController.prototype.forceUpdateView = function(first_argument) {

	var self = this;
	self.timeout(function() {
		self.scope.$apply();
	});
};



app.controller('MyComputerController',MyComputerController);
		

