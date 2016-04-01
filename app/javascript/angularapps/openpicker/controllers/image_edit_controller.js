
ImageEditController = function($scope,$timeout,DataAccessService,$sce,$filter,$location,Upload,FileService) {
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

ImageEditController.prototype.setupScopeMethods = function() {
	var self = this;
	self.scope.cropAndSave = function(){
		$('#edit_image').cropper('getCroppedCanvas').toBlob(function (blob) {
		  console.log(blob);
			var urlCreator = window.URL || window.webkitURL; 
			var imageUrl = urlCreator.createObjectURL(blob); 

			self.FileService.updateFileBlob(self.scope.file.unique_id,blob);
      self.location.path('/upload');
      self.forceUpdateView();

		},"image/jpeg","1.0");
	}

	self.scope.skip = function() {
		self.location.path('/upload');
	}
	
};
ImageEditController.prototype.loadCropper = function(first_argument) {
  var self = this;
  var options = {
    aspectRatio: self.scope.options.cropRatio,
  };
  // Cropper
  $('#edit_image').cropper(options);
};
ImageEditController.prototype.initialize = function() {
	var self = this;
	self.scope.channels = self.FileService.getChannels();
	self.scope.options = self.FileService.getOptions();
	self.forceUpdateView();
	
	self.scope.file = self.FileService.getFiles()[0];

	self.blobToDataURL(self.scope.file.content,function(result){
		$('#edit_image').attr('src',result);
		self.timeout(function() {
			self.loadCropper();
		});
	})
	
   
};
//**blob to dataURL**
ImageEditController.prototype.blobToDataURL= function(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}

ImageEditController.prototype.forceUpdateView = function(first_argument) {

	var self = this;
	self.timeout(function() {
		self.scope.$apply();
	});
};



app.controller('ImageEditController',ImageEditController);
		

