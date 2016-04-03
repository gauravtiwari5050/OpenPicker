
UploadController = function($scope,$timeout,DataAccessService,$sce,$filter,$location,Upload,OptionsService,LogService) {
	var self = this;
	
	self.scope = $scope;
	self.timeout = $timeout;

	self.sce = $sce;
	self.location = $location;
	self.Upload = Upload;
	self.OptionsService = OptionsService;
	self.logger = new LogService();

	self.setupScopeMethods();
	
	self.initialize(); 

};

UploadController.prototype.setupScopeMethods = function() {
	var self = this;
	self.scope.getFileIcon = function(file){
		if(file.content.type.match(/.(?:jpe?g|png|gif)$/i)){
			return "file-image-o";
		} else if(file.content.type.match(/video\/*/i)) {
			return "file-video-o";
		} else if(file.content.type.match(/audio\/*/i)) {
			return "file-audio-o";
		} else if(file.content.type.match(/xls*/i)) {
			return "file-excel-o";
		} else if(file.content.type.match(/zip|7z/i)) {
			return "file-zip-o";
		} else if(file.content.type.match(/doc/i)) {
			return "file-word-o";
		} else if(file.content.type.match(/ppt/i)) {
			return "file-powerpoint-o";
		} else if(file.content.type.match(/pdf/i)) {
			return "file-pdf-o";
		} else {
			return "file-o"
		}
	}
};

UploadController.prototype.initialize = function() {
	var self = this;
	var self = this;
	self.scope.channels = self.OptionsService.getChannels();
	self.scope.options = self.OptionsService.getOptions();
	self.scope.files = self.OptionsService.getFiles();
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
            data: {file: file.content},
            headers: {'x-csrf-token':$('meta[name=csrf]').attr("content")}
        }).then(function (resp) {
        	file.status ="Uploaded";
        	self.forceUpdateView();
            self.logger.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            self.logger.log(resp.data);
            file.server_response = resp.data;
            file.server_response.url = window.location.origin +  "/" + file.server_response.path;
            callback(null);
        }, function (resp) {
            self.logger.log('Error status: ' + resp.status);
            file.status= "Errored";
            self.forceUpdateView();
            callback(null);
        }, function (evt) {

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            file.progress = progressPercentage;
            self.forceUpdateView();
            self.logger.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
		},
		function(){
			self.logger.log("Done Uploading all the files");
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
		

