myApp.controller('useOfDrugsCtrl', function($scope, $http) {

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

    $scope.dataDormikom = [
        {
            key: 'מלאי',
            y: 8
        },
        {
            key: 'שימוש',
            y: 50
        }
    ];

    $scope.dataAksakafron = [
        {
            key: 'מלאי',
            y: 33
        },
        {
            key: 'שימוש',
            y: 50
        }
    ];

    $scope.dataAcamol = [
        {
            key: 'מלאי',
            y: 67
        },
        {
            key: 'שימוש',
            y: 36
        }
    ];

    $scope.dataKatmin = [
        {
            key: 'מלאי',
            y: 7
        },
        {
            key: 'שימוש',
            y: 36
        }
    ];

    $scope.dataFantil = [
        {
            key: 'מלאי',
            y: 7
        },
        {
            key: 'שימוש',
            y: 1
        }
    ];

    $scope.dataMorphium = [
        {
            key: 'מלאי',
            y: 7
        },
        {
            key: 'שימוש',
            y: 6
        }
    ];
});