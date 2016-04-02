
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
	self.scope.uploadFiles = function () {
		self.FileService.clearFiles();

		var files = self.scope.files
		self.scope.limitExceeded = false;
		for(var i = 0;i<files.length;i++){
			if(files[i].size > self.scope.limits.maxSize || files[i].size < self.scope.limits.minSize){
				self.scope.limitExceeded = true;
				self.scope.files = [];
				break;
			} else {
				self.FileService.addFile(files[i]);
			}
		}

		if(self.scope.limitExceeded === false) {
			if(self.scope.options.conversions.length > 0 && files.length === 1) {
				self.location.path('/edit/image');
			} else {
				self.location.path('/upload');
			}
		}	
		self.forceUpdateView();
      
    }
};

MyComputerController.prototype.initialize = function() {
	var self = this;
	self.scope.channels = self.FileService.getChannels();
	self.scope.options = self.FileService.getOptions();
	self.scope.limits = self.FileService.getLimits();
	self.scope.files = [];
	self.forceUpdateView();
};

MyComputerController.prototype.forceUpdateView = function(first_argument) {

	var self = this;
	self.timeout(function() {
		self.scope.$apply();
	});
};



app.controller('MyComputerController',MyComputerController);
		

