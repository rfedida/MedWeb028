myApp.controller('modalController', ['$scope', 'ModalService', '$http', 'currentUser',
function($scope, ModalService, $http, currentUser) {
    $scope.showComplex = function() {

        var url = "/agam/views/hamalView.html";
        ModalService.showModal({
        templateUrl: url,
        controller: "hamalController",
        inputs: {
            title: "פצוע חדש"
        }
        }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result){
            var newInjured = angular.copy(medAppFactory.newInjured);
            newInjured.Bracelet_id = result.braceId;
            newInjured.Stations.ReceptionDate = result.date;
            newInjured.Stations.ReceptionTime = result.time;
            medAppFactory.currentInjured = newInjured;
        });
        });
    };

    $scope.logout = function(){
        currentUser.logout();
    }
}]);

 myApp.controller('hamalController', ['$scope', '$http',  function($scope, $http){
     
     var tableData = [];
     
     $http.get('/agam/allPatientsAmount/1_1_1').success(function(resultPatients){        
         $http.get('/agam/units/1_1_1').success(function(resultUnits){
             // Set the units info for the right way
             var units = {};   
             resultUnits.forEach(function(unit) {
                 units[unit.id]= {name: unit.name ,capacity: unit.Max_Capacity };
             }, this);    

             var injuryNames = ["unknown", "not urgent", "urgent", "dead"];
 
             // Go over all the patients 
             for (var currUnit in units)           
             {
                 var newUnit = {};
                 var sum = 0;
 
                 // Go on all the injury types
                 for (var i = 0; i < 4; i++)
                 {
                     var index = doesExist(resultPatients[i].values, currUnit);
 
                     if (index > -1)
                     {
                         newUnit[injuryNames[i]] = resultPatients[i].values[index].y;
                         sum += resultPatients[i].values[index].y;
                     }
                 }
 
                 newUnit["totalPatients"] = sum;
                 newUnit["maxCapacity"] = units[currUnit].capacity;
                 newUnit["Precent"] = Math.floor((sum / units[currUnit].capacity) * 100).toString() + '%';
                 newUnit["prediction"] = "?";
                 newUnit["name"] = units[currUnit].name;
                 tableData.push(newUnit);
             };  
 
             $scope.dataset = tableData;
         });        
     });
 
 }]);
 
 
 function doesExist(data, unitId)
 {
     var found = -1;
 
     for (var i=0; i <data.length; i++)
     {
         if (data[i].x == unitId)
         {
             found = i;
             break;
         }
     }
 
     return (found);       
 } 
