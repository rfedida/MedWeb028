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
           }

           function liqFunc ()
           {
               debugger;
              var currentAmount=0;
               $scope.amountAccordingId = {};
               for(var i=0; i<$scope.currentInj.Liquids.length; i++)
               {
                   if(!$scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id])
                   {
                       var currentAmount = 0;
                       var type = $scope.currentInj.Liquids[i].Dosage_type;
                        $scope.amountAccordingId[$scope.currentInj.Liquids[i].Liquid_id] = {amount:currentAmount ,type:type};
                       
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
                    $scope.liquids.push({name: key, Dosage: $scope.amountAccordingId[key].amount +  $scope.amountAccordingId[key].type });         
                  }
                                       
                
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
                    

});