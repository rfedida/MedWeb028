angular.module('mainCommon', ["infra", "ngCookies", "ngMaterial"]);
// , "ngCookies", "infra" "ngMaterial",

//
angular.module('mainCommon').controller('mainController',
function ($scope, $http, loginCardService, currentUser, $cookies)
{    
    $scope.$watch(
    function()
    {
         return currentUser.details;
    },
    function(newVal)
    {
         if (currentUser.details.permission && 
             currentUser.details.permission.split("_").length < 4)
         {
             $scope.isMed = false;        
         }
         else
         {
             $scope.isMed = true;
         }
    });

    $scope.logout = function()
    {
        $cookies.remove("user");
        $cookies.remove("hash");
        loginCardService.showLoginCard();    
    }
    
    loginCardService.showLoginCard();
});


