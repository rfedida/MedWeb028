angular.module('medApp').service("loginCardService", function($mdDialog, $cookies)
{
    function showLoginCard(){
        $mdDialog.show({
            clickOutsideToClose : false,
            preserveScope : true,
            templateUrl : "infrastructure/views/loginCard.html",
            controller : function($scope, $mdDialog, $http)
            {
                $scope.loginError = false;

                $scope.login = function()
                {
                    $scope.loginError = false;
                                                            
                    $http.post("/infrastructure/login", $scope.loginDetails)
                    .success(function(data, status, headers, config){
                        $cookies.put("hash", data);
                        $mdDialog.hide();
                    })
                    .error(function(data, status, headers, config){
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