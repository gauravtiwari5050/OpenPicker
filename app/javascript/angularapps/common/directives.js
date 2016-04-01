
app.filter('fieldCapitalize',function(){
    return function(text){

      if(text == null || text == undefined){
        return ''
      } else {
        return _.reduce(text.split('_'),function(returnStr,string){return returnStr + string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() + ' '},''); 
      }
    }
});

app.filter('isNull',function(){
    return function(text){

      if(text == null || text == undefined){
        return true;
      } else {
        return text.empty()
      }
    }
});

app.directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    //call the function that was passed
                    scope.$apply(attrs.imageonload);
                });
            }
        };
});

app.directive('confirmationNeeded', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var msg = attr.confirmationNeeded || "Are you sure?";
      var clickAction = attr.ngClick;
      element.bind('click',function () {
        if ( window.confirm(msg) ) {
          scope.$eval(clickAction)
        }
      });
    }
  };
});

app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
          if(event.which === 13) {
              scope.$apply(function(){
                  scope.$eval(attrs.ngEnter, {'event': event});
              });

              event.preventDefault();
          }
      });
  };
});


app.filter('truncate', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
});

app.filter('getHostname',function(){
  return function(url){
	  if(isNull(url)|| url.trim().length == 0){
	  	return null
	  }
   	  var parser = document.createElement('a');
    	  parser.href = url;  
   	  return parser.hostname;
  }
});


app.directive('centered',function(){
    return {
      restrict : 'E',
      transclude : true,
      template : [
        '<div class="angular-center-container">',
        '  <div class="angular-centered" ng-transclude></div>',
        '</div>'
      ].join('') 
    }
  });


