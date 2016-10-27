var myApp = angular.module('myApp', ['nvd3', 'leaflet-directive']);
myApp.controller('musicController', function musicController($scope, $http) {
    $scope.options = {
        chart:
        {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key},
            y: function(d){return d.y},
            showLables: true,
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

    $scope.data = [
        {
            key: 'פגיעות מפשעה',
            y: 7
        },
        {
            key: 'פגיעות חזה',
            y: 36
        },
        {
            key: 'פגיעות גפיים',
            y: 8
        },
        {
            key: 'פגיעות ראש',
            y: 49
        }
    ];
});
