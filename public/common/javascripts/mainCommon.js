var medApp = angular.module('medApp', ["ngMaterial", "ngCookies"]);
medApp.controller('medController',['$scope', '$http',
 function ($scope, $http){

   //loginCardService.showLoginCard();
    $scope.data = "try";

    $scope.a = function(){
        $http.get("/hello", function(data){
            console.log(data);
        });
    }

}]);


