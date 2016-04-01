EmbedSelectionController = function($scope, $modalInstance,$sce, $timeout,items,embed_type){
	$scope.default_video = "https://www.youtube.com/watch?v=XH863XXRZEQ";
	
	console.log("embed_type is" + embed_type);

	$scope.items = items;
	$scope.data = {
		twitter_code : null,
		slideshare_id: null,
		video:null,
	}
	$scope.selected = {
		item: $scope.items[0]
	};
	$scope.embed_type = embed_type;


	$scope.ok = function (category) {
		var returnObject  = {
			category:category
		}
		if(category == 'video'){
			returnObject['value'] = $scope.vidURL($scope.data.video,false);
		} else if (category == 'twitter_code'){
			returnObject['value'] = $scope.data.twitter_code;
		}
		$modalInstance.close(returnObject);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}


	$scope.vidURL = function(url,trustedUrl) {
		if(trustedUrl ===  null || trustedUrl === undefined){
			trustedUrl = true;
		}

		if(url === null || url == undefined || url.length == 0) {
			url = $scope.default_video;
		}
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);

		if (match && match[2].length == 11) {
			ytid =  match[2];
			var src = "http://www.youtube.com/embed/"+ytid + "?rel=0";
		} 
		else
		{
			var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
			if(pattern1.test(url)){
				var replacement = "http://player.vimeo.com/video/$1" ;
				var src = url.replace(pattern1, replacement);
			}
		}
		if(trustedUrl ===  true){
			return $sce.trustAsResourceUrl(src);
		} else {
			return src;
		}

		
	};
	$scope.slideShareURL = function(slideshare_id) {

		if(slideshare_id === null || slideshare_id == undefined || slideshare_id.length == 0) {
			slideshare_id = "31528883";
		}
		var src = "//www.slideshare.net/slideshow/embed_code/" + slideshare_id;
		

		return $sce.trustAsResourceUrl(src);
	};

//www.slideshare.net/slideshow/embed_code/{{data.slideshare}}

	$scope.$watch('data.twitter_code',function(newValue,oldValue){
		console.log("Changed");
		$timeout(function(){
			if(twttr !== null && twttr !== undefined){
				twttr.widgets.load();
			}	
		});
		
	});

};
app.controller('EmbedSelectionController',EmbedSelectionController);