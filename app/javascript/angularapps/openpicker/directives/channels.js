ChannelListController = function($scope,$timeout,DataAccessService) {
	var self = this;
	
	self.scope = $scope;
	self.timeout = $timeout;

	self.data_access_service = new DataAccessService();

	self.setupScopeMethods();
	
	self.initialize(); 


};

ChannelListController.prototype.setupScopeMethods = function() {
	var self = this;
	
	
 
};



		


app.directive('channels', ['$http', function($http) {
return {
    restrict: 'E',
 
    templateUrl: '/templates/channels.html',
    scope:{
           
    },
    controller:ChannelListController
}}]);