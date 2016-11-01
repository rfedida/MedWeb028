
angular.module("medApp").controller('InjuredController', ['$scope', 'medAppFactory', '$http', 
                                                '$interval', 'ModalService', '$sce','currentUser', '$location',
    function InjuredController($scope, medAppFactory, $http, $interval, ModalService, $sce, currentUser, $location) {

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

        $scope.patientPassed = function() 
        {
            $scope.injured.generalData.emergency = 3;
            $scope.SaveInj();
            $location.path("/tmz");
        };

        $scope.finishTreatment = function() 
        {
            $scope.injured.generalData.emergency = 5;
            $scope.SaveInj();
            $location.path("/tmz");
        };

         $scope.transferPatient = function() 
        {
            $scope.injured.generalData.emergency = 4;
            $scope.SaveInj();
            $location.path("/tmz");
        };


/************* Start Gil  ****************************************************************/
        $scope.treat_Med = medAppFactory.treatmentsMed;
        $scope.allTreatmenrs = medAppFactory.gTreatments;
        $scope.treatments = $scope.injured.treatments;

        refresh();

        $scope.getNameById = function (num) {
            return $scope.allTreatmenrs[num].name;
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
                    newTreat.treatmentType = result.selectedTreat;
                    newTreat.location = result.treatLocation;
                    newTreat.bloodPressure =result.bloodPressure;
                    newTreat.heartbeat = result.heartbeat;
                    newTreat.temperature = result.temperature;
                    newTreat.storation = result.storation;

                    $scope.treatments.push(newTreat);

                     $http.put('/crud/patients', { "patient": $scope.injured }).then(function (response) {

                    });   
             });
                debugger;
            });
        };



    //$http.get("/crud/injuryMechanism").success(function(data){
    //    $scope.injuryMechanismData = data;
    //
    //}).error(function(data){
    //    console.log(data);
    //});

    $scope.indicatorsTrendsData = [
        {
            key: 'temperature',
            color: '#660000',
            values: [
                {x: 1, y: 36},
                {x: 2, y: 38},
                {x: 3, y: 37}
            ]
        },
        {
            key: 'saturation',
            color: '#660000',
            values: [
                {x: 1, y: 72},
                {x: 2, y: 78},
                {x: 3, y: 79}
            ]
        },
        {
            key: 'bloodPressureHigh',
            color: '#660000',
            values: [
                {x: 1, y: 120},
                {x: 2, y: 121},
                {x: 3, y: 118}
            ]
        },
        {
            key: 'bloodPressureLow',
            //color: '#660000',
            values: [
                {x: 1, y: 80},
                {x: 2, y: 81},
                {x: 3, y: 79}
            ]
        },
        {
            key: 'pulse',
            color: '#660000',
            values: [
                {x: 1, y: 70},
                {x: 2, y: 79},
                {x: 3, y: 88}
            ]
        }
    ];

   $scope.lineChartOptions = {
        chart: {
            type: 'lineChart',
            height: 350,
            width:350,
            x: function(d){return d.x},
            y: function(d){return d.y},
            color: function(d, i) {
                var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FFE6E6'];
                return colorArray[i];
            },
            showLables: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            useInteractiveGuideline: true,
            showLegend: true,
            showXAxis: true,
            showYAxis: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 100
                }
            },
            xScale: d3.time.scale(),
            xAxis: {
                axisLabel: 'WW',
                tickFormat: d3.format(',r')
            },
            yAxis: {
                axisLabel: 'WW',
                tickFormat: d3.format('0.2f')
            },
            callback: function(){
                d3.selectAll('.nv-legend-text').style('fill', 'black');
                d3.selectAll('.nv-pieLabels text').style('fill', 'black');
                //var drawArea = function() {
                //    d3.select('.nv-lineWrap')
                //        .append("path")
                //        .datum()
                //}
            }
        }
    };

/******************  SHIR *****************************************************************************************/
        $scope.medicationId = "medicationId";
        $scope.liquidId = "medicationId";
/******************  SHIR *****************************************************************************************/    

}]);

/****************** Start Gil *****************************************************************************************/

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
                selectedTreat: selectedTreat.selectedIndex,
                treatLocation: treatLocation.value,
                bloodPressure: highBloodPressure.value + "/" + lowBloodPressure.value,
                heartbeat: heartbeat.value,
                temperature: temperature.value,
                storation: storation.value + "%" 
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function () {

            //  Manually hide the modal.
            $element.modal('hide');

        }

    }]);

/****************** End Gil *****************************************************************************************/

/****************** Start SHIR *****************************************************************************************/
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
/****************** End SHIR *****************************************************************************************/









