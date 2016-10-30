myApp.controller('statisticController', function($scope, $http) {

    $scope.roundMinutes = function(date){
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0);

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
        var newData = [];


        for (var index in data)
        {
            console.log(new Date(data[index].x[0]));
            newData.push({
                key: data[index].key,
                type: 'line',
                yAxis: 1,
                values: [
                    {
                        x: '2016-10-30T10:09:48.282Z',
                        y: 1
                    }
                ]
            });
        }
        
        // var newData = [
        // {
        //     key:'ראש',
        //     type: 'line',
        //     yAxis: 1,
        //     values:[
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T10:09:48.282Z')),
        //             y:1
        //         },
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T10:49:48.282Z')),
        //             y:2
        //         },
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T11:54:48.282Z')),
        //             y:2
        //         },
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T13:19:48.282Z')),
        //             y:1
        //         },
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T13:49:48.282Z')),
        //             y:2
        //         }
        //     ]           
        // },
        // {
        //     key:'רגל',
        //     type: 'line',
        //     yAxis: 1,
        //     values:[
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T13:49:48.282Z')),
        //             y:1  
        //         },
        //         {
        //             x:$scope.roundMinutes(new Date('2016-10-30T14:49:48.282Z')),
        //             y:3
        //         }
        //     ]              
        // }
        // ];

        return newData;
    };

});

