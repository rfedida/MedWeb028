myApp.controller('occupationController', ['$scope', '$http', 'unitIDService', function($scope, $http, unitIDService) {
    $scope.prediction_text = '';
    $scope.colorArray = ['#ee4035', '#f37736' ,'#fdf498', '#7bc043', '#0392cf', '#be29ec'];
    $scope.hirarchyCode = unitIDService.unitDetails;
    $scope.$watch('hirarchyCode.unitID', function() {

    // $http.get('/agam/Occupation/'+$scope.hirarchyCode.unitID).then(function (r) { 
    //         debugger;
    //          alert("ADAM");
    //         $scope.prediction = Math.round(parseInt(r['EstematedMinutesUntillFull']) / 60);
    //         console.log($scope.prediction);
    //         if ($scope.prediction <= 3) {
    //             return `התחנה צפויה להתמלא בעוד ${$scope.prediction} שעות`
    //         } else if ($scope.prediction <= 6) {
    //             return `המסגרת צפוייה להתמלא תוך בין 3 עד 6 שעות`;
    //         } else if ($scope.prediction <= 12) {
    //             return `המסגרת צפוייה להתמלא תוך בין 6 עד 12 שעות`;
    //         } else {
    //             return "המסגרת לא צפוייה להתמלא";
    //         }
    //     });

    // $scope.getPredicition = function (units) {
    //     $http.get('/agam/Occupation/'+$scope.hirarchyCode.unitID).then(function (r) { 
    //         debugger;
    //         $scope.prediction = Math.round(parseInt(r['EstematedMinutesUntillFull']) / 60);
    //         console.log($scope.prediction);
    //         if ($scope.prediction <= 3) {
    //             return `התחנה צפויה להתמלא בעוד ${$scope.prediction} שעות`
    //         } else if ($scope.prediction <= 6) {
    //             return `המסגרת צפוייה להתמלא תוך בין 3 עד 6 שעות`;
    //         } else if ($scope.prediction <= 12) {
    //             return `המסגרת צפוייה להתמלא תוך בין 6 עד 12 שעות`;
    //         } else {
    //             return "המסגרת לא צפוייה להתמלא";
    //         }
    //     });
    // }

    

    function buildPredictions(units)
    {
        var FullData = [];

        for (var curr in units)
        {
            var prediction = {
                unitName: units[curr].name,
                prediction: $scope.getPredicition(curr)
            } 

            FullData.push(prediction);

        }

        
        return (FullData);
    }

    $http.get('/agam/Occupation/'+$scope.hirarchyCode.unitID
    ).success(function(response){
        var jsonOne = response[0];
        var jsonTwo = response[1];
        var AllUnits;

        $http.get('/agam/units/'+$scope.hirarchyCode.unitID)
            .success(function(units){
                 AllUnits = BuildUnits(units);
                 AllUnitsCopy = BuildUnits(units);
                       
                $scope.predictionValue = [];

                Object.keys(AllUnitsCopy).forEach(function(key)
                {
                    var currPrediction = {};

                    $http.get('/crud/predict/hospital/'+ key).then(function (r) { 
                    debugger;
                    var predictionNum = Math.round(parseInt(r.data['EstematedMinutesUntillFull']) / 60);
                    var predictionString = "";
                    console.log(predictionNum);
                    if (predictionNum <= 3) {
                        predictionString =  `התחנה צפויה להתמלא בעוד ${predictionNum} שעות`
                    } else if (predictionNum <= 6) {
                        predictionString =  `המסגרת צפוייה להתמלא בעוד 3 - 6 שעות`;
                    } else if (predictionNum <= 12) {
                        predictionString = `המסגרת צפוייה להתמלא בעוד  6 - 12 שעות`;
                    } else {
                        predictionString = "המסגרת לא צפוייה להתמלא";
                    }

                    currPrediction['unitName'] = AllUnitsCopy[key].name;
                    currPrediction['prediction'] = predictionString;   

                     return currPrediction;                 
                    }).then(function(d) {
                        $scope.predictionValue.push(d);
                        return;
                    })
                    
                });

                 switch ($scope.hirarchyCode.unitID.length) 
                 {
                     case 1:
                     {
                         delete AllUnits[$scope.hirarchyCode.unitID]; 
                         // change the units only to ugdot
                         for (var unit in AllUnits)
                         {
                             if (unit.length != 3)
                             {
                                 delete AllUnits[unit];
                             }
                         }

                         $scope.dataOne = buildData(jsonOne, AllUnits);
                         $scope.dataOne = [];
                       
                         break;
                     }
                     case 3:
                     {
                         var AllUnitsOne = AllUnits;
                         var AllUnitsTwo = AllUnits;

                         for (var unit in AllUnits)
                         {
                             if (unit.length != 5)
                             {
                                 delete AllUnitsOne[unit];
                             }

                             if (unit.length != 7)
                             {
                                 delete AllUnitsTwo[unit];
                             }
                         }

                         $scope.dataOne = buildData(jsonOne, AllUnitsOne);
                         $scope.dataTwo = buildData(jsonTwo, AllUnitsTwo);

                         break;
                     }
                     case 5:
                     {
                         var CurrUnit = AllUnits[$scope.hirarchyCode.unitID];
                         var AllUnitsTwo = {}; // Change to generic when available
                         AllUnitsTwo[$scope.hirarchyCode.unitID] = CurrUnit; 
                         var AllUnitsOne = AllUnits;
                         delete AllUnitsOne[$scope.hirarchyCode.unitID];
                         
                         $scope.dataOne = buildData(jsonOne, AllUnitsOne);
                         $scope.dataTwo = buildData(jsonTwo, AllUnitsTwo);

                         break;
                     }
                     case 7:
                     {
                         $scope.dataOne = buildData(jsonTwo, AllUnits);
                         $scope.dataTwo = [];
                         
                         break;
                     }                                                           
                     default:
                         break;
                 }

                      

            });
    });
    });
            $scope.options = {
            chart:
            {
                id: "firstGraph",
                type: 'multiBarChart',
                height: 450,
                width: 300,
                margin: {
                    top: 20,
                    right: 20,
                bottom: 45,
                    left: 45
                },
                color: function(d, i) {                
                    return $scope.colorArray[i];        
                },
                clipEdge: true,
                stacked: true,
                showLables: true,
                duration: 500,
                xAxis: {
                    axisLabel:'מספר התחנה',
                    showMaxMin: false,
                },
                yAxis: {
                    axisLabel: 'כמות פצועים',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },  
                noData:"" 
            }        
        };

    
    
}]);

function BuildUnits(units)
{
        var map = {};   
        units.forEach(function(unit) {
            map[unit.id]= {name: unit.name ,maxCapacity: unit.Max_Capacity, currCapacity: 0 };
        }, this); 

        return (map);
}

 function doesExist(data, unitId)
 {
     var found = -1;
 
     for (var i=0; i <data.length; i++)
     {
         if (data[i].x == unitId)
         {
             found = i;
             break;
         }
     }
 
     return (found);       
 }                   

function buildData(data, units)
 {
     
      var FullData = [];

      // Go over the data and fill the values 
      for (var index in data)
      {
          if (index < 4)
          {
            var currInjury = data[index];
            var GenericValues = [];

            // Build the generic values
            for (var unit in units)
            {
                var valueToAdd = {
                    'x' : units[unit].name,
                    'y': 0
                };

                GenericValues.push(valueToAdd);
            }

            switch (currInjury.key) {
            case 0:
                {
                    currInjury.key = 'לא ידוע';

                    break;
                }
            case 1:
                {
                    currInjury.key = 'לא דחוף';
                    break;
                }
            case 2:
                {
                    currInjury.key = 'דחוף';
                    break;
                }
            case 3:
                {
                    currInjury.key = 'נפטר';
                    break;
                }                                                
        
            default:
                break;
            }

            var injuryData = {
                'key': currInjury.key,
                'values': GenericValues 
            };

            for (var unitIndex in units)
            {
                var indexInData = doesExist(currInjury.values, unitIndex);

                if (indexInData > -1)
                {
                    var indexInGeneric = doesExist(injuryData.values, units[unitIndex].name);
                    injuryData.values[indexInGeneric].y = currInjury.values[indexInData].y;
                    units[unitIndex].currCapacity += injuryData.values[indexInGeneric].y;
                }
            }

            FullData.push(injuryData);
      }}

        // Build the generic values
        GenericValues = [];

        for (var unit in units)
        {
            var valueToAdd = {
                'x' : units[unit].name,
                'y': 0
            };

            GenericValues.push(valueToAdd);
        }
        
      var currCapacity = {
                'key': 'כמות שנותרה',
                'values': GenericValues 
            };

        for (var unitIndex in units)
        {
            for (var valueIndex in currCapacity.values)
            {
                // check if this is the value to change
                if (currCapacity.values[valueIndex].x == units[unitIndex].name)
                {
                    currCapacity.values[valueIndex].y = units[unitIndex].maxCapacity - units[unitIndex].currCapacity;
                }
            }
        }

        FullData.push(currCapacity);  

        return (FullData);     
 }