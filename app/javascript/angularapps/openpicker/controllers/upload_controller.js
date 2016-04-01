
UploadController = function($scope,$timeout,DataAccessService,$sce,$filter,$location,Upload,FileService) {
	var self = this;
	
	self.scope = $scope;
	self.timeout = $timeout;

	self.sce = $sce;
	self.location = $location;
	self.Upload = Upload;
	self.FileService = FileService;

	self.setupScopeMethods();
	
	self.initialize(); 

};

UploadController.prototype.setupScopeMethods = function() {
	var self = this;
};

UploadController.prototype.initialize = function() {
	var self = this;
	var self = this;
	self.scope.channels = self.FileService.getChannels();
	self.scope.options = self.FileService.getOptions();
	self.scope.files = self.FileService.getFiles();
	self.uploadFiles();
	self.forceUpdateView();
   
};

UploadController.prototype.uploadFiles = function() {
	var self = this;
	async.eachSeries(
		self.scope.files,
		function(file,callback) {
			self.Upload.upload({
            url: '/upload',
            data: {file: file.content}
        }).then(function (resp) {
        	file.status ="Uploaded";
        	self.forceUpdateView();
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            console.log(resp.data);
            file.server_response = resp.data;
            file.server_response.url = window.location.origin +  "/" + file.server_response.path;
            callback(null);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            file.status= "Errored";
            self.forceUpdateView();
            callback(null);
        }, function (evt) {

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            file.progress = progressPercentage;
            self.forceUpdateView();
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
		},
		function(){
			console.log("Done Uploading all the files");
			var results = [];
			for(var i = 0;i< self.scope.files.length ; i++){
				results.push(self.scope.files[i].server_response);
			}
			self.sendResults(results);

		}
	);
};
UploadController.prototype.sendResults = function(files) {
	var self = this;
	var messageObject = {
		category : "RESULT",
		data : files
	}
	parent.postMessage(messageObject,"*");
};
UploadController.prototype.forceUpdateView = function() {

	var self = this;
	self.timeout(function() {
		self.scope.$apply();
	});
};



app.controller('UploadController',UploadController);
		

