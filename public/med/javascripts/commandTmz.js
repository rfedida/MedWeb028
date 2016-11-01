angular.module("medApp").controller('CommandController', ['$scope', 'medAppFactory', '$http', '$location',
     function($scope, medAppFactory, $http, $location) {

    $scope.unitsUnderCommand = [];

    $scope.stepIntoUnit = function(unit)
    {
      /*  medAppFactory.stepIntoUnit(unit).then(function(res)
        {
            $scope.unitsUnderCommand = medAppFactory.unitsUnderCommand;
        });*/
        medAppFactory.stepIntoUnit(unit);
    }

    $scope.$on('changePage', function (event, args){
         $scope.unitsUnderCommand = medAppFactory.unitsUnderCommand;
    })
    $scope.stepIntoUnit();
}]);