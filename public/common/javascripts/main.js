angular.module('medApp', ["ngMaterial"]);

// angular.module('medApp').config(function($provide, $httpProvider){
//     $provide.factory("ErrorInterceptor", function($q) {
//         return {
//             responseError : function(rejection)
//             {
//                 console.log(rejection);
//                 return $q.reject(rejection);
//             }
//         };
//     })

//     $httpProvider.interceptors.push("ErrorInterceptor");
// });

angular.module("medApp").controller("mainController", function($http, $scope)
{
    //loginCardService.showLoginCard();
})