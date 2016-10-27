myApp.config(function($routeProvider){
    $routeProvider
        .when('/' , {
            templateUrl : '/agam/views/typeOfInjury.html',
            controller : 'statisticController'
        })

        .when('/typeOfInjury' , {
             templateUrl : '/agam/views/typeOfInjury.html',
            controller : 'statisticController'
        })

        .when('/useOfDrugs' , {
            templateUrl : '/agam/views/useOfDrugs.html',
            controller : ''
        })

        .when('/tonnage' , {
            templateUrl : '/agam/views/tonnage.html',
            controller : ''
        })

        .when('/numOfTreat' , {
            templateUrl : '/agam/views/numOfTreat.html',
            controller : ''
        })

        .when('/injuryPerHour' , {
            templateUrl : '/agam/views/injuryPerHour.html',
            controller : ''
        })

        .otherwise({
             templateUrl : '/agam/views/typeOfInjury.html',
            controller : 'statisticController'
        })
})