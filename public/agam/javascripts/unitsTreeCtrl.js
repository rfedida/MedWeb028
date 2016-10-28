myApp.controller('unitsTreeController', function ($scope, $http) {
    $scope.treeInd = true;
    $scope.window = "col-md-6";
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
    
    $scope.units = [];
    $scope.loadUnits = function(){
        $http.get('/crud/units').success(function(data){
             $scope.dataForTheTree = data;
        });
    };

    $scope.loadUnits();

    //   [
    //       {"name" : "Joe", "age" : "21", "children" : [
    //           {"name" : "Smith", "age" : "42", "children" : []},
    //           {"name" : "Gary", "age" : "21", "children" : [
    //               {"name" : "Jenifer", "age" : "23", "children" : [
    //                   {"name" : "Dani", "age" : "32", "children" : []},
    //                   {"name" : "Max", "age" : "34", "children" : []}
    //               ]}
    //           ]}
    //       ]},
    //       {"name" : "Albert", "age" : "33", "children" : []},
    //       {"name" : "Ron", "age" : "29", "children" : []}
    //   ];

        $scope.treeEvent = function(){
        $scope.treeInd = !$scope.treeInd;
       
        if ( $scope.window == "col-md-6"){
             $scope.window = "col-md-8";
        }else{
            $scope.window = "col-md-6"
        }
    }
});
