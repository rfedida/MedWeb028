
// module.controller(שם, מערך של כל מה שהקונטרולר תלוי בו כשהאובייקט האחרון הוא הפונקציה)
myApp.controller('mapControl', ['$scope', 'leafletData', function($scope,leafletData){
    $scope.markers = [];
    $scope.selectedMarker = null;
    var htmlAbove, htmlBelow, iconSize;

    angular.extend($scope, {
        TaagadIcon:{
            iconUrl: '../../common/img/1.png',
            iconSize: [32, 37],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        },
        HospitalIcon:{
            iconUrl: '../../common/img/2.png',
            iconSize: [32, 37],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        },
        PalhakIcon:{
            iconUrl: '../../common/img/3.png',
            iconSize: [32, 37],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        }
    });

    // Add a Marker to the map
    //geoObject - {
    //     id:??,
    //     lat:??,
    //     lng:??
    // }
    //text -
    //{
    //     urgent: int,
    //     notUrgent: int
    // }
    //name - string!  "Taagad ??"/ "Palhak ??"/ "Hospital ??"
    $scope.addMarker = function(geoObject,text,name){
        var urgentMap = {
            urgent : {
                color: "red"
            },
            notUrgent: {
                color: "green"
            }

        };
        
        $scope.markers.push({
            id: geoObject.id,
            lat:geoObject.lat,
            lng:geoObject.lng,
            clickable: geoObject.clickable,
            title:name,
            message:name,
            icon: {}
        });

        if(name.includes('Taagad')){
            $scope.markers[$scope.markers.length-1].icon = $scope.TaagadIcon;
        }
        else if(name.includes('Palhak')){
            $scope.markers[$scope.markers.length-1].icon = $scope.PalhakIcon;
        }
        else{
            $scope.markers[$scope.markers.length-1].icon = $scope.HospitalIcon;
        }		

        if(Object.keys(text).length == 2){
            htmlAbove = '<div width=100px style=text-align:center;font-weight:bold;font-size:2em;><span style=color:red;> ' + text.urgent + '  </span> + <span style=color:green;> ' + text.notUrgent + '</div>';
            iconSize = [85,0];
        }
        else{
            htmlAbove = '<div width=100px style=text-align:center;font-size:2em;font-weight:bold;><span style=color:' + urgentMap[Object.keys(text)[0]].color + '; font-size:large; font-weight:700;> ' + text[Object.keys(text)[0]] + '</span>';
            iconSize = [45,0]
        }

        angular.extend($scope, {
            divIconAbove: {
                type: 'div',
                iconSize: iconSize,
                html: htmlAbove
            }
        });	
   
        $scope.markers.push({
            lat:geoObject.lat + 0.0000005,
            lng: geoObject.lng + 0.0000005,
            icon:$scope.divIconAbove
        });
    };
    
    // on click event
    // puts the clicked marker id in $scope.markerId
    var ev = $scope.$on("leafletDirectiveMarker.click", function(event,args){
        // get the info of the marker, 'options' is the info you gave in the adding ^
        $scope.markerId = args.leafletEvent.target.options.id;
        // you need to add 'leafletData' to your controller, this gets you the map data
        // get the map
        leafletData.getMap().then(function(map) {
            // get the coordinates of the marker
            var lat = args.leafletEvent.target.options.lat;
            var lng = args.leafletEvent.target.options.lng;
            // tell the map to show a box with these bounds
            map.fitBounds([ [lat - 0.05, lng - 0.05], [lat + 0.05, lng + 0.05] ]);
        });
    });

    $scope.addMarker(
        {
            id:1,
            lat: 31,
            lng:35
        }
    ,{
        urgent:2,
        notUrgent:4
    },
    "Taagad 2");
}]);