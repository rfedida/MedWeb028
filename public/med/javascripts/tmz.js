

angular.module("medApp").controller('WoundedListController', ['$scope', 'ModalService','medAppFactory', '$location', '$sce', '$http',
function($scope, ModalService, medAppFactory, $location, $sce, $http)  {

  $scope.injureds = null;
          
  $http.get("/crud/patients/units/" + medAppFactory.currentStation).then(function(response)
      {
         $scope.woundeds = response.data;
      });


  medAppFactory.getStationName().then(function(res)
  {
    $scope.currentStationName = medAppFactory.currentStationName;
  });

$scope.myFilter = function (wounded){
return wounded.status == '1' || wounded.status == '2';
};

$scope.showComplex = function() {

    var url = $sce.getTrustedResourceUrl(app.remote + "/med/views/modalTmz.html");
    ModalService.showModal({
      templateUrl: url,
      controller: "ComplexController",
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

      $location.path("/injInfo");
      });
    });
};

$scope.moveToSchema = function(id) {
      $http.get("/crud/patients/" + id).then(function(response)
      {
         medAppFactory.currentInjured = response.data;
         $location.path("/medSchema");
      });
};

}]);

angular.module("medApp").controller('ComplexController', [
  '$scope', '$element', '$filter', 'title', 'close', 
  function($scope, $element, $filter, title, close) {

  var currDate = new Date();
  var h = currDate.getHours();
  var m = currDate.getMinutes();
  
  if (h < 10)
  {
    h = "0" + h;
  }

  if (m < 10)
  {
    m = "0" + m;
  }

  var currTime = h + ":" + m;

  $scope.braceId = null;
  $scope.date = $filter('date')(Date.now(), 'yyyy-MM-dd');
  $scope.time = currTime;
  $scope.title = title;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({   
      braceId: $scope.braceId,
      date: $scope.date,
      time: $scope.time
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
 $element.modal('hide');
    
  };

}]);
