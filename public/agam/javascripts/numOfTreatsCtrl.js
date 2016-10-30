myApp.controller('numOfTreatsCtrl', function($scope, $http) {
    $scope.unit = '1_1_1_1';
    $http.get("/crud/units/" + $scope.unit).then(function(response){
        var treatments = response.data.Treatments;

        var emptyChart = [
            {
                key: 'אין נתונים להציג',
                x: [[]]
            }
        ];

        $scope.dataVygon = emptyChart;
        $scope.dataCAT = emptyChart;
        $scope.dataNekezHaze = emptyChart;
        $scope.dataCombatGauze = emptyChart;

        $scope.mlay;

        for (i=0; i<treatments.length; i++)
        {
            $scope.mlay = treatments[i].Standard - treatments[i].Stock;
            if (treatments[i].id == 10)
            {
                $scope.dataVygon = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: treatments[i].Stock
                    }
                ];
            }
            else if (treatments[i].id == 5)
            {
                $scope.dataCAT = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: treatments[i].Stock
                    }
                ];
            }
            else if (treatments[i].id == 4)
            {
                $scope.dataNekezHaze = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: treatments[i].Stock
                    }
                ];
            }
            else if (treatments[i].id == 7)
            {
                $scope.dataCombatGauze = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: treatments[i].Stock
                    }
                ];
            }
        }
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
            height: 300,
            width: 300,
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
            },
            noData:"אין נתונים"
        }        
    };   
});