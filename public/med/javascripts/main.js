var app = angular.module("medApp", ["ngRoute", "angularModalService", "ui.toggle", "ngSanitize", "infra", "ngMaterial","nvd3"]);

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
		}).when('/commandTmz', {
		templateUrl: app.remote + "/med/views/commandTmz.html"
    	});
}]);
angular.module("medApp").factory('medAppFactory', function ($http, currentUser, $location, $rootScope) {
    var factory = {};

    // currentUser.details.permission;
    factory.currentStation = currentUser.getDetails().permission;


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

    factory.currentStation = currentUser.getDetails().permission;
    factory.currentCommandNumber = (factory.currentStation.match(/_/g) || []).length;

    // 0 - unknwon, not-urgent, urgent, dead
    factory.EMERGENCY_CONSTANTS = {
        // לא נקבע
        "unknwon" : {
            "value" : "0",
            "hebrew" : "לא סווג"
        }, 
        // לא דחוף
        "notUrgent" :
        {
            "value" : "1",
            "hebrew" : "לא דחוף"
        },
        //דחוף 
        "urgent" :{
            "value" : "2",
            "hebrew" : "דחוף"
        },
        //חלל
        "dead" :{
            "value" : "3",
            "hebrew" : "חלל"
        }, 
        // במעבר
        "passage": {
            "value" : "4",
            "hebrew" : "במעבר"
        }                          
    };

        factory.newInjured = {
        "braceletId" : "",
        "CurrentStation" : factory.currentStation,
        "LastUpdate" : 0,
        "generalData" : {
            "emergency" : 0,
            "breathingHit" : true,
            "airwayHit" : true,
            "shock" : true,
            "injuryMechanism" : 2,
            "consciousness" : "P",
            "injuryLocation" : "",
            "comments" : ""
        },
        "treatments" : [],
        "medications" : [],
        "liquids" : [],
        "measurements" : {
            "temperatures" : [],
            "storations" : [],
            "bloodPressures" : [],
            "heartbeat" : []
        },
        "Stations" : [
            {
                "receptionTime" : 0,
                "stationId" : factory.currentStation,
                "leavingDate" : 0
            }
        ]
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


    factory.newTreatment = {
        date: new Date().getTime(),
        treatmentType: "",
        location: "",
        bloodPressure: "",
        heartbeat: "",
        temperature: "",
        storation: ""
    };

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
    factory.getCommand = function()
    {
        return $http.get("/crud/units/" + factory.currentStation.substring(0, factory.currentStation.lastIndexOf('_')))
        .then(function(res)
        {
            factory.currentCommand = res.data.name;
        });

    }

    factory.navagationBarFull =  [{id: "0", location: "/commandTmz"}, // pikud
                                  {id: "1", location: "/commandTmz"}, // ogda
                                  {id: "2", location: "/commandTmz"}, // hativa
                                  {id: "3", location: "/tmz"}] // plhak / tmz

    factory.currentNavagationBar = [{name:'', location:'', currentStation: '', parentCurrentStation: ''}];

    factory.stepIntoUnit = function (unit) {

            var unitIdToStepInto;

            // If the unit is defined -> push the current station and name into factory(for drealdown)
            if (unit != undefined) 
            {
                var amountUnderscore;
                if(!unit.id)
                    amountUnderscore = (unit.currentStation.match(/_/g) || []).length;
                    else
                    amountUnderscore = (unit.id.match(/_/g) || []).length;
                 var jsnToPush = {};
                 var length = factory.currentNavagationBar.length;
                 if (amountUnderscore == 3) 
                 {
                    jsnToPush.location = "/tmz";
              
                 }
                else {
                    jsnToPush.location = "/commandTmz";
                }
                 if(!unit.id)
                   unitIdToStepInto = jsnToPush.currentStation = factory.currentStation = unit.currentStation;
                else
                    unitIdToStepInto = jsnToPush.currentStation = factory.currentStation = unit.id;
                      
                    jsnToPush.name = factory.currentStationName = unit.name;
                    jsnToPush.parentCurrentStation = factory.currentNavagationBar[length-1].name; 

                    var isAlreadyExist = false;
                    factory.currentNavagationBar.forEach(function (x){
                        if (x.currentStation==unitIdToStepInto)
                            isAlreadyExist = true
                    });

                    if (!isAlreadyExist) {    
                        factory.currentNavagationBar.push(jsnToPush);
                    }
                    $location.path(jsnToPush.location);
            }
            else {
                unitIdToStepInto = factory.currentStation;
            }

            // Get all unit under current units
            $http.get("/crud/units/" + unitIdToStepInto + "/units").then(function(res)
            {
                factory.unitsUnderCommand = res.data;
                $rootScope.$broadcast('changePage');
            });
        }

    return factory;
});


app.controller('medViewCtrl',  function ($scope, $location, medAppFactory, $interval, $http, currentUser) 
{
    $scope.currentCommandNumber = medAppFactory.currentCommandNumber;
    $scope.currentStaionNameNavagationBarFull = medAppFactory.navagationBarFull;

    $scope.currentNavagationBar = medAppFactory.currentNavagationBar;
                                          
    $scope.logout = function(){
        currentUser.logout();            
    };

    $scope.logout = function () {
        currentUser.logout();
    };

    medAppFactory.getCommand().then(function (response) {
        $scope.currentCommand = medAppFactory.currentCommand;
    });


    medAppFactory.getStationName().then(function(res)
    {

        var amountLine = (medAppFactory.currentStation.match(/_/g) || []).length;
        $scope.currentNavagationBar[0].name = medAppFactory.currentStationName;  
        $scope.currentNavagationBar[0].location =  medAppFactory.navagationBarFull[amountLine].location;
        $scope.currentNavagationBar[0].currentStation =  medAppFactory.currentStation;
        if(!amountLine)
            $scope.currentNavagationBar[0].parentCurrentStation =  medAppFactory.currentStationName;
        else
            $scope.currentNavagationBar[0].parentCurrentStation =  medAppFactory.currentCommand;

        $location.path($scope.currentNavagationBar[0].location);
    });

    $scope.changePage  = function (index)
    {
        medAppFactory.currentNavagationBar.splice(index + 1);
        $location.path($scope.currentNavagationBar[$scope.currentNavagationBar.length - 1].location);
        
        medAppFactory.currentStation = 
                $scope.currentNavagationBar[$scope.currentNavagationBar.length - 1].currentStation;
                 medAppFactory.stepIntoUnit(medAppFactory.currentNavagationBar[medAppFactory.currentNavagationBar.length-1]);
    }

    function checkInput(){
        $interval(function(){
            $http.get('/crud/newPatient').then(function(response){
                if(response.data != "")
                {

                    medAppFactory.currentInjured = response.data;
                    $location.path("/medSchema");
                }
            });
        }, 3000);
    }

    checkInput();

});


