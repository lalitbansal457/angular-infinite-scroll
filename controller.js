var app = angular.module('myApp', []);

app.controller('iScrollCtrl', function($scope, $window, $document, $timeout){
	$scope.max = 200;
	$scope.arr = [];
	$scope.limitScroll = 50;
	$scope.currentPage = 0;
	
	// 
	for(i=1; i<=$scope.max; i++) {
		$scope.arr.push(i);
	}
	
	// load  data 
	$scope.loadMore = function(){
		$scope.currentPage += 1;
	}
	
	// remove data
	$scope.removeMore = function(){
		if($scope.currentPage > 0) {
			$scope.currentPage -= 1;
		}
	}
	
	// calculate document height
	$timeout(function(){
		$scope.docHeight = $document.height();
	});
});



app.directive('scroll', function($window, $document){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			scope.lastScrollTop = 0;
			
			// bind scroll event
			angular.element($window).bind('scroll', function(){
				scope.st = window.pageYOffset;

				if (scope.st > scope.lastScrollTop) {
					scope.$apply(attr.scroll);
					scope.lastScrollTop = scope.st;
				} else {
					scope.$apply(scope.removeMore());
				}
				scope.lastScrollTop = scope.st;
				if(window.innerHeight + window.pageYOffset  == scope.docHeight) {
					window.scrollTo(0, 50);
				} 
				if(window.pageYOffset == 0 && !scope.currentPage <= 0) {
					window.scrollTo(0, 50);
				}
				if(scope.currentPage <= 0 ) {
					window.scrollTo(0, 0);
				} 
			});
		}
	}
});

app.filter('iScroll', function(){
	return function (input, start) {
		 return input.slice(start);
	}
});
