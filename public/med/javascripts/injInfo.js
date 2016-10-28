var app = angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory',
    function InjuredController($scope, medAppFactory) {
        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;
    }]);
