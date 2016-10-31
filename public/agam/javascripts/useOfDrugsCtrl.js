myApp.controller('useOfDrugsCtrl', function($scope, $http) {
    $scope.unit = '1_1_1_1';

    $http.get("/crud/units/" + $scope.unit).then(function(response){
        var medications = response.data.Medications;
        debugger;

        var emptyChart = [
            {
                key: 'אין נתונים להציג',
                x: [[]]
            }
        ];

        $scope.dataDormikom = emptyChart;
        $scope.dataHexakapron = emptyChart;
        $scope.dataAkamol = emptyChart;
        $scope.dataKetamine = emptyChart;
        $scope.dataPantenyl = emptyChart;
        $scope.dataMorphium = emptyChart;
        $scope.drugsStockTimeData = emptyChart;

        $scope.mlay;
        debugger;
        
        for (i=0; i<medications.length; i++)
        {
            $scope.mlay = medications[i].Standard - medications[i].Stock.CurrStock;

            if (medications[i].id == 13)
            {
                $scope.dataDormikom = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
            else if (medications[i].id == 14)
            {
                $scope.dataHexakapron = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
            else if (medications[i].id == 16)
            {
                $scope.dataAkamol = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
            else if (medications[i].id == 11)
            {
                $scope.dataKetamine = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
            else if (medications[i].id == 15)
            {
                $scope.dataPantenyl = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
            else if (medications[i].id == 12)
            {
                $scope.dataMorphium = [
                    {
                        key: 'במלאי',
                        y: $scope.mlay
                    },
                    {
                        key: 'שימוש',
                        y: medications[i].Stock.CurrStock
                    }
                ];
            }
        }

        // for timeline
        var lines = [];
        for (i=0; i<medications.length; i++)
        {
            medications[i].Stock.Usage.sort(function (a,b) {
                return new Date(parseInt(a)) - new Date(parseInt(b));
            });

            var countStock = medications[i].Stock.CurrStock + medications[i].Stock.Usage.length;
            var params = [];
            var currParam;

            for (j=0; j < medications[i].Stock.Usage.length; j++)
            {
                countStock--;
                currParam = {
                    "x" : medications[i].Stock.Usage[j],
                    "y" : countStock
                }

                params.push(currParam);
            }

            var keyName;
            if (medications[i].id == 13)
                keyName = "Dormikom";
            else if (medications[i].id == 14)
                keyName = "Hexakapron";
            else if (medications[i].id == 16)
                keyName = "Akamol";
            else if (medications[i].id == 11)
                keyName = "Ketamine";
            else if (medications[i].id == 15)
                keyName = "Pantenyl";
            else if (medications[i].id == 12)
                keyName = "Morphium";
                
            lines.push({key : keyName,
                        values: params,
                        type: 'line',
                        yAxis: 1,});
        }

        $scope.drugsStockTimeData = lines;
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