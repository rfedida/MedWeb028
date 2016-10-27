myApp.config(function($routeProvider){
    $routeProvider
        .when("/" , {
            templateUrl : "/agam/views/typeOfInjury.html",
            controller : "statisticController"
        })

         .when("/typeOfInjury" , {
            templateUrl : "/agam/views/typeOfInjury.html",
            controller : "statisticController"
        })

        .when("/useOfDrugs" , {
            templateUrl : "/agam/views/useOfDrugs.html",
            controller : "useOfDrugsCtrl"
        })

        .when("/Occupation" , {
            templateUrl : "/agam/views/tonnage.html",
            controller : "statisticController"
        })

        .when("/numOfTreat" , {
            templateUrl : "/agam/views/numOfTreat.html",
            controller : "statisticController"
        })

        .when("/injuryPerHour" , {
            templateUrl : "/agam/views/injuryPerHour.html",
            controller : "statisticController"
        })

        .otherwise({
             templateUrl : "/agam/views/typeOfInjury.html",
            controller : "statisticController"
        })
})