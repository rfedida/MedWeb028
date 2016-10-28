var app = angular.module("medApp", ["ngRoute","angularModalService", "ui.toggle"]);


app.config(['$routeProvider', 
function($routeProvider){
	$routeProvider
		.when('/', {
		templateUrl: "/med/views/tmz.html"
		})
		.when('/injInfo', {
		templateUrl: "/med/views/injInfo.html"
		})
		.when('/medSchema', {
		templateUrl: "/med/views/medSchema.html"
		});
}]);


angular.module("medApp").factory('medAppFactory', function($http)
{
	var factory = {};

	factory.currentInjured = {
        "Bracelet_id": "920140140",
        "IsDead":false,
    "General_Data" :{
                        "Emergency": 0, // 0 - Undifiened, 1 - no emergency, 2 - emenrgency
                        "Breathing_hit": false,
                        "Airway_hit": false,
                        "Shock": false,
                        "Injury_mechanism": "Abach",
                        "Consciousness": "P",  // Enum - A O V P L
                        "Injury_place_in_body": "רגל ימין"
                    },
    "Treatments": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "1", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "5", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "7", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "8", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }],

    "Medications": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Medication_id": "10", // From Medications Enum
                        "Dosage": "10",
                        "Dosage_type": "mg",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Medication_id": "12", // From Medications Enum
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
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Liquid_id": "123", // From Liquids Enum
                        "Dosage": "10",
                        "Dosage_type": "mg",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }, 
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Liquid_id": "456", // From Liquids Enum
                        "Dosage": "15",
                        "Dosage_type": "cc",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }
                    ],
  "Measurements": {
                    "Temperatures": [{"Timestamp": "06072016183000",
                                     "Temperature": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Temperature": "41" }],

                    "Storations": [{"Timestamp": "06072016183000",
                                     "Storation": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Storation": "41" }],

                    "Bloodpressures": [{"Timestamp": "06072016183000",
                                     "Bloodpressure": "40" },
                                     {"Timestamp": "06072016183100",
                                     "Bloodpressure": "41" }],

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

	factory.treatmentsMed = 
    {
        "0": {name: "A.W", group:"A"},
        "1": {name: "קוניוטו", group:"A"}, 
        "2": {name: "איטוב", group:"A"},
        "3": {name: "N.A", group:"B"},
        "4": {name: "נקז חזה", group:"B"},
        "5": {name: "C.A.T", group:"B"},
        "6": {name: "BIG", group:"C"},
        "7": {name: "Combat Gauze", group:"C"},
        "8": {name: "AVPU", group:"D"},
        "9": {name: "AT"},
        "10": {name: "Vygon"},
        "11": {name: "Ketamine"},
        "12": {name: "Morphium"},
        "13": {name: "Dormikom"},
        "14": {name: "Hexakapron"},
        "15": {name: "Pantenyl"},
        "16": {name: "Akamol"},
        "17": {name: "nonTREAT"}
};


	return factory;
});

app.controller('GIL', function($scope, $location){
	$scope.message = 'AAA';
	$scope.path = "start";
	$scope.go = function(path){
		$scope.path=path;
		$location.path = path;
	}
});
