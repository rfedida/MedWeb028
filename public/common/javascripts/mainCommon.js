var medApp = angular.module('medApp', ["ngMaterial", "ngCookies"]);
medApp.controller('medController',['$scope', '$http',
 function ($scope, $http){

<<<<<<< HEAD
   //loginCardService.showLoginCard();
=======
   // loginCardService.showLoginCard();
>>>>>>> dd49b5785234accaf7f9b606a0ce9ceb8d987997
    $scope.data = "try";

    $scope.a = function(){
        $http.get("/hello", function(data){
            console.log(data);
        });
    }

}]);


