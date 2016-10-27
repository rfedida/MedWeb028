var app = angular.module("medApp", ["ngRoute"]);

app.config(['$routeProvider', 
function($routeProvider){
	$routeProvider
		.when('/', {
		templateUrl: "/med/views/view0.html"
		})
		.when('/injInfo', {
		templateUrl: "/med/views/injInfo.html"
		})
		.when('/view2', {
		templateUrl: "/med/views/view2.html"
		})
		.when('/view3', {
		templateUrl: "/med/views/view3.html"
		});
}]);

app.controller('GIL', function($scope, $location){
	$scope.message = 'AAA';
	$scope.path = "start";
	$scope.go = function(path){
		$scope.path=path;
		$location.path = path;
	}
});
