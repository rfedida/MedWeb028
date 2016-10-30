angular.module('infra').service("loginCardService", function($mdDialog, $cookies, currentUser)
{
    function showLoginCard()
    {        
        if ($cookies.get("hash") == null)
        {
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
                        .success(function(data, status, headers, config)
                        {
                            $cookies.put("hash", data.hash);
                            $cookies.put("user",JSON.stringify(data));
                            currentUser.details = data;
                            $mdDialog.hide();
                        })
                        .error(function(data, status, headers, config){
                            $scope.loginError = true;
                        });                     
                    }            
                }
            });
        }
        else if (currentUser.details.permission == null)
        {
            currentUser.details = JSON.parse($cookies.get("user"));
        }
    }

    return {
        showLoginCard : showLoginCard
    };
});