var myApp = angular.module('myApp', ['nvd3', 'treeControl', 'leaflet-directive']);
myApp.controller('statisticController', function ($scope, $http) {
    $scope.treeInd = true;
$scope.window = "col-md-6";
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

    
    $scope.treeEvent = function(){
        $scope.treeInd = !$scope.treeInd;
       
        if ( $scope.window == "col-md-6"){
             $scope.window = "col-md-8";
        }else{
            $scope.window = "col-md-6"
        }
    }
});
myApp.controller('unitsTreeController', function ($scope, $http) {
      $scope.treeOptions = {
          nodeChildren: "children",
          dirSelectable: true,
          injectClasses: {
              ul: "a1",
              li: "a2",
              liSelected: "a7",
              iExpanded: "a3",
              iCollapsed: "a4",
              iLeaf: "a5",
              label: "a6",
              labelSelected: "a8"
          }
      }
      $scope.dataForTheTree = 
      [
          {"name" : "Joe", "age" : "21", "children" : [
              {"name" : "Smith", "age" : "42", "children" : []},
              {"name" : "Gary", "age" : "21", "children" : [
                  {"name" : "Jenifer", "age" : "23", "children" : [
                      {"name" : "Dani", "age" : "32", "children" : []},
                      {"name" : "Max", "age" : "34", "children" : []}
                  ]}
              ]}
          ]},
          {"name" : "Albert", "age" : "33", "children" : []},
          {"name" : "Ron", "age" : "29", "children" : []}
      ];
});
