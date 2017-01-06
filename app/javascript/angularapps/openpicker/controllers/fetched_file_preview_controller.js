 FetchedFilePreviewController = function($scope, $timeout, $http, DataAccessService, $sce, $filter, $location, Upload, OptionsService, LogService) {
     var self = this;

     self.scope = $scope;
     self.timeout = $timeout;
     self.http = $http;
     self.sce = $sce;
     self.location = $location;
     self.Upload = Upload;
     self.OptionsService = OptionsService;
     self.logger = new LogService();

     self.data_access_service = new DataAccessService();


     self.setupScopeMethods();

     self.initialize();
 };

 FetchedFilePreviewController.prototype.setupScopeMethods = function() {
     var self = this;
     self.scope.uploadFile = function(){
          
          self.OptionsService.clearTempFiles();

          var file = self.scope.file;
          self.http.get(file.src, {responseType: 'arraybuffer'}).then(function(response){
               var blob = new Blob([response.data], {type:file.type}, "1.0");
               blob.name = file.name;

          self.OptionsService.addFile(blob);

          if(self.scope.isImage)
             self.location.path('/edit/image');
          else
             self.location.path('/upload');

          self.forceUpdateView();
          });
     };
 };

 FetchedFilePreviewController.prototype.initialize = function() {
     var self = this,
         imageRegex = /image\/.*/i,
         viewableFileRegex = /(mp4|mp3|mpeg|pdf)$/i;

     self.scope.channels = self.OptionsService.getChannels();
     self.scope.options = self.OptionsService.getOptions();
     self.scope.limits = self.OptionsService.getLimits();
     self.scope.files = self.OptionsService.getTempFiles();

     self.scope.file = self.scope.files[0];

     if(self.scope.file.type.match(imageRegex))
          self.scope.isImage = true;
     else{
          self.scope.isImage = false;
          if(self.scope.file.type.match(viewableFileRegex))
               self.scope.isViewable = true;
          else
               self.scope.isViewable = false;
     }

     self.forceUpdateView();
 };

 FetchedFilePreviewController.prototype.forceUpdateView = function(first_argument) {

     var self = this;
     self.timeout(function() {
         self.scope.$apply();
     });
 };

 app.controller('FetchedFilePreviewController', FetchedFilePreviewController);