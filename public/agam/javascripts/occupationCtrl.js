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

    $http.get('/agam/Occupation/'+'1_1_1'
    ).success(function(response){
        var jsonOne = response[0];
        var jsonTwo = response[1];

       /* if (jsonOne.isEmpty() != true)
        {
            document.getElementById("graphOne").hidden.value = false;
            $scope.dataOne = jsonOne;
        }*/
        /*if (jsonTwo.isEmpty() != true)
        {*/
           // document.getElementById("graphTwo").innerHTML.hidden = false;
            $scope.dataTwo = jsonTwo;
        //  }

    });
});