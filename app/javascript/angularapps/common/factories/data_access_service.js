app.factory('DataAccessService',function($http){
    var DataAccessService = function(){
      var self = this;
     
    }
    
  
    DataAccessService.prototype.getChannels = function(sector_group_unique_id) {
      var apiUrl = "/channels/";
      return $http.get(apiUrl).then(function(response){
        return response;
      });  
    }
    DataAccessService.prototype.getAppDefaults = function(sector_group_unique_id) {
      var apiUrl = "/app_defaults/";
      return $http.get(apiUrl).then(function(response){
        return response;
      });  
    }
  
    return DataAccessService;
});
