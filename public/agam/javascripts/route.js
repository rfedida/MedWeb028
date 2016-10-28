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
            controller : "occupationController"
        })

        .when("/numOfTreats" , {
            templateUrl : "/agam/views/numOfTreats.html",
            controller : "numOfTreatsCtrl"
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