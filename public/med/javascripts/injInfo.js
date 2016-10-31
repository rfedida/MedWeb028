angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http', 
                                                '$interval', 'ModalService', '$sce','currentUser',
    function InjuredController($scope, medAppFactory, $http, $interval, ModalService, $sce, currentUser) {

        $scope.injured = medAppFactory.currentInjured;
        $scope.InjuryMechanismType = medAppFactory.InjuryMechanismType;
        $scope.selectedTab = 1;

        $scope.SaveInj = function () {
            $http.put('/crud/patients', { "patient": $scope.injured }).then(function (response) {

            });
        };

        $scope.changeTab = function (tabNum) {
            $scope.selectedTab = tabNum;
        };




        /*************  Gil  ****************************************************************/
        $scope.treat_Med = medAppFactory.treatmentsMed;
        $scope.treatments = $scope.injured.treatments;
        refresh();

        $scope.getNameById = function (num) {
            return $scope.treat_Med[num].name;
        };

        function refresh($scope) {
            $interval(function () { }, 60000);
        }

        $scope.calcDateDiff = function (dateTime) {
            var dateBefore = new Date(parseInt(dateTime));
            var timeDiffByMinutes = Math.ceil(Math.abs((new Date().getTime() -
                dateBefore.getTime()) *
                (1.667 * Math.pow(10, -5))));
            var hoursDiff = "" + Math.floor(timeDiffByMinutes / 60);
            var minutesDiff = "" + Math.abs(timeDiffByMinutes % 60);

            var pad = "00";

            return (pad.substring(0, pad.length - hoursDiff.length) + hoursDiff +
                ':' +
                pad.substring(0, pad.length - minutesDiff.
                    length) + minutesDiff);
        }

        $scope.showComplex = function () {
            var url = $sce.getTrustedResourceUrl(app.remote + "/med/views/operationModal.html");
            ModalService.showModal({
                templateUrl: url,
                controller: "ComplexControllerOperation",
                inputs: {
                    title: "הוספת טיפול"
                }
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    var newTreat = angular.copy(medAppFactory.newTreatment);
                   newTreat.treatmentType = $scope.selectedTreatMed;
                    newTreat.location = $scope.treatLocation;
                    newTreat.bloodPressure = $scope.highBloodPressure + "/" + $scope.lowBloodPressure;
                    newTreat.heartbeat = $scope.heartbeat;
                    newTreat.temperature = $scope.temperature;
                    newTreat.storation = $scope.storation;
                });
                debugger;
            });
        };

/* 220.
        $scope.close = function () {
            close({
                date: new Date(),
                treatmentType: $scope.selectedTreatMed,
                location: $scope.treatLocation,
                bloodPressure: $scope.highBloodPressure + "/" + $scope.lowBloodPressure,
                heartbeat: heartbeat,
                temperature: temperature,
                storation: storation
            }, 500); // close, but give 500ms for bootstrap to animate
        };

*/

        /******************  SHIR *****************************************************************************************/
        $scope.medicationId = "medicationId";
        $scope.liquidId = "medicationId";
    }]);

angular.module("medApp").controller('ComplexControllerOperation', [
    '$scope', '$element', '$filter', 'title', 'close',
    function ($scope, $element, $filter, title, close) {

        $scope.braceId = null;
        $scope.date = $filter('date')(Date.now(), 'yyyy-MM-dd');
        //$scope.time = $filter('time')(Date.now(), 'hh:mm:ss a');
        $scope.time = null;
        $scope.title = title;

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function () {
            close({
                braceId: $scope.braceId,
                date: $scope.date,
                time: $scope.time
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function () {

            //  Manually hide the modal.
            $element.modal('hide');

        }
    }]);

angular.module("medApp").directive("presentTable", function () {
    return {
        restrict: 'E',
        scope:
        {
            tabletitle: '@',
            fieldname: '@',
            data: '=',
        },
        templateUrl: '/med/views/directiveTable.html',
        controller: "presentTableCtrl"
    };
});


angular.module("medApp").controller("presentTableCtrl", function ($scope, medAppFactory) {

    $scope.treat_Med = medAppFactory.treatmentsMed;

    $scope.getNameById = function (num) {

        return $scope.treat_Med[num].name;
    };

    $scope.calcDateDiff = function(dateTime){
        debugger;
    
        var dateBefore = new Date(parseInt(dateTime));
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
});










