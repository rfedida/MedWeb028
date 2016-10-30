angular.module("medApp").controller("myController", ['$scope', 'medAppFactory', '$location', 
function($scope, medAppFactory, $location) 
{
    if(Object.keys(medAppFactory.currentInjured).length === 0)
    {
        $location.path("/");
    };

    $scope.currentInj = medAppFactory.currentInjured;
    $scope.treat_Med = medAppFactory.treatmentsMed;

           $scope.treatments = {"A": [], "B": [], "C": [], "D": []};
           $scope.medications = [];
           $scope.liquids = [];

           function divByGrp ()
           {
               for(var i=0; i<$scope.currentInj.treatments.length; i++)
               {
                   $scope.currentInj.treatments[i].name =
                                           $scope.treat_Med[$scope.currentInj.treatments[i].treatmentType].name;

                   var group =$scope.treat_Med[$scope.currentInj.treatments[i].treatmentType].group;
                   $scope.treatments[group].push($scope.currentInj.treatments[i]);
               }
           }

          function medFunc ()
           {
               for(var i=0; i<$scope.currentInj.medications.length; i++)
               {
                    $scope.currentInj.medications[i].name =
                                           $scope.treat_Med[$scope.currentInj.medications[i].medicationId].name;
                    $scope.medications.push($scope.currentInj.medications[i]);                      
               }
           };

           function liqFunc ()
           {
              var currentAmount=0;
               $scope.amountAccordingId = {};
               for(var i=0; i<$scope.currentInj.liquids.length; i++)
               {
                   if(!$scope.amountAccordingId[$scope.currentInj.liquids[i].liquidId])
                   {
                       var currentAmount = 0;
                       //name by Enum
                       $scope.currentInj.liquids[i].name =
                                           $scope.treat_Med[$scope.currentInj.liquids[i].liquidId].name;
                       var name =  $scope.currentInj.liquids[i].name;
                       //inner Json per id: amount ,type, name
                       var type = $scope.currentInj.liquids[i].dosageUnit;
                        $scope.amountAccordingId[$scope.currentInj.liquids[i].liquidId]= 
                                                           {amount:currentAmount ,type:type, name: name};
                       
                   }
                   else
                   {
                       currentAmount = $scope.amountAccordingId[$scope.currentInj.liquids[i].liquidId].amount;
                   }
                   $scope.amountAccordingId[$scope.currentInj.liquids[i].liquidId].amount =currentAmount + 
                          parseInt($scope.currentInj.liquids[i].dosage);
               }
                  for(var key in  $scope.amountAccordingId)
                  {
                      
                   $scope.liquids.push({ id:key, name:$scope.amountAccordingId[key].name,     
                        Dosage: $scope.amountAccordingId[key].amount + $scope.amountAccordingId[key].type});         
                  } 
           }

           function timeGap(date, $scope)
           {
               var newDate=new Date(date);///////
               var actionDate = new Date(newDate.split('-')[2] + '-' + 
                                date.split('-')[1] + '-' + 
                                date.split('-')[0] + ':' + 
                                time);

               var timeDiff = Math.ceil(Math.abs((new Date().getTime() - 
                                                actDate.getTime()) * (1.667 * Math.pow(10,-5))));
               var hoursDiff = Math.floor(timeDiff / 60);
               var minutesDiff = Math.abs(timeDiff % 60);

               var pad = "00";
    
              return (pad.substring(0, pad.length - hoursDiff.length) + hoursDiff +
               ':' + 
              pad.substring(0, pad.length - minutesDiff.strlength) + minutesDiff);
           }


  

    $scope.inj = {
                   "id":  $scope.currentInj.Bracelet_id,
                   "temp": $scope.currentInj.measurements.temperatures[$scope.currentInj
                            .measurements.temperatures.length-1].tempreature,
                   "HeartBeat": $scope.currentInj.measurements
                        .heartbeat[$scope.currentInj.measurements.heartbeat.length-1].Heartbeat,
                   "BloodPressure":  $scope.currentInj.measurements
                        .bloodPressures[$scope.currentInj.measurements.bloodPressures.length-1].bloodPressure,
                   "Storation":  $scope.currentInj.measurements
                        .storations[$scope.currentInj.measurements.storations.length-1].storation,
           };

         
divByGrp();
medFunc();
liqFunc();
                    

}]);