myApp.controller('statisticController', function($scope, $http) {
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
    //trying
    $scope.injury = [];

    $http.get("/crud/injuryMechanism").success(function(data){
     $scope.injury = data;  
      

      $scope.data2 = [
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
    
    
    $scope.data1 = [
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
