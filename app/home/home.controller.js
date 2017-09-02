angular.module('animalStoreApp')
  .controller('HomeCtrl', function (Alert, Auth, Api, $scope, $http, $location) {

    $scope.getClinic = function () {      
  		$http.get(Api.setUriAndReturnAddress('clinics'))
  		.then(function onSuccess(response) {		
      	  $scope.clinic = response.data;
          $scope.$parent.clinic = response.data;
          console.log(response.data);
  		})
  		.catch(function onError(response) {		   
          console.log(response);
  		});
    }

    $scope.getClinicStatistics = function () {      
      $http.get(Api.setUriAndReturnAddress('clinics/statistics'))
      .then(function onSuccess(response) {    
          $scope.statistics = response.data;                
      })
      .catch(function onError(response) {      
          
      });
    }


  });
