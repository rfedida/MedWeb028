var app = angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http',
    function InjuredController($scope, medAppFactory, $http) {
        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;

        $scope.SaveInj = function() 
        {
            $http.post('/med/saveInj', {injData: $scope.injured});
        };
    }]);
   