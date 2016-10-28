myApp.controller('numOfTreatsCtrl', function($scope, $http) {

    $http.get("/crud/units/1_1_1_1").then(function(response){
        var treatments = response.data.Treatments;
        //Object {id: "1", Standard: 59, Stock: 59}

        $scope.dataVygon = [
            {
                key: 'אין נתונים להציג',
                x: [[]]
            }
        ];

        $scope.dataHosemOrakim = [
            {
                key: 'אין נתונים להציג',
                x: [[]]
            }
        ];
        $scope.dataNekezHaze = [
            {
                key: 'אין נתונים להציג',
                x: [[]]
            }
        ];

        $scope.mlay;

        for (i=0; i<treatments.length; i++)
        {
            if (treatments[i].id == 10)
            {
                $scope.mlay = treatments[i].Standard - treatments[i].Stock;
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
            else if (treatments[i].id == 5) // Assumming it means 'c.a.t'
            {
                $scope.mlay = treatments[i].Standard - treatments[i].Stock;
                $scope.dataHosemOrakim = [
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
                $scope.mlay = treatments[i].Standard - treatments[i].Stock;
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
            },
            noData:"אין נתונים"
        }        
    };   
});