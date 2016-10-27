angular.module("medApp").controller('InjuredController', function InjuredController($scope) {
  $scope.injured ={
    "Bracelet_id": "920140140",
    "IsDead":false,
    "General_Data" :{
                        "Emergency": 0, // 0 - Undifiened, 1 - no emergency, 2 - emenrgency
                        "Breathing_hit": false,
                        "Airway_hit": false,
                        "Shock": true,
                        "Injury_mechanism": "Abach",
                        "Consciousness": "P",  // Enum - A O V P L
                        "Injury_place_in_body": "רגל ימין"
                    },
    "Treatments": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "1234", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }],

    "Medications": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Medication_id": "123", // From Medications Enum
                        "Dosage": "10",
                        "Dosage_type": "mg",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }],

   "Liquids": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Liquid_id": "123", // From Liquids Enum
                        "Dosage": "10",
                        "Dosage_type": "mg",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }],
  "Measurements": {
                    "Temperatures": [{"Timestamp": "06072016183000",
                                     "Temperature": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Temperature": "41" }],

                    "Storations": [{"Timestamp": "06072016183000",
                                     "Storation": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Storation": "89" }],

                    "Bloodpressures": [{"Timestamp": "06072016183000",
                                     "Bloodpressure": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Bloodpressure": "130" }],

                    "Heartbeat": [{"Timestamp": "06072016183000",
                                     "Heartbeat": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Heartbeat": "41" }]

                  },
    "Stations":[{
                    "ReceptionDate": "20/3/2016",
                    "ReceptionTime": "18:20:00",
                    "StationId": "1_1_1",
                    "LeavingDate":"31/3/2016", 
                    "LeavingTime":"8:00:00" //Evacucation time
                }]
};
});
