angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http', 
                                                '$interval', 'ModalService', '$sce',
    function InjuredController($scope, medAppFactory, $http, $interval, ModalService, $sce) {
        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;
        $scope.selectedTab = 1;

        $scope.SaveInj = function() 
        {
            $http.post('/crud/saveInj/' +  $scope.injured).then(function(response)
            {
                
            });
        };

        $scope.changeTab = function(tabNum) 
        {
            $scope.selectedTab = tabNum;
        };




        /*************  Gil  ************/
        refresh();


    $scope.treatments = $scope.injured.treatments;
    debugger;

    function refresh($scope){
        $interval(function(){}, 60000);
    }

    $scope.calcDateDiff = function(dateTime){
    
        var dateBefore = new Date(dateTime.replace('T',':').split('.')[0]);
        var timeDiffByMinutes = Math.ceil(Math.abs((new Date().getTime() - 
                                            dateBefore.getTime()) * 
                                            (1.667 * Math.pow(10,-5))));
        var hoursDiff = "" + Math.floor(timeDiffByMinutes / 60);
        var minutesDiff = "" +  Math.abs(timeDiffByMinutes % 60);

        var pad = "00";
    
        return (pad.substring(0, pad.length - hoursDiff.length) + hoursDiff +
                 ':' + 
                pad.substring(0, pad.length - minutesDiff.
                length) + minutesDiff);
    }

    $scope.Alo = [{"1":"GIL"},{"2":"2"},{"3":"3"},{"4":"4"}];

    $scope.showComplex = function() {
    var url = $sce.getTrustedResourceUrl(app.remote + "/med/views/operationModal.html");
    ModalService.showModal({
      templateUrl: url,
      controller: "ComplexControllerOperation",
      inputs: {
        title: "הוספת טיפול"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result){
          var newUser = angular.copy(medAppFactory.newInjured);
          newUser.Bracelet_id = result.braceId;
          newUser.Stations.ReceptionDate = result.date;
          newUser.Stations.ReceptionTime = result.time;
          medAppFactory.currentInjured = newUser;

      });
    });
};
    }]);
   
angular.module("medApp").controller('ComplexControllerOperation', [
  '$scope', '$element', '$filter', 'title', 'close', 
  function($scope, $element, $filter, title, close) {

  $scope.braceId = null;
  $scope.date = $filter('date')(Date.now(), 'yyyy-MM-dd');
  //$scope.time = $filter('time')(Date.now(), 'hh:mm:ss a');
  $scope.time = null;
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
    
  }
}]);