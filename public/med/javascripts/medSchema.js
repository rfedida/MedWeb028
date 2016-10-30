angular.module("medApp").controller("myController", ['$scope', 'medAppFactory', function($scope, medAppFactory) 
{
    $scope.currentInj = medAppFactory.currentInjured;
    $scope.treat_Med = medAppFactory.treatmentsMed;

           $scope.treatments = {"A": [], "B": [], "C": [], "D": []};
           $scope.medications = [];
           $scope.liquids = [];

           function divByGrp ()
           {
               for(var i=0; i<$scope.currentInj.Treatments.length; i++)
               {
                   $scope.currentInj.Treatments[i].name =
                                           $scope.treat_Med[$scope.currentInj.Treatments[i].Treatment_type].name;

                   var group =$scope.treat_Med[$scope.currentInj.Treatments[i].Treatment_type].group;
                   $scope.treatments[group].push($scope.currentInj.Treatments[i]);
               }
           }

          function medFunc ()
           {
               for(var i=0; i<$scope.currentInj.Medications.length; i++)
               {
                    $scope.currentInj.Medications[i].name =
                                           $scope.treat_Med[$scope.currentInj.Medications[i].Medication_id].name;
                    $scope.medications.push($scope.currentInj.Medications[i]);                      
               }
           };

           function liqFunc ()
           {
              var currentAmount=0;
               $scope.amountAccordingId = {};
               for(var i=0; i<$scope.currentInj.Liquids.length; i++)
               {
                   if(!$scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id])
                   {
                       var currentAmount = 0;
                       //name by Enum
                       $scope.currentInj.Liquids[i].name =
                                           $scope.treat_Med[$scope.currentInj.Liquids[i].Liquid_id].name;
                       var name =  $scope.currentInj.Liquids[i].name;
                       //inner Json per id: amount ,type, name
                       var type = $scope.currentInj.Liquids[i].Dosage_type;
                        $scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id]= 
                                                           {amount:currentAmount ,type:type, name: name};
                       
                   }
                   else
                   {
                       currentAmount = $scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id].amount;
                   }
                   $scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id].amount =currentAmount + 
                          parseInt($scope.currentInj.Liquids[i].Dosage);
               }
                  for(var key in  $scope.amountAccordingId)
                  {
                      
                   $scope.liquids.push({ id:key, name:$scope.amountAccordingId[key].name,     
                        Dosage: $scope.amountAccordingId[key].amount + $scope.amountAccordingId[key].type});         
                  } 
           }

           function timeGap(date, time, $scope)
           {
               var actionDate = new Date(date.split('-')[2] + '-' + 
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
                   "temp":  $scope.currentInj.Measurements
                        .Temperatures[$scope.currentInj.Measurements.Temperatures.length-1].Temperature,
                   "HeartBeat": $scope.currentInj.Measurements
                        .Heartbeat[$scope.currentInj.Measurements.Heartbeat.length-1].Heartbeat,
                   "BloodPressure":  $scope.currentInj.Measurements
                        .Bloodpressures[$scope.currentInj.Measurements.Bloodpressures.length-1].Bloodpressure,
                   "Storation":  $scope.currentInj.Measurements
                        .Storations[$scope.currentInj.Measurements.Storations.length-1].Storation,
           };

         
divByGrp();
medFunc();
liqFunc();
                    

}]);