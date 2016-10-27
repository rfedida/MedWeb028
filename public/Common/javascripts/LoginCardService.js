angular.module('medApp').service("loginCardService", function($mdDialog)
{
    function showLoginCard(){
        $mdDialog.show({
            clickOutsideToClose : false,
            preserveScope : true,
            templateUrl : "common/views/loginCard.html",
            controller : function($scope, $mdDialog, $http)
            {
                $scope.loginError = false;

                $scope.login = function()
                {
                    $scope.loginError = false;
                                        
                    $http.post("/Infrastructure/Login", $scope.loginDetails)
                    .success(function(data){
                        $mdDialog.hide();
                    })
                    .error(function(data){
                        $scope.loginError = true;
                    });
                }
            }
        });
    }

    return {
        showLoginCard : showLoginCard
    };
});