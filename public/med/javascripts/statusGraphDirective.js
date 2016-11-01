angular.module("medApp").directive('statusGraph', ['medAppFactory', '$http',
    function (medAppFactory, $http) {
    
    return {
        restrict : 'EA',
        scope: {
            value: '='
        },
      //  templateURL: "../views/statusGraphDirective.html",
        template: "<nvd3 options='graphOptions' data='graphData'></nvd3>",
        link: function($scope) {

            $scope.calcStatusGraph = function () {

                var amountUnderscore = ($scope.value.match(/_/g) || []).length;
                var url = "";
                // Check if we arrived to the low level in hiracacy(3 underscores) - show the details of current command
                // else - show all patients under the current command
                if (amountUnderscore == 3){
                    url = "/crud/patients/units/" + $scope.value;
                }
                else {
                    url = "/crud/patients/underUnit/" + $scope.value;
                }

                // Get all patients by unit id
                $http.get(url).then(function(response) {
                    response.data.forEach(function(element) {

                        // Add one to current emergency according data
                        $scope.emergencyValues[$scope.emergencyEnum[element.status]]++
                        
                        // set new values
                        $scope.graphData = [{
                            key: "Cumulative Return",
                            values: [                                   
                                    {"label": medAppFactory.EMERGENCY_CONSTANTS.dead.hebrew, "value": $scope.emergencyValues.dead},
                                     {"label": medAppFactory.EMERGENCY_CONSTANTS.passage.hebrew, "value":$scope.emergencyValues.passage},
                                     {"label": medAppFactory.EMERGENCY_CONSTANTS.unknwon.hebrew, "value": $scope.emergencyValues.unknwon},
                                    {"label": medAppFactory.EMERGENCY_CONSTANTS.notUrgent.hebrew, "value":$scope.emergencyValues.notUrgent},
                                    {"label": medAppFactory.EMERGENCY_CONSTANTS.urgent.hebrew, "value": $scope.emergencyValues.urgent}
                                   ]
                        }];
                    });
                });
           }           

           $scope.calcStatusGraph();
        }, 
        controller: function ($scope, $element, $attrs) {

            $scope.emergencyValues = {
                "unknwon" : 0,
                "notUrgent" : 0,
                "urgent" : 0,
                "dead" : 0,
                "passage" : 0
            };

            $scope.emergencyEnum = {
                "0": "unknwon",
                "1": "notUrgent",
                "2": "urgent",
                "3": "dead",
                "4": "passage"                
            };

             $scope.graphOptions = {
                    chart: {
                        type: 'discreteBarChart',
                        height: 350,
                        width: 620,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 55
                        },
                        x: function(d) { return d.label; },
                        y: function(d) { return d.value; },
                        showValues: true,
                        showYAxis: false,
                        showLables: true,
                        valueFormat: function (d) {
                            return d3.format(',.0f')(d);
                        },
                        color: function(d, i) {  
                           var colorArray = ['#9E9E9E', '#5bc0de', '#FFF59D', '#5cb85c', '#ee4035'];      // 7bc043    99ff66  5cd65c rgb(3, 146, 207)      
                            return colorArray[i];        
                        },
                        transitionDuration: 50,
                        yAxis: {
                            axisLabel: 'Y Axis',
                            axisLabelDistance: 30
                        },
                        callback: function(){
                            d3.selectAll('.nv-bar positive').style('stroke', 'black');            
                         //   d3.selectAll('.nv-discretebar text').style('fill', 'black');                
                        }
                }
            }
        }
    }
}]);