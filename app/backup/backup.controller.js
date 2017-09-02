angular.module('animalStoreApp')
  .controller('BackupCtrl', function (Alert, Auth, Api, $scope, $http, $location, $routeParams) {

    $scope.findBackupConfig = function () {     
      $http.get(Api.setUriAndReturnAddress('clinics'))
      .then(function onSuccess(response) {                      
        $scope.clinic = response.data;    
        console.log(response);    
      })
      .catch(function onError(response) {        
        console.log(response);
      });                                   
    }

    $scope.backupConfigUpdate = function () {          	
      var data = $scope.clinic;      
      $http.put(Api.setUriAndReturnAddress('clinics'), data)
      .then(function onSuccess(response) {    
        $scope.findBackupConfig();        
        Alert.send('Informações alteradas', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }
    

  });
