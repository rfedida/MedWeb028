

angular.module("medApp").controller('WoundedListController', ['$scope', 'ModalService', 'medAppFactory', '$location', '$sce', '$http', 'filterFilter',
  function ($scope, ModalService, medAppFactory, $location, $sce, $http, filterFilter) {

    // HEADER
    medAppFactory.getStationName().then(function (res) {
      $scope.currentStationName = medAppFactory.currentStationName;
    });

    // TABLE

    // get woundeds
    $scope.woundeds = null;
    var deadArr;

    $http.get("/crud/patients/units/" + medAppFactory.currentStation).then(function (response) {
      $scope.woundeds = response.data;
      deadArr = filterFilter($scope.woundeds, { status: '3' });
    });

    // order by func to table
    $scope.myFilter = function (wounded) {
      return wounded.status == '1' || wounded.status == '2';
    };

    // Move by click on div to schema
    $scope.moveToSchema = function (id) {
      $http.get("/crud/patients/" + id).then(function (response) {
        medAppFactory.currentInjured = response.data;
        $location.path("/medSchema");
      });
    };

    // dead interval

    /*$scope.SaveInj = function () {
        $http.put('/crud/patients', { "patient": $scope.injured }).then(function (response) {
  
        });
    };
    
    function checkDead(){
          $interval(function(){
  
            $scope.SaveInj();
             
          }, 120000);
      }
  
      checkDead();*/


    // MODAL
    $scope.showComplex = function () {
      var url = $sce.getTrustedResourceUrl(app.remote + "/med/views/modalTmz.html");
      ModalService.showModal({
        templateUrl: url,
        controller: "ComplexController",
        inputs: {
          title: "פצוע חדש"
        }
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (result) {

          // get date by mili
         /* var fullDate = result.date + ":" + result.time;
          var dateBefore = new Date(fullDate);
          var dateMili = dateBefore.getTime();*/
          
          var dateMili = (new Date()).getTime();

          // create new patient object by factory
          var newInjured = angular.copy(medAppFactory.newInjured);
          newInjured.braceletId = result.braceId;
          newInjured.LastUpdate = dateMili;
          newInjured.Stations[0].receptionTime = dateMili;
          newInjured.measurements.temperatures.push({
            "timestamp": dateMili,
            "tempreature": result.tempreature
          });
          newInjured.measurements.heartbeat.push({
            "timestamp": dateMili,
            "heartbeat": result.heartbeat
          });
          newInjured.measurements.bloodPressures.push({
            "timestamp": dateMili,
            "bloodPressure": result.bloodpressure
          });
          newInjured.measurements.storations.push({
            "timestamp": dateMili,
            "storation": result.storation
          });
          medAppFactory.currentInjured = newInjured;

          // insert the new patient to the db
          $http.post('/crud/patients', { "patient": newInjured }).then(function (response)
          { });

          // move to injured info screen 
          $location.path("/injInfo");
        });
      });
    };

  }]);

// Modal controller
angular.module("medApp").controller('ComplexController', [
  '$scope', '$element', '$filter', 'title', 'close',
  function ($scope, $element, $filter, title, close) {

    var currDate = new Date();
    var h = currDate.getHours();
    var m = currDate.getMinutes();

    // Current time
    if (h < 10) {
      h = "0" + h;
    }

    if (m < 10) {
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

    $scope.braceId = Math.floor(Math.random() * 10000000) + 1  ;
    $scope.heartBeat = "1";
    $scope.lowBloodPressure = "1";
    $scope.highBloodPressure = "1";
    $scope.storation = "1";
    $scope.tempreature = "1";
    $scope.title = title;

    //  This close function doesn't need to use jQuery or bootstrap, because
    //  the button has the 'data-dismiss' attribute.
    $scope.close = function () {
      close({
        braceId: $scope.braceId,
        date: $scope.date,
        time: $scope.time,
        heartbeat: $scope.heartbeat,
        bloodpressure: $scope.highBloodPressure + "/" + $scope.lowBloodPressure,
        storation: $scope.storation,
        tempreature: $scope.tempreature
      }, 500); // close, but give 500ms for bootstrap to animate
    };

    //  This cancel function must use the bootstrap, 'modal' function because
    //  the doesn't have the 'data-dismiss' attribute.
    $scope.cancel = function () {

      //  Manually hide the modal.
      $element.modal('hide');

    };

  }]);
