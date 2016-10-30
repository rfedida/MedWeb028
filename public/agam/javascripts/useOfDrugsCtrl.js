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

        $scope.mlay;
        debugger;
//             "0": { name: "A.W", group: "A" },
//             "1": { name: "קוניוטו", group: "A" },
//             "2": { name: "איטוב", group: "A" },
//             "3": { name: "N.A", group: "B" },
//             "4": { name: "נקז חזה", group: "B" },
//             "5": { name: "C.A.T", group: "B" },
//             "6": { name: "BIG", group: "C" },
//             "7": { name: "Combat Gauze", group: "C" },
//             "8": { name: "AVPU", group: "D" },
//             "9": { name: "AT" },
//             "10": { name: "Vygon" },
//             "11": { name: "Ketamine" },
//             "12": { name: "Morphium" },
//             "13": { name: "Dormikom" },
//             "14": { name: "Hexakapron" },
//             "15": { name: "Pantenyl" },
//             "16": { name: "Akamol" },
//             "17": { name: "nonTREAT" }
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
            else if (medications[i].id == 14) // Assumming it means 'c.a.t'
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
    });

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