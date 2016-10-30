function config($provide, $httpProvider){
    $provide.factory("ErrorInterceptor", function($q, $injector) {
        return {
            responseError : function(rejection)
            {
                if (rejection.status == 401)
                {
                    //var loginCardService = $injector.get("loginCardService");
                    //loginCardService.showLoginCard();
                    //window.location.href = "/";
                    console.log(rejection);
                }
                
                return $q.reject(rejection);
            }
        };
    })

    $httpProvider.interceptors.push("ErrorInterceptor");
};