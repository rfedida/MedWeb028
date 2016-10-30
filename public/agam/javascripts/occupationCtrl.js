myApp.controller('occupationController', function($scope, $http) {

    $scope.colorArray = ['gray','#660000'];
    
    $scope.colorFunction = function() {
        return function(d,i){
            return $scope.colorArray[i];
        }
    }
    


    $http.get('/agam/Occupation/'+'1_1_1'
    ).success(function(response){
        var jsonOne = response[0];
        var jsonTwo = response[1];
        var AllUnits;

        $http.get('/crud/units')
            .success(function(units){
                 AllUnits = BuildUnits(units);

                if (!isEmpty(jsonOne))
                {
                    $scope.optionsOne = {
                        chart:
                        {
                            id: "firstGraph",
                            type: 'multiBarChart',
                            height: 450,
                            margin: {
                                top: 20,
                                right: 20,
                            bottom: 45,
                                left: 45
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
                
                    $scope.dataOne = buildData(jsonOne, AllUnits);
                }
                if (!isEmpty(jsonTwo))
                {
  
                    $scope.optionsTwo = {
                        chart:
                        {
                            type: 'multiBarChart',
                            height: 450,
                            margin: {
                                top: 20,
                                right: 20,
                            bottom: 45,
                                left: 45
                            },
                            clipEdge: true,
                            stacked: true,
                            showLables: true,
                            duration: 500,
                            xAxis: {
                                axisLabel:'מספר התחנה',
                                showMaxMin: false
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

                    $scope.dataTwo = buildData(jsonTwo, AllUnits);                
                }
            });

    });
    
});

function buildData(data, units)
{
    var GoodData = [];
    var ourUnits = {};
    var maxCapacity = {
        'key' : 'כמות שנותרה',
        'values': []
    };

    for (var index in data)
    {
        if (data[index].key != 4)
        {
        var currInjury = data[index];

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
            'key' : currInjury.key,
            'values': []
        };


                
        for (var statIndex in currInjury.values)
        {
            var currStation = currInjury.values[statIndex];
            injuryData.values.push({
                'x' : units[currStation.x].name, // TODO: change to currStation.x when getting the stations is available 
                'y' : currStation.y
            });

            if (!ourUnits.hasOwnProperty(currStation.x))
            {
                ourUnits[currStation.x] = {
                    name: units[currStation.x].name,
                    currCapacity: currStation.y,
                    maxCapacity: units[currStation.x].capacity
                };
            }
            else
            {
                ourUnits[currStation.x].currCapacity += currStation.y;
            }
        }

        GoodData.push(injuryData);
        }
    }

    for (var currUnit in ourUnits)
    {
        maxCapacity.values.push({
            'x': ourUnits[currUnit].name,
            'y': ourUnits[currUnit].maxCapacity - ourUnits[currUnit].currCapacity
        });
    }

    GoodData.push(maxCapacity);

    return (GoodData);
}

// Checks if the json is empty.
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj)
{
    if (obj == null) return true;
    if(obj.length > 0) return false;
    if (obj.length === 0) return true;
    
    for (var key in obj){
        if (hasOwnProperty.call(obj, key)) return false;
    }
}

function BuildUnits(units)
{
        var map = {};   
        units.forEach(function(unit) {
            map[unit.id]= {name: unit.name ,capacity: unit.Max_Capacity };
        }, this); 

        return (map);
}

function buildMaxCapacity(data, units)
{
    var maxCapacity = {
        'key' : 'תפוסה מקסימלית',
        'values': []
    }

    var ourUnits = [];

    data.forEach(function(curr){
        curr.values.forEach(function(currUnit){

        });
    });
}