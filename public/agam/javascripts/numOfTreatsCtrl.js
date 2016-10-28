myApp.controller('numOfTreatsCtrl', function($scope, $http) {

    $http.get("/crud/units").then(function(response){
        var data = response.data;
         $scope.dataVygon = [
            {
                key: 'במלאי',
                y: 8
            },
            {
                key: 'שימוש',
                y: 50
            }
        ];

        $scope.dataHosemOrakim = [
            {
                key: 'במלאי',
                y: 33
            },
            {
                key: 'שימוש',
                y: 50
            }
        ];

        $scope.dataNekezHaze = [
            {
                key: 'במלאי',
                y: 67
            },
            {
                key: 'שימוש',
                y: 36
            }
        ];
    })

    $scope.colorArray = ['gray','#660000'];
    
    $scope.colorFunction = function() {
        return function(d,i){
            return $scope.colorArray[i];
        }
    }
    
    $scope.options = {
        chart:
        {
            type: 'pieChart',
            height: 200,
            width: 230,
            donut: true,
            x: function(d){return d.key},
            y: function(d){return d.y},
            showLables: true,
            labelType: "value",
            color: $scope.colorFunction(),
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin:
                {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            } 
        }        
    };   
});