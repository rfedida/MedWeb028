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
        $scope.injuryMechanismData = data; 
    //     [
    //         {
    //             key: 'תלול מסלול',
    //             y: $scope.injury
    //         },
    //         {
    //             key: 'ירי',
    //             y: 36
    //         },
    //         {
    //             key: 'אב"כ',
    //             y: 8
    //         },
    //         {
    //             key: 'כוויה',
    //             y: 49
    //         },
    //         {
    //             key: 'שאיפה',
    //             y: 49
    //         },
    //         {
    //             key: 'תאונת דרכים',
    //             y: 49
    //         }
    //    ];
    }).error(function(data){
        console.log(data);
    });
    
    
    $scope.injuryLocationData = [
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
