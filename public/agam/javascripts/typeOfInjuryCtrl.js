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

    // $scope.lineChartOptions = {
    //     chart:
    //     {
    //         type: 'lineChart',
    //         height: 350,
    //         width: 350,
    //         x: function(d){return d.key},
    //         y: function(d){return d.y},
    //         color: function(d, i) {
    //             var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FFE6E6'];                 
    //             return colorArray[i];        
    //         },
    //         duration: 500,
    //         xAxis:
    //         {
    //             axisLable: 'שעה'
    //         },
    //         yAxis:
    //         { 
    //             axisLable: 'מספר נפגעים',
    //             axisLableDistance: 0
    //         }
    //     }        
    // };
    //$http.get('./crud/patients').success(function(response) {
    //    $scope.injuryLocationData = response.data;
    //}).error(function(err){
    //    throw err;
    //});

    $scope.injury = [];
    $http.get("/crud/injuryMechanism").success(function(data){
        $scope.injury = data;
      
        $scope.injuryMechanismData = [
            {
                key: 'תלול מסלול',
                y: $scope.injury[0].generalData.emergency
            },
            {
                key: 'ירי',
                y: 36
            },
            {
                key: 'אב"כ',
                y: 8
            },
            {
                key: 'כוויה',
                y: 49
            },
            {
                key: 'שאיפה',
                y: 49
            },
            {
                key: 'תאונת דרכים',
                y: 49
            }
       ];
    }).error(function(data){
        console.log(data);
    });
    
    
    $scope.injuryLocationData = [];
    $http.get("/crud/injuryMechanism").success(function(data){
        $scope.injuryLocationData = buildData(data);
    }).error(function(data){
        console.log(data);
    }); 

function buildData(data){
        var tempData = [
                        {
                key: $scope.injury[0].generalData.injuryLocation,
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

        // for (var statIndex in currInjury.values)
        // {
        //     var currStation = currInjury.values[statIndex];
        //     injuryData.values.push({
        //         'x' : statIndex, // TODO: change to currStation.x when getting the stations is available 
        //         'y' : currStation.y
        //     });
        // }


        return tempData;
}
   
   




//       $http.get('/agam/Occupation/'+'1_1_1'
//     ).success(function(response){
//         var jsonTwo = response[1];
//             $scope.dataTwo = buildData(jsonTwo);

//     });
    
// });

// function buildData(data)
// {
//     var GoodData = [];

//     for (var index in data)
//     {
//         var currInjury = data[index];
//         var injuryData = {
//             'key' : currInjury.key,
//             'values': []
//         };
        
        
//         for (var statIndex in currInjury.values)
//         {
//             var currStation = currInjury.values[statIndex];
//             injuryData.values.push({
//                 'x' : statIndex, // TODO: change to currStation.x when getting the stations is available 
//                 'y' : currStation.y
//             });
//         }

//         GoodData.push(injuryData);
//     }

//     return (GoodData);

});

