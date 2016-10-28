angular.module('medApp').config(function($provide, $httpProvider){
    $provide.factory("ErrorInterceptor", function($q, $injector) {
        return {
            responseError : function(rejection)
            {
                if (rejection.status == 401)
                {
                    var loginCardService = $injector.get("loginCardService");
                    loginCardService.showLoginCard();
                    console.log(rejection);
                }
                
                return $q.reject(rejection);
            }
        };
    })

    $httpProvider.interceptors.push("ErrorInterceptor");
});

