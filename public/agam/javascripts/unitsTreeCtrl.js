myApp.controller('unitsTreeController', function ($scope, $http) {
    $scope.treeInd = true;
    $scope.showTree=false;
    $scope.sizestatic = "col-md-8";
    $scope.openTree = function(){
        $scope.showTree = !$scope.showTree;
        if ($scope.sizestatic == "col-md-6"){
            $scope.sizestatic = "col-md-8";
        }else{
            $scope.sizestatic = "col-md-6";
        }
    }
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
    
    $scope.heirarchyUnits = {};
    $scope.heirarchyUnits.children = [];
    $scope.orgenizeHierarchy = function(id){
        var unit;
        var pattern = new RegExp('^'+id+'_[0-9]$');
        var result = [];
        var currentRoot = {};
        // SECOND LEVEL TREE
        for (unit in $scope.dataForTheTree){
            if ($scope.dataForTheTree[unit].id.match(pattern)){
                result.push($scope.dataForTheTree[unit]);
            }else if($scope.dataForTheTree[unit].id.match('^'+id+'$')){
               currentRoot = $scope.dataForTheTree[unit];
            }
        }
        // IF THERE IS A THIRD LEVEL
        if (result.length > 0)
        {
            currentRoot.children = [];
            // ADD FOR EACH NODE HIS SONS
            for (index in result)
            {
                var secondPattern = new RegExp('^'+result[index].id+'_[0-9]$');
                var secondHeirarchyObject = result[index];
                secondHeirarchyObject.children=[];
                for (secondUnit in $scope.dataForTheTree){
                    if ( $scope.dataForTheTree[secondUnit].id.match(secondPattern)){
                        var thirdId = $scope.dataForTheTree[secondUnit].id;
                        var thirdPattern = new RegExp('^'+$scope.dataForTheTree[secondUnit].id+'_[0-9]$');
                        var thirdHeirarchyObject = $scope.dataForTheTree[secondUnit];
                        thirdHeirarchyObject.children = [];
                        for (thirdUnit in  $scope.dataForTheTree){
                            if ( $scope.dataForTheTree[thirdUnit].id.match(thirdPattern)){
                                thirdHeirarchyObject.children.push($scope.dataForTheTree[thirdUnit]);
                            }
                        }
                        secondHeirarchyObject.children.push(thirdHeirarchyObject);
                    }
                }
                currentRoot.children.push(secondHeirarchyObject);  
            }
        }

        $scope.heirarchyUnits.children.push(currentRoot);
        $scope.dataForTheTree = $scope.heirarchyUnits.children[0];
    }

    $scope.units = [];
    $scope.user_id = '1';
    $scope.loadUnits = function(){
        $http.get('/agam/units/'+ $scope.user_id).success(function(data){
             $scope.dataForTheTree = data;
             $scope.orgenizeHierarchy($scope.user_id);
        });
    };

    $scope.loadUnits();

    $scope.loadPatients = function(unitid){
        console.log(unitid.id);
         $http.get('/agam/getPatients/'+unitid).success(function(data){
         });
    };

});
