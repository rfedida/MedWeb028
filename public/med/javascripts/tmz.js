
angular.module("medApp").controller('WoundedListController', ['$scope', 'ModalService', function($scope, ModalService)  {

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

$scope.complexResult = null;
$scope.showComplex = function() {

    ModalService.showModal({
      templateUrl: "/med/views/modalTmz.html",
      controller: "ComplexController",
      inputs: {
        title: "A More Complex Example"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });
};

}]);

angular.module("medApp").controller('ComplexController', [
  '$scope', '$element', 'title', 'close', 
  function($scope, $element, title, close) {

  $scope.name = null;
  $scope.age = null;
  $scope.title = title;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);
