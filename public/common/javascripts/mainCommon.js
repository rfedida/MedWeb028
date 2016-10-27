var medApp = angular.module('medApp', ["ngMaterial"]);
medApp.controller('medController',['$scope', '$http', function ($scope, $http){

   
    $scope.data = "try";
}]);

angular.module('medApp').config(function($provide, $httpProvider){
    $provide.factory("ErrorInterceptor", function($q) {
        return {
            responseError : function(rejection)
            {
                console.log(rejection);
                return $q.reject(rejection);
            }
        };
    })

    $httpProvider.interceptors.push("ErrorInterceptor");
});

angular.module("medApp").controller("mainController", function($http, $scope, loginCardService)
{
    loginCardService.showLoginCard();
})



