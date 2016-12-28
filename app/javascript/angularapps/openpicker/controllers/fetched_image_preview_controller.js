 FetchedImagePreviewController = function($scope, $timeout, $http, DataAccessService, $sce, $filter, $location, Upload, OptionsService, LogService) {
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

 FetchedImagePreviewController.prototype.setupScopeMethods = function() {
     var self = this;
     self.scope.uploadImage = function(){
          var file = self.scope.images[0];
          self.http.get(file.src, {responseType: 'arraybuffer'}).then(function(response){
               var blob = new Blob([response.data], {type:"image/jpeg"});
               blob.name = file.name;
          console.log(blob)
          self.OptionsService.addFile(blob);
          self.location.path('/edit/image');
          self.forceUpdateView();
          });
     };
 };

 FetchedImagePreviewController.prototype.initialize = function() {
     var self = this;
     self.scope.channels = self.OptionsService.getChannels();
     self.scope.options = self.OptionsService.getOptions();
     self.scope.limits = self.OptionsService.getLimits();
     self.scope.images = self.OptionsService.getTempFiles();
     self.forceUpdateView();
 };

 FetchedImagePreviewController.prototype.forceUpdateView = function(first_argument) {

     var self = this;
     self.timeout(function() {
         self.scope.$apply();
     });
 };

 app.controller('FetchedImagePreviewController', FetchedImagePreviewController);