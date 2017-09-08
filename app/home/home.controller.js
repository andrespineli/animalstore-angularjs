angular.module('animalStoreApp')
  .controller('HomeCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location) {

    $scope.getClinicAndStatistics = function () {      
  		$http.get(Api.setUriAndReturnAddress('clinics/statistics'))
  		.then(function onSuccess(response) {		
        $rootScope.clinic = response.data.clinic;
        $rootScope.statistics = response.data.statistics;          
  		})
  		.catch(function onError(response) {		   
          console.log(response);
  		});
    }

  });
