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
        $treatsStockTimeData = emptyChart;

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

        debugger;

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

     $scope.lineChartOptions = {
        chart:
        {
            type: 'multiChart',
            height: 400,
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
                var colorArray = ['#132639', '#25517e', '#00d4ff', '#004aff', '#06a5c6', '#5d6ea9'];                
                return colorArray[i];        
            },
            duration: 500, 
            useInteractiveGuideLine: true,                   
            xAxis:
            {
                axisLable: 'זמן',            
                tickFormat: function(d){
                    return d3.time.format('%x %H:%M')(new Date(d));
                }
            },
            yAxis:
            { 
                axisLable: 'כמות טיפולים במלאי',                
                axisLabelDistance: 0
            }
        }        
    };

    $scope.colorArray = ['#494d1b','#a63807'];
    
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