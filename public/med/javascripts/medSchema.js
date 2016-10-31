angular.module("medApp").controller("myController", ['$scope', 'medAppFactory', '$location','$interval', '$sce','ModalService',
function($scope, medAppFactory, $location, $interval,$sce,ModalService) 
{
    if(Object.keys(medAppFactory.currentInjured).length === 0)
    {
        $location.path("/");
    };

    refresh();

    $scope.currentInj = medAppFactory.currentInjured;
    $scope.treat_Med = medAppFactory.treatmentsMed;

           $scope.treatments = {"A": [], "B": [], "C": [], "D": []};
           $scope.medications = [];
           $scope.liquids = [];

           function refresh($scope)
           {
               $interval(function(){},60000);
           }
      

           function divByGrp ()
           {
               for(var i=0; i<$scope.currentInj.treatments.length; i++)
               {
                   $scope.currentInj.treatments[i].name =
                                           $scope.treat_Med[$scope.currentInj.treatments[i].treatmentType].name;

                   var group =$scope.treat_Med[$scope.currentInj.treatments[i].treatmentType].group;
                   $scope.treatments[group].push($scope.currentInj.treatments[i]);
               }

                $scope.treatments.A.sort(function(a,b)
                 {
                     return new Date(parseInt(b.date)) - new Date(parseInt(a.date))
                 });
                 $scope.treatments.B.sort(function(a,b)
                 {
                     return new Date(parseInt(b.date)) - new Date(parseInt(a.date))
                 });
                 $scope.treatments.C.sort(function(a,b)
                 {
                     return new Date(parseInt(b.date)) - new Date(parseInt(a.date))
                 });
                 $scope.treatments.D.sort(function(a,b)
                 {
                     return new Date(parseInt(b.date)) - new Date(parseInt(a.date))
                 });
             
           }

          function medFunc ()
           {
               for(var i=0; i<$scope.currentInj.medications.length; i++)
               {
                    $scope.currentInj.medications[i].name =
                                           $scope.treat_Med[$scope.currentInj.medications[i].medicationId].name;
                    $scope.medications.push($scope.currentInj.medications[i]);                      
               }
                 $scope.medications.sort(function(a,b)
                 {
                     return new Date(parseInt(b.date)) - new Date(parseInt(a.date))
                 });
         
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

        //calculates the time gap from the moment a treatment has been given
        $scope.timeGap = function(date)
           {
               var actionDate = new Date(parseInt(date));            
               var now = new Date();
               var timeDiff = Math.ceil(Math.abs((now - actionDate.getTime()) * 
                                                 (1.667 * Math.pow(10,-5))));
               var hoursDiff = "" + Math.floor(timeDiff / 60);
               var minutesDiff = "" +  Math.abs(timeDiff % 60);

               var pad = "00";
    
              return (pad.substring(0, pad.length - hoursDiff.length) + hoursDiff +
               ':' + 
              pad.substring(0, pad.length - minutesDiff.length) + minutesDiff);

           }
    
            //popup
            $scope.showComplex = function(index) 
            {
                var url = $sce.getTrustedResourceUrl(app.remote + "/med/views/modalSchem.html");
                var data = $scope.treatments[index];
                ModalService.showModal
                ({
                    templateUrl: url,
                    controller: "ComplexControllerSchema",
                    inputs: 
                    {
                        title: "פצוע חדש",
                        data: data,
                        letter: index
                    }
                 }).then(function(modal) 
                    {
                        modal.element.modal();
                        modal.close.then(function(result)
                        {
                            /*var newInjured = angular.copy(medAppFactory.newInjured);
                            newInjured.Bracelet_id = result.braceId;
                            newInjured.Stations.ReceptionDate = result.date;
                            newInjured.Stations.ReceptionTime = result.time;
                            medAppFactory.currentInjured = newInjured;*/

                            $location.path("/medSchema");
                        });
                    });
                };


    $scope.inj = {
                   "id":  $scope.currentInj.braceletId,
                   "temp": $scope.currentInj.measurements.temperatures[$scope.currentInj
                            .measurements.temperatures.length-1].tempreature,
                   "HeartBeat": $scope.currentInj.measurements
                        .heartbeat[$scope.currentInj.measurements.heartbeat.length-1].Heartbeat,
                   "BloodPressure":  $scope.currentInj.measurements
                        .bloodPressures[$scope.currentInj.measurements.bloodPressures.length-1].bloodPressure,
                   "Storation":  $scope.currentInj.measurements
                        .storations[$scope.currentInj.measurements.storations.length-1].storation,
           };

$scope.onClick = function()
{
 $location.path("/injInfo");
}
         
divByGrp();
medFunc();
liqFunc();
                    

}]);


angular.module("medApp").controller('ComplexControllerSchema', [
  '$scope', '$element', '$filter', 'title', 'data','letter', 'close', 
  function($scope, $element, $filter, title, data,letter, close) {

debugger;
  $scope.title = title;
  $scope.treatments = data;
   $scope.letter = letter;

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({}, 500); // close, but give 500ms for bootstrap to animate
  };

   //calculates the time gap from the moment a treatment has been given
        $scope.timeGap = function(date)
           {
               var actionDate = new Date(parseInt(date));            
               var now = new Date();
               var timeDiff = Math.ceil(Math.abs((now - actionDate.getTime()) * 
                                                 (1.667 * Math.pow(10,-5))));
               var hoursDiff = "" + Math.floor(timeDiff / 60);
               var minutesDiff = "" +  Math.abs(timeDiff % 60);

               var pad = "00";
    
              return (pad.substring(0, pad.length - hoursDiff.length) + hoursDiff +
               ':' + 
              pad.substring(0, pad.length - minutesDiff.length) + minutesDiff);

           }
    

}]);
 