angular.module("medApp").controller('CommandController', ['$scope', 'medAppFactory', '$http', '$location',
     function($scope, medAppFactory, $http, $location) {

    $scope.unitsUnderCommand = [];

    $scope.stepIntoUnit = function (unit) {
        
       
      
        
            var unitIdToStepInto;

            // If the unit is defined -> push the current station and name into factory(for drealdown)
            if (unit != undefined) 
            {
                 var amountUnderscore = (unit.id.match(/_/g) || []).length;
                 if (amountUnderscore == 3) {
                        // open tmz
                        $location.path("/tmz");
                 }
                else {
                var jsnToPush = {
                    "location": '/commandTmz'
                }

                unitIdToStepInto = jsnToPush.currentStation = medAppFactory.currentStation = unit.id;
                jsnToPush.unitName = medAppFactory.currentStationName = unit.name;  
                // Push to array - ask shir what is the name of array
                //   medAppFactory._JSON_NAME_.push(jsnToPush);
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