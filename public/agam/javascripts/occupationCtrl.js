myApp.controller('occupationController', function($scope, $http) {

    $scope.colorArray = ['gray','#660000'];
    
    $scope.colorFunction = function() {
        return function(d,i){
            return $scope.colorArray[i];
        }
    }
    
    $scope.options = {
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
                showMaxMin: false,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            },
            yAxis: {
                axisLabel: 'כמות פצועים',
                axisLabelDistance: -20,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }  
        }        
    };

    $http.get('/Occupation/', {
        params: {
            userHirarchy: "1_1_1" // TODO: Change to the real one from the scope when available
        }
    }).success(function(response){
        var jsonFull = response.data;
        var jsonOne = jsonFull[0];
        var jsonTwo = jsonFull[1];

        if (jsonOne != {})
        {
            document.getElementById("graphOne").hidden.value = false;
            $scope.dataOne = jsonOne;
        }
        if (jsonTwo != {})
        {
            document.getElementById("graphTwo").hidden.value = false;
            $scope.dataTwo = jsonTwo;
        }

    });
});