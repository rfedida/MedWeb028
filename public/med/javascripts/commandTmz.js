angular.module("medApp").controller('CommandController', ['$scope', 'medAppFactory', '$http', '$location',
     function($scope, medAppFactory, $http, $location) {

    $scope.unitsUnderCommand = [];

    $scope.stepIntoUnit = function (unit) {

            var unitIdToStepInto;

            // If the unit is defined -> push the current station and name into factory(for drealdown)
            if (unit != undefined) 
            {
                 var amountUnderscore = (unit.id.match(/_/g) || []).length;
                 var jsnToPush = {};
                 var length = medAppFactory.currentNavagationBar.length;
                 if (amountUnderscore == 3) 
                 {
                        // open tmz
                    jsnToPush.location = "/tmz";
                    unitIdToStepInto = jsnToPush.currentStation = medAppFactory.currentStation = unit.id;
                    jsnToPush.name = medAppFactory.currentStationName = unit.name;
                    jsnToPush.parentCurrentStation = medAppFactory.currentNavagationBar[length-1].name;             
                    medAppFactory.currentNavagationBar.push(jsnToPush);
                    $location.path(jsnToPush.location);
                 }
                else {
                    jsnToPush.location = "/commandTmz";
                    unitIdToStepInto = jsnToPush.currentStation = medAppFactory.currentStation = unit.id;
                    jsnToPush.name = medAppFactory.currentStationName = unit.name;
                    jsnToPush.parentCurrentStation = medAppFactory.currentNavagationBar[length-1].name;             
                    medAppFactory.currentNavagationBar.push(jsnToPush);
                     $location.path(jsnToPush.location);
                }
            }
            else {
                unitIdToStepInto = medAppFactory.currentStation;
            }

            // Get all unit under current units
            $http.get("/crud/units/" + unitIdToStepInto + "/units").then(function(response) {
                $scope.unitsUnderCommand = response.data;
            });
        }
    

    $scope.stepIntoUnit();
}]);