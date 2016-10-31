

angular.module("medApp").controller('WoundedListController', ['$scope', 'ModalService','medAppFactory', '$location', '$sce', '$http',
function($scope, ModalService, medAppFactory, $location, $sce, $http)  {

  // HEADER
  medAppFactory.getStationName().then(function(res)
  {
    $scope.currentStationName = medAppFactory.currentStationName;
  });

  // TABLE

  // get woundeds
  $scope.woundeds = null;    
  $http.get("/crud/patients/units/" + medAppFactory.currentStation).then(function(response){
    $scope.woundeds = response.data;
  });
  
  // order by func to table
  $scope.myFilter = function (wounded){
    return wounded.status == '1' || wounded.status == '2';
  };

  // Move by click on div to schema
  $scope.moveToSchema = function(id) {
      $http.get("/crud/patients/" + id).then(function(response)
      {
         medAppFactory.currentInjured = response.data;
         $location.path("/medSchema");
      });
  };

  // MODAL
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

          // get date by mili
          var fullDate = result.date + ":" + result.time;
          var dateBefore = new Date(fullDate);
          var dateMili = dateBefore.getTime();

          // create new patient object by factory
          var newInjured = angular.copy(medAppFactory.newInjured);
          newInjured.braceletId = result.braceId;
          newInjured.LastUpdate = dateMili;
          newInjured.Stations.receptionTime = dateMili;
          medAppFactory.currentInjured = newInjured;

          // insert the new patient to the db
          $http.post('/crud/patients' , { "patient": newInjured }).then(function(response)
          {});

          // move to injured info screen 
          $location.path("/injInfo");
      });
    });
  };

}]);

// Modal controller
angular.module("medApp").controller('ComplexController', [
  '$scope', '$element', '$filter', 'title', 'close', 
  function($scope, $element, $filter, title, close) {

  var currDate = new Date();
  var h = currDate.getHours();
  var m = currDate.getMinutes();
  
  // Current time
  if (h < 10){
    h = "0" + h;
  }

  if (m < 10){
    m = "0" + m;
  }

  var currTime = h + ":" + m;
  $scope.time = currTime;

  // Current date

  /*var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10){
    dd='0'+ dd;
  }
  if (mm < 10){
    mm = '0'+ mm;
  }

  var today = dd+"/"+mm+"/"+yyyy;
  $scope.date = today;*/

  $scope.date = $filter('date')(Date.now(), 'yyyy-MM-dd');

  $scope.braceId = null;
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
 