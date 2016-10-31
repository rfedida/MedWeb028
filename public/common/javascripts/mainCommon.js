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
         if (currentUser.getDetails() &&
             currentUser.getDetails().permission && 
             currentUser.getDetails().permission.split("_").length < 4)
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
        currentUser.logout();
    }
    
    loginCardService.showLoginCard();
});


