angular.module('animalStoreApp')
.controller('PrintableCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams) {

  $scope.getServiceSheet = function () {         
    if($routeParams.animal_id){
      $http.get(Api.setUriAndReturnAddress('printable/services/' + $routeParams.animal_id))
      .then(function onSuccess(response) {    
        if (response.data == '') {
          Alert.send('Nenhum animal cadastrado', 'info', 3);
          console.log(response)                
        }
        $scope.serviceSheet = response.data;        
        setTimeout(function() {
            window.print();
            history.back();
        }, 500);
      })
      .catch(function onError(response) { 
        console.log(response);               
      });             
    }      
  }  

  $scope.getAppointmentSheet = function () {         
    if($routeParams.animal_id && $routeParams.appointment_id){
      $http.get(Api.setUriAndReturnAddress('printable/appointments/' + $routeParams.animal_id + '/' + $routeParams.appointment_id))
      .then(function onSuccess(response) {    
        if (response.data == '') {
          Alert.send('Nenhum animal cadastrado', 'info', 3);
          console.log(response)                
        }
        $scope.serviceSheet = response.data;        
        setTimeout(function() {
            window.print();
            history.back();
        }, 300);
      })
      .catch(function onError(response) { 
        console.log(response);               
      });             
    }      
  }  


});
