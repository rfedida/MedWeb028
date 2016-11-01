myApp.controller('statisticController', function($scope, $http) {

    $scope.colorArray = ['#b3c6ff', '#668cff' ,'#1a53ff', '#002699', '#00134d', '#00061a']; 

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
                return $scope.colorArray[i];        
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
            height: 250,
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

    $scope.injuryMechanismTimeData = [];
    $http.get("/crud/patientsInjuryMechanismByTime").success(function(data){
        $scope.injuryMechanismTimeData = $scope.buildData(data);
    }).error(function(data){
        console.log(data);
    }); 

    $scope.buildData = function(data){    
        var keys = [];

        for (var index in data) {
            if (!(data[index]._id.key in keys)) {
                keys[data[index]._id.key] = data[index]._id.key;
            }
        }

        var newData = [];

        for (var index in keys) {
            var injuryValues = [];

            for (var innerIndex in data) {
                if (data[innerIndex]._id.key == keys[index]) {
                    injuryValues.push({
                        x: $scope.roundMinutes(new Date(parseInt(data[innerIndex]._id.x))),
                        y: data[innerIndex].y
                    });
                }
            }

            newData.push({
                key: keys[index],
                type: 'line',
                yAxis: 1,
                values: injuryValues
            });
        }        

        return newData;
    };

});

