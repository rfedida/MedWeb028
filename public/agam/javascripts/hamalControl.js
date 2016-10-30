myApp.controller('modalController', ['$scope', 'ModalService', '$http',
function($scope, ModalService, $http) {
    $scope.showComplex = function() {

        var url = "/agam/views/hamalView.html";
        ModalService.showModal({
        templateUrl: url,
        controller: "hamalController",
        inputs: {
            title: "פצוע חדש"
        }
        }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result){
            var newInjured = angular.copy(medAppFactory.newInjured);
            newInjured.Bracelet_id = result.braceId;
            newInjured.Stations.ReceptionDate = result.date;
            newInjured.Stations.ReceptionTime = result.time;
            medAppFactory.currentInjured = newInjured;
        });
        });
    };
}]);

myApp.controller('hamalController', ['$scope', function($scope){

}]);