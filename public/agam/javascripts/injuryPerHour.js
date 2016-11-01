myApp.controller('injuryPerHour', function($scope, $http) {

    $scope.lineChartOptions = {
        chart:
        {
            type: 'multiChart',
            height: 300,
            width: 300,
            margin: {
                top: 20,
                right: 50,
                bottom: 45,
                left: 50
            },
            x: function(d){return d.x},
            y: function(d){return d.y},            
            color: function(d, i) {                                
                return $scope.colorArray[i];        
            },            
            legend: {
                margin:
                {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 0
                }
            },
            duration: 500, 
            useInteractiveGuideLine: true,   
            yDomain1: [0,10],             
            xAxis:
            {
                axisLable: 'זמן',    
                displayMinMax: false,        
                tickFormat: function(d){
                    return d3.time.format('%x %H:%M')(new Date(d));
                }
            },
            yAxis:
            { 
                axisLable: 'כמות נפגעים',                
                axisLabelDistance: 0,
            }
        }        
    };



$http.get('crud/injuryPerHour').success(function(data){
    $scope.injuryPerHour = data;
}).error(function(data){
    console.log(data);
});



    

});