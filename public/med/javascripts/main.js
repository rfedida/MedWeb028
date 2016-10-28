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
		.when('/view2', {
		templateUrl: "/med/views/view2.html"
		})
		.when('/view3', {
		templateUrl: "/med/views/view3.html"
		});
}]);


angular.module("medApp").factory('medAppFactory', function($http)
{
	var factory = {};

	factory.currentInjured = {
    "braceletId": "920140140",
    "CurrentStation":"1_1_1",
    "generalData" :{
                        "emergency": 0, // 0 - Undifiened, 1 - no emergency, 2 - emenrgency, 3 - dead
                        "breathingHit": false,
                        "airwayHit": false,
                        "shock": false,
                        "injuryMechanism": "Abach",
                        "consciousness": "P",  // Enum - A O V P L
                        "injuryLocation": "רגל ימין"
                    },
    "treatments": [{
                        "date": "23/4/2015 18:30:00", 
                        "treatmentType": "1234", // From Treatments Enum
                        "location": "רגל ימין",
                        "bloodPressure":"110/90",
                        "heartbeat": "12",
                        "temperature": "44",
                        "storation": "85%"
                    }],

    "medications": [{
                        "date": "23/4/2015 18:30:00", 
                        "medicationId": "123", // From Medications Enum
                        "dosage": "10",
                        "dosageUnit": "mg",
                        "bloodPressure":"110/90",
                        "heartbeat": "12",
                        "temperature": "44",
                        "storation": "85%"
                    }],

   "liquids": [{
                        "date": "23/4/2015 18:30:00", 
                        "liquidId": "123", // From Liquids Enum
                        "dosage": "10",
                        "dosageUnit": "mg",
                        "bloodPressure":"110/90",
                        "heartbeat": "12",
                        "temperature": "44",
                        "storation": "85%"
                    }],
  "measurements": {
                    "temperatures": [{"timestamp": "06072016183000",
                                     "tempreature": "40" },
                                     {"timestamp": "06072016183100",
                                     "tempreature": "41" }],

                    "storations": [{"timestamp": "06072016183000",
                                     "storation": "40" },
                                     {"timestamp": "06072016183100",
                                     "storation": "41" }],

                    "bloodPressures": [{"timestamp": "06072016183000",
                                     "bloodPressure": "40" },
                                     {"timestamp": "06072016183100",
                                     "bloodPressure": "41" }],

                    "heartbeat": [{"timestamp": "06072016183000",
                                     "heartbeat": "40" },
                                     {"heartbeat": "06072016183100",
                                     "Heartbeat": "41" }]

                  },
    "Stations":[{
                    "receptionTime": "20/3/2016 18:20:00",
                    "stationId": "1_1_1",
                    "leavingDate":"31/3/2016 8:00:00"
                }]
};

	factory.TreatmentsEnum = {};

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
