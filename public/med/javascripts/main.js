var app = angular.module("medApp", ["ngRoute", "angularModalService", "ui.toggle", "ngSanitize", "infra", "ngMaterial"]);
app.remote = "";
app.config(['$routeProvider', '$sceDelegateProvider',
    function ($routeProvider, $sceDelegateProvider) {
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
angular.module("medApp").factory('medAppFactory', function ($http, currentUser) {
    var factory = {};
    factory.roleList = {
        command: "",
        ogda: "",
        hativa: "",
        tagad: ""
    };

    // currentUser.details.permission;
    factory.currentStation = currentUser.getDetails().permission;
    factory.newInjured = {
        "braceletId": "",
        "CurrentStation": factory.currentStation,
        "LastUpdate": 0,
        "generalData": {
            "emergency": 0,
            "breathingHit": true,
            "airwayHit": true,
            "shock": true,
            "injuryMechanism": 2,
            "consciousness": "P",
            "injuryLocation": "",
            "comments": ""
        },
        "treatments": [],
        "medications": [],
        "liquids": [],
        "measurements": {
            "temperatures": [],
            "storations": [],
            "bloodPressures": [],
            "heartbeat": []
        },
        "Stations": [
            {
                "receptionTime": 0,
                "stationId": factory.currentStation,
                "leavingDate": 0
            }
        ]
    };

    //Ugly solution
    factory.gTreatments = {
        "0": { name: "A.W" },
        "1": { name: "קוניוטו" },
        "2": { name: "איטוב" },
        "3": { name: "N.A" },
        "4": { name: "נקז חזה" },
        "5": { name: "C.A.T" },
        "6": { name: "BIG" },
        "7": { name: "Combat Gauze" },
        "8": { name: "AVPU" }
    };



    factory.treatmentsMed =
        {
            "0": { name: "A.W", group: "A", type: 'treatment' },
            "1": { name: "קוניוטו", group: "A", type: 'treatment' },
            "2": { name: "איטוב", group: "A", type: 'treatment' },
            "3": { name: "N.A", group: "B", type: 'treatment' },
            "4": { name: "נקז חזה", group: "B", type: 'treatment' },
            "5": { name: "C.A.T", group: "B", type: 'treatment' },
            "6": { name: "BIG", group: "C", type: 'treatment' },
            "7": { name: "Combat Gauze", group: "C", type: 'treatment' },
            "8": { name: "AVPU", group: "D", type: 'treatment' },
            "9": { name: "AT", type: 'medication' },
            "10": { name: "Vygon", type: 'medication' },
            "11": { name: "Ketamine", type: 'medication' },
            "12": { name: "Morphium", type: 'medication' },
            "13": { name: "Dormikom", type: 'medication' },
            "14": { name: "Hexakapron", type: 'medication' },
            "15": { name: "Pantenyl", type: 'medication' },
            "16": { name: "Akamol", type: 'medication' },
            "17": { name: "nonTREAT", type: 'medication' },
            "18": { name: "מים", type: 'liquid' },
            "19": { name: "דם", type: 'liquid' }
        };
    factory.currentInjured = {};

    factory.newTreatment = {
        date: new Date().getTime(),
        treatmentType: "",
        location: "",
        bloodPressure: "",
        heartbeat: "",
        temperature: "",
        storation: ""
    };

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
    factory.getStationName = function () {
        return $http.get("/crud/units/" + factory.currentStation).then(function (res) {
            factory.currentStationName = res.data.name;
        });
    }

    // Check after insert to DB;
    factory.getCommand = function () {
        return $http.get("/crud/units/" + factory.currentStation.substring(0, factory.currentStation.indexOf('_')))
            .then(function (res) {
                factory.currentCommand = res.data.name;
                //factory.currentCommand = "פיקוד צפון";
            });
    }
    // lior - login
    factory.getRole = function () {
        return $http.get("/crud/units/" + factory.currentStation.substring(0, factory.currentStation.indexOf('_')))
            .then(function (res) {
                factory.currentStation = "1_1_1_1";
            });
    }
    return factory;
});

app.controller('medViewCtrl', function ($scope, $location, medAppFactory, $interval, $http, currentUser) {
    $scope.currentStaionNameLocation = [{ name: "", location: "/injInfo" },
        { name: "", location: "/injInfo" },
        { name: "", location: "/injInfo" },
        { name: "", location: "/tmz" }];


    $scope.logout = function () {
        currentUser.logout();
    };

    medAppFactory.getCommand().then(function (response) {
        $scope.currentCommand = medAppFactory.currentCommand;
    });
    medAppFactory.getRole().then(function (res) {
        var amountLine = (medAppFactory.currentStation.match(/_/g) || []).length;
        $location.path($scope.currentStaionNameLocation[amountLine].location);
    });
    medAppFactory.getStationName().then(function (res) {
        var amountLine = (medAppFactory.currentStation.match(/_/g) || []).length;
        $scope.currentStaionNameLocation[amountLine].name = medAppFactory.currentStationName;
    });
    $scope.changeLocation = function (num) {
        $location.path($scope.currentStaionNameLocation[num].location);
    }


    function checkInput() {
        $interval(function () {
            $http.get('/crud/newPatient').then(function (response) {
                if (response.data != "") {
                    medAppFactory.currentInjured = response.data;
                    $location.path("/medSchema");
                }
            });
        }, 3000);
    }

    checkInput();

});


