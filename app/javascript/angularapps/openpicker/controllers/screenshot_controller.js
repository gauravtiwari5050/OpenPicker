 ScreenshotController = function($scope, $http, $timeout, $location, OptionsService) {
     var self = this;

     self.scope = $scope;
     self.timeout = $timeout;
     self.http = $http;
     self.location = $location;
     self.OptionsService = OptionsService;

     self.setupScopeMethods();
     self.initialize();
 };

 ScreenshotController.prototype.setupScopeMethods = function() {
     var self = this;

     self.scope.fetch = function() {
        
         self.scope.showLoader = true;
         self.scope.uploadError = false;
         self.scope.showError = true;
         self.scope.urlRegex = /^(http:\/\/|https:\/\/)/i;

         self.fetchFile();
     };
 };

 ScreenshotController.prototype.fetchFile = function() {

     var self = this,
     postData = {
         url: self.scope.file.src,
         fileName: self.scope.file.name,
         allowedMimeTypes: self.scope.options.mimetypes
     },
     headerData = {'x-csrf-token':$('meta[name=csrf]').attr("content")},
     requestData = {
        method: 'POST',
        url: '/screenshot/',
        headers: headerData,
        data: postData
     };

     self.http(requestData).then(function(response) {
         self.scope.showLoader = false;
         if (response.data.error) {
             self.scope.uploadError = response.data;
             self.timeout(function() {
                self.scope.uploadError.error = false;
             }, 5000);
         } else {
             var fileObj = {
                 path: response.data.path,
                 name: response.data.name,
                 size: response.data.size,
                 type: response.data.type,
                 src: window.location.origin + '/' + response.data.name
             };
             if (fileObj !== null && fileObj !== undefined){
                 self.OptionsService.addTempFile(fileObj);
                 self.location.path('/fetched_file_preview');
                 self.forceUpdateView();
             }
         }
    });
 };

 ScreenshotController.prototype.initialize = function() {
     var self = this;
     self.scope.channels = self.OptionsService.getChannels();
     self.scope.options = self.OptionsService.getOptions();
     self.scope.limits = self.OptionsService.getLimits();
     self.scope.files = [];

     self.forceUpdateView();
 };

 ScreenshotController.prototype.forceUpdateView = function(first_argument) {

     var self = this;
     self.timeout(function() {
         self.scope.$apply();
     });
 };

 app.controller('ScreenshotController', ScreenshotController);