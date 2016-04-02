
PrimaryController = function($scope,$timeout,DataAccessService,$sce,$filter,$location,Upload,FileService) {
	var self = this;
	
	self.scope = $scope;
	self.timeout = $timeout;

	self.sce = $sce;
	self.location = $location;
	self.Upload = Upload;
	self.FileService = FileService;
 
	
	self.data_access_service = new DataAccessService();


	self.setupScopeMethods();
	self.setChildEventsListener();
	self.registerCloseEventHandler();
	self.initialize(); 

};

PrimaryController.prototype.setupScopeMethods = function() {
	var self = this;
	
};

PrimaryController.prototype.initialize = function() {
	var self = this;
	self.scope.channels = [];
	

	self.data_access_service.getAppDefaults().then(function(response){
		self.FileService.updateChannels(response.data.channels);
		self.FileService.updateOptions(response.data.options);
		self.FileService.updateLimits(response.data.limits);
		self.forceUpdateView();

		self.broadcastStatus('READY');
	},
	function(err){
		//TODO complete this
		console.log("Something went wrong");
	});

	

   
};
PrimaryController.prototype.setChildEventsListener = function() {
		var self = this;
		// Create IE + others compatible event handler
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

		// Listen to message from child window
		eventer(messageEvent,function(e) {
		  self.processEvent(e.data);
		},false)
};
PrimaryController.prototype.processEvent = function(ev) {
	var self = this;
	console.log("Child Received Event");
	console.log(ev);
	if(ev.category === "INITIALIZE") {
		self.FileService.clearFiles();
		self.FileService.updateOptions(ev.data.options);
		//filter channels to display only those that were requested by the client
		if(ev.data.options.channels !== undefined && ev.data.options.channels !== null){
			self.FileService.filterChannels(ev.data.options.channels);
		}
		self.location.path('/channels/my_computer');
		self.forceUpdateView();
	}
};
PrimaryController.prototype.broadcastStatus = function(status) {
	var self = this;
	var messageObject = {
		category : "CONTROL",
		data : status
	}
	parent.postMessage(messageObject,"*");
};

PrimaryController.prototype.forceUpdateView = function(first_argument) {

	var self = this;
	self.timeout(function() {
		self.scope.$apply();
	});
};

PrimaryController.prototype.registerCloseEventHandler = function(first_argument) {
	var self = this;
	$(document).on('click','#openpicker_close_button',function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		self.broadcastStatus('CLOSE');
	});
};


app.controller('PrimaryController',PrimaryController);
		

