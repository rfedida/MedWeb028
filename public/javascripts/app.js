var myApp = angular.module('myApp', ['nvd3']);
myApp.controller('musicController', function musicController($scope, $http) {
    $http.get('\Songs').then(function(data){
        $scope.songs = data.data;
    }); 

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
            key: 'one',
            y: 5
        },
        {
            key: 'two',
            y: 2
        },
        {
            key: 'three',
            y: 7
        }
    ];
});

myApp.directive('songDir', function(){
    
    return{
        template:'Name: {{song.songName}} singer: {{song.singer}}'
    }
});