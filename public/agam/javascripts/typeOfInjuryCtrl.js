myApp.controller('statisticController', function($scope, $http) {
    $scope.pieChartOptions = {
        chart:
        {
           type: 'pieChart',
            height: 350,
            width: 350,
            x: function(d){return d.key},
            y: function(d){return d.y},
            color: function(d, i) {
                var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FFE6E6'];                 
                return colorArray[i];        
            },
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
            },
            callback: function(){
                d3.selectAll('.nv-legend-text').style('fill', 'black');            
                d3.selectAll('.nv-pieLabels text').style('fill', 'black');                
            }
        }        
    };  

    $scope.lineChartOptions = {
        chart:
        {
            type: 'multiChart',
            height: 300,
            width: 300,
            margin: {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            x: function(d){return new Date(d.x)},
            y: function(d){return d.y},
            color: function(d, i) {
                var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FFE6E6'];                 
                return colorArray[i];        
            },
            duration: 500,            
            xAxis:
            {
                axisLable: 'זמן',
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

    $scope.data = [
        {
            key:'ראש',
            type: 'line',
            yAxis: 1,
            values:[
                {
                    x:'11/04/2011 11:12:00',
                    y:1
                },
                {
                    x:'11/04/2011 12:15:00',
                    y:2
                },
                {
                    x:'11/04/2011 13:12:00',
                    y:1
                },
                {
                    x:'11/04/2011 14:15:00',
                    y:2
                }
            ]           
        },
        {
            key:'רגל',
            type: 'line',
            yAxis: 1,
            values:[
                {
                    x:'11/04/2011 11:12:00',
                    y:2  
                },
                {
                    x:'11/04/2011 13:12:00',
                    y:3
                }
            ]              
        }
    ];

    $scope.injuryMechanismData = [];
    $http.get("/crud/injuryMechanism").success(function(data){
        $scope.injuryMechanismData = data; 
    }).error(function(data){
        console.log(data);
    });
    
    
   $scope.injuryLocationData = [];
    $http.get("/crud/patientsInjuryLocation").success(function(data){
        $scope.injuryLocationData = data;
    }).error(function(data){
        console.log(data);
    }); 
});

