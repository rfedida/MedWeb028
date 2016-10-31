var app = angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http',
    function InjuredController($scope, medAppFactory, $http) {
        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;
        $scope.selectedTab = 1;

        $scope.SaveInj = function() 
        {
            $http.put('/crud/patients' , { "patient": $scope.injured }).then(function(response)
            {
                
            });
        };

        $scope.changeTab = function(tabNum) 
        {
            $scope.selectedTab = tabNum;
        };
    }]);
   
