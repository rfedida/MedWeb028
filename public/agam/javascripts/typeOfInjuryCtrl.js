myApp.controller('statisticController', function($scope, $http) {

    $scope.roundMinutes = function(date){
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0)
        date.setSeconds(0);

        return date;
    };

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
            x: function(d){return d.x},
            y: function(d){return d.y},            
            color: function(d, i) {
                var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FFE6E6'];                 
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
                axisLable: 'כמות נפגעים',                
                axisLabelDistance: 0
            }
        }        
    };

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

    $scope.injuryLocationTimeData = [];
    $http.get("/crud/patientsInjuryLocationByTime").success(function(data){
        $scope.injuryLocationTimeData = $scope.buildData(data);
    }).error(function(data){
        console.log(data);
    }); 

    $scope.buildData = function(data){        
        var locations = [];

        for (var index in data) {
            if (!(data[index]._id.key in locations)) {
                locations[data[index]._id.key] = data[index]._id.key;
            }
        }

        var newData = [];

        for (var index in locations) {
            var injuryValues = [];

            for (var innerIndex in data) {
                if (data[innerIndex]._id.key == locations[index]) {
                    injuryValues.push({
                        x: $scope.roundMinutes(new Date(parseInt(data[innerIndex]._id.x))),
                        y: data[innerIndex].y
                    });
                }
            }

            newData.push({
                key: locations[index],
                type: 'line',
                yAxis: 1,
                values: injuryValues
            });
        }        

        return newData;
    };

});

