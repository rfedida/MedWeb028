var app = angular.module("medApp", ["ngRoute", "angularModalService", "ui.toggle", "ngSanitize"]);
app.remote="";

app.config(['$routeProvider', '$sceDelegateProvider',
function($routeProvider, $sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
        'http://127.0.0.1:9000/**',
        'self'
    ]);
    $routeProvider
		.when('/injInfo', {
		templateUrl: app.remote + "/med/views/injInfo.html"
		})
		.when('/medSchema', {
		templateUrl: app.remote + "/med/views/medSchema.html"
		}).when('/tmz', {
		templateUrl: app.remote + "/med/views/tmz.html"
		});
}]);


angular.module("medApp").factory('medAppFactory', function ($http) {
    var factory = {};

    factory.currentStation = "1_1_1_1";
    factory.newInjured = {
        "Bracelet_id": "",
        "IsDead":false,
    "General_Data" :{
                        "Emergency": 0, // 0 - Undifiened, 1 - no emergency, 2 - emenrgency
                        "Breathing_hit": false,
                        "Airway_hit": false,
                        "Shock": false,
                        "Injury_mechanism": "",
                        "Consciousness": "",  // Enum - A O V P L
                        "Injury_place_in_body": ""
                            },
            "Treatments": [],

            "Medications": [],

        "Liquids": [],
        "Measurements": {
                    "Temperatures": [],

                    "Storations": [],

                    "Bloodpressures": [],

                    "Heartbeat": []

                  },
    "Stations":[{
                    "ReceptionDate": "",
                    "ReceptionTime": "",
                    "StationId": "",
                    "LeavingDate":"", 
                    "LeavingTime": "" //Evacucation time
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
        "17": {name: "nonTREAT"},
        "18": {name: "מים"},
        "19": {name: "דם"}
};

    factory.currentInjured = {};

      /*  "Bracelet_id": "920140140",
        "IsDead": false,
        "General_Data": {
            "Emergency": 1, // 0 - Undifiened, 1 - no emergency, 2 - emenrgency
            "Breathing_hit": false,
            "Airway_hit": true,
            "Shock": false,
            "Injury_mechanism": 2,
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
                        "Treatment_type": "2", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "3", // From Treatments Enum
                        "Place_in_body": "רגל ימין",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    },
                    {
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Treatment_type": "0", // From Treatments Enum
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
            "Blood_Preasure": "110/90",
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
                "Blood_Preasure": "110/90",
                "Heartbeat": "12",
                "Temperature": "44",
                "Storation": "85%"
            }],

        "Liquids": [{
                        "Date": "23/4/2015", 
                        "Time": "18:30:00",
                        "Liquid_id": "18", // From Liquids Enum
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
                        "Liquid_id": "18", // From Liquids Enum
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
                        "Liquid_id": "19", // From Liquids Enum
                        "Dosage": "15",
                        "Dosage_type": "cc",
                        "Blood_Preasure":"110/90",
                        "Heartbeat": "12",
                        "Temperature": "44",
                        "Storation": "85%"
                    }
                    ],
        "Measurements": {
            "Temperatures": [{
                "Timestamp": "06072016183000",
                "Temperature": "40"
            },
                {
                    "Timestamp": "06072016183100",
                    "Temperature": "38"
                }],

            "Storations": [{
                "Timestamp": "06072016183000",
                "Storation": "40"
            },
                {
                    "Timestamp": "06072016183100",
                    "Storation": "89"
                }],

            "Bloodpressures": [{
                "Timestamp": "06072016183000",
                "Bloodpressure": "40"
            },
                {
                    "Timestamp": "06072016183100",
                    "Bloodpressure": "41"
                }],

            "Heartbeat": [{
                "Timestamp": "06072016183000",
                "Heartbeat": "40"
            },
                {
                    "Timestamp": "06072016183100",
                    "Heartbeat": "66"
                }]

        },
        "Stations": [{
            "ReceptionDate": "20/3/2016",
            "ReceptionTime": "18:20:00",
            "StationId": "1_1_1",
            "LeavingDate": "31/3/2016",
            "LeavingTime": "8:00:00" //Evacucation time
        }]
    };*/

    factory.InjuryMechanismType = [
        { id: 0, name: "תלול מסלול" },
        { id: 1, name: "ירי" },
        { id: 2, name: "הדף" },
        { id: 3, name: "אבכ" },
        { id: 4, name: "כוויה" },
        { id: 5, name: "שאיפה" },
        { id: 6, name: "תאונת דרכים" }
    ];

    factory.currentCommand = "";
    factory.currentStationName = "";

    // checnku
    factory.getStationName = function()
    {
        return $http.get("/crud/units/" + factory.currentStation).then(function(res)
        {
            factory.currentStationName = res.data.name;
        });
    }
  
    // Check after insert to DB;
    factory.getCommand = function()
    {
        return $http.get("/crud/units/" + factory.currentStation.substring(0, factory.currentStation.indexOf('_')))
        .then(function(res)
        {
            factory.currentCommand = res.data.name;
            factory.currentCommand = "פיקוד צפון";
        });
    }

    // lior - login
    factory.getRole = function()
    {
        return $http.get("/crud/units/" + factory.currentStation.substring(0, factory.currentStation.indexOf('_')))
        .then(function(res)
        {
            factory.currentStation = "1_1_1_1";
        });
    }

    return factory;
});

app.controller('medViewCtrl',  function ($scope, $location, medAppFactory) 
{

    medAppFactory.getCommand().then(function (response)
    {
        $scope.currentCommand = medAppFactory.currentCommand;
    });

    medAppFactory.getRole().then(function(res)
    {
        var amountLine = (medAppFactory.currentStation.match(/_/g) || []).length;
        if(amountLine == 0 || amountLine == 1)
        {
            $location.path("/injInfo");
        }
        else
        {
            $location.path("/tmz");
        }
    });
});
