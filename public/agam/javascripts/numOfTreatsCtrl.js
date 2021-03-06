myApp.controller('numOfTreatsCtrl', ['$scope','$http','unitIDService', function($scope,$http,unitIDService) {   
    $scope.unit = unitIDService.unitDetails;
    $scope.$watch('unit.unitID', function() {
       $http.get("/crud/units/" + $scope.unit.unitID).then(function(response){

            var treatments = response.data.Treatments;

            $scope.dataVygon = [];
            $scope.dataCAT = [];
            $scope.dataNekezHaze = [];
            $scope.dataCombatGauze = [];
            $treatsStockTimeData = [];

            $scope.mlay;

            for (i=0; i<treatments.length; i++)
            {
                $scope.mlay = treatments[i].Standard - treatments[i].Stock.CurrStock;
                if (treatments[i].id == 10)
                {
                    $scope.dataVygon = [
                        {
                            key: 'במלאי',
                            y: $scope.mlay
                        },
                        {
                            key: 'שימוש',
                            y: treatments[i].Stock.CurrStock
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
                            y: treatments[i].Stock.CurrStock
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
                            y: treatments[i].Stock.CurrStock
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
                            y: treatments[i].Stock.CurrStock
                        }
                    ];
                }
            }

            // for timeline
            var lines = [];
            for (i=0; i<treatments.length; i++)
            {
                treatments[i].Stock.Usage.sort(function (a,b) {
                    return new Date(parseInt(a)) - new Date(parseInt(b));
                });

                var countStock = treatments[i].Stock.CurrStock + treatments[i].Stock.Usage.length;
                var params = [];
                var currParam;

                for (j=0; j < treatments[i].Stock.Usage.length; j++)
                {
                    countStock--;
                    currParam = {
                        "x" : treatments[i].Stock.Usage[j],
                        "y" : countStock
                    }

                    params.push(currParam);
                }

                var keyName;
                if (treatments[i].id == 10)
                    keyName = "Vygon";
                else if (treatments[i].id == 5)
                    keyName = "C.A.T";
                else if (treatments[i].id == 4)
                    keyName = "נקז חזה";
                else if (treatments[i].id == 7)
                    keyName = "תחבושת אישית";

                lines.push({key : keyName,
                            values: params,
                            type: 'line',
                            yAxis: 1,});
            }

            $scope.treatsStockTimeData = lines;
        });
    });

     $scope.lineChartOptions = {
        chart:
        {
            type: 'multiChart',
            height: 300,
            width: 700,
            margin: {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            x: function(d){return d.x},
            y: function(d){return d.y},            
            color: function(d, i) {
                var colorArray = ['#ee4035', '#f37736' ,'#fdf498', '#7bc043', '#0392cf', '#be29ec'];        
                return colorArray[i];        
            },
            duration: 500, 
            useInteractiveGuideLine: true,                   
            xAxis:
            {
                axisLable: 'זמן',            
                tickFormat: function(d){
                    return d3.time.format('%d/%m %H:%M')(new Date(d));
                }
            },
            yAxis:
            { 
                axisLable: 'כמות טיפולים במלאי',                
                axisLabelDistance: 0
            },
            noData: "אין נתונים"
        }        
    };

    $scope.colorArray = ['#008000','#800000'];
    
    $scope.colorFunction = function() {
        return function(d,i){
            return $scope.colorArray[i];
        }
    }
    
    $scope.options = {
        chart:
        {
            type: 'pieChart',
            height: 150,
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
            valueFormat: d3.format('d'),
            legend: {
                margin:
                {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            },
            noData: "אין נתונים"
        }        
    };   
}]);