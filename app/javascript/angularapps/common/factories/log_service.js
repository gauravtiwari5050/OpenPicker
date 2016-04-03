app.factory('LogService',function($http){
    var LogService = function(){
      var self = this;
      try {
      var search = window.parent.location.search;
      if(search === null || search === undefined) {
        search = "";
      }
      if(search.match(/openpicker_debug/)){
        self.display_logs = true;
      }
      } catch(e){
        self.display_logs = false;
      }
     
    }
    
    LogService.prototype.log = function(obj) {
      var self = this;
      if(self.display_logs === true){
        console.log(obj);
      }
    };
    
    return LogService;
});
