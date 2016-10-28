var app = angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http',
    function InjuredController($scope, medAppFactory, $http) {
        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;

        $scope.check = 0;

        $scope.SaveInj = function SaveInj() {
            $http.post('/med/saveInj', {"name": "shir"}  );
        };

        
    }]);
   