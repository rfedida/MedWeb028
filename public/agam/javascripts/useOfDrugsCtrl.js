myApp.controller('useOfDrugsCtrl', ['$scope','$http','unitIDService', function($scope,$http,unitIDService) {   
    $scope.unit = unitIDService.unitDetails;
    $scope.$watch('unit.unitID', function() {

        $http.get("/crud/units/" + $scope.unit.unitID).then(function(response){
            var medications = response.data.Medications;

            $scope.dataDormikom = [];
            $scope.dataHexakapron = [];
            $scope.dataAkamol = [];
            $scope.dataKetamine = [];
            $scope.dataPantenyl = [];
            $scope.dataMorphium = [];
            $scope.drugsStockTimeData = [];

            $scope.mlay;
            
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