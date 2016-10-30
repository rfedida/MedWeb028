

angular.module("medApp").controller('WoundedListController', ['$scope', 'ModalService','medAppFactory', '$location', '$sce', '$http',
function($scope, ModalService, medAppFactory, $location, $sce, $http)  {


  $scope.woundeds = [
    {"id":"8021165", "pulse":"82", "bp":"120/30", "Saturation":"95%",status:"urgent", date:"26/10/2016", time:"11:15"},
    {"id":"6098793", "pulse":"90", "bp":"160/70", "Saturation":"95%",status:"notUrgent", date:"26/10/2016", time:"11:15"},
    {"id":"8066610", "pulse":"100", "bp":"110/20", "Saturation":"95%",status:"notClassified", date:"28/10/2016", time:"13:15"},
    {"id":"8066610", "pulse":"100", "bp":"111/20", "Saturation":"95%",status:"notClassified", date:"28/10/2016", time:"11:15"},
    {"id":"8122215", "pulse":"160", "bp":"80/100", "Saturation":"95%",status:"moved", date:"26/10/2016", time:"11:15"},
    {"id":"8021165", "pulse":"82", "bp":"120/30", "Saturation":"95%",status:"dead", date:"26/10/2016", time:"11:15"},
    {"id":"8066610", "pulse":"100", "bp":"110/20", "Saturation":"95%",status:"notUrgent", date:"26/10/2016", time:"11:15"},
    {"id":"8122215", "pulse":"160", "bp":"80/100", "Saturation":"95%",status:"dead", date:"26/10/2016", time:"11:15"},
    {"id":"8122215", "pulse":"160", "bp":"80/100", "Saturation":"95%",status:"dead", date:"26/10/2016", time:"11:15"},
    {"id":"8021165", "pulse":"82", "bp":"120/30", "Saturation":"95%",status:"moved", date:"26/10/2016", time:"11:15"},
    {"id":"8021165", "pulse":"82", "bp":"120/30", "Saturation":"95%",status:"moved", date:"26/10/2016", time:"11:15"},
    {"id":"6098793", "pulse":"90", "bp":"160/70", "Saturation":"95%",status:"notClassified", date:"28/10/2016", time:"12:15"},
    {"id":"8122215", "pulse":"160", "bp":"80/100", "Saturation":"95%",status:"urgent", date:"25/10/2016", time:"11:15"}
  ];

  $scope.injureds = null;
          
  $http.get("/crud/patients/units/" + medAppFactory.currentStation).then(function(response)
      {
         $scope.woundeds = response.data;
      });


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
      var id="920140140";
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
  var currTime = currDate.getHours() + ":" + currDate.getMinutes();

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
