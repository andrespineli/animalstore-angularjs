angular.module('animalStoreApp')
  .controller('ClinicCtrl', function (Alert, Auth, Api, $scope, $http, $location, $routeParams) {

    $scope.findClinic = function () {     
      $http.get(Api.setUriAndReturnAddress('clinics'))
      .then(function onSuccess(response) {                      
        $scope.clinic = response.data;    
        console.log(response);    
      })
      .catch(function onError(response) {        
        console.log(response);
      });                                   
    }

    $scope.clinicUpdate = function () {          	
      var data = $scope.clinic;      
      $http.put(Api.setUriAndReturnAddress('clinics'), data)
      .then(function onSuccess(response) {    
        $scope.findClinic();        
        Alert.send('Informações alteradas', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }

    $scope.updateUserName = function () {          	
      var data = $scope.clinic;      
      $http.patch(Api.setUriAndReturnAddress('clinics/username'), data)
      .then(function onSuccess(response) {    
        $scope.findClinic();        
        Alert.send('Informações alteradas', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
        if (response.data.user_name) {
        	Alert.send('Esse nome de usuário já está sendo usado, por favor escolha outro.', 'warning', 5);    
        }
        if (response.data.message == "Invalid password") {
        	Alert.send('Senha inválida, verifique', 'danger', 3);    
        }
      });             
    }

    $scope.updatePassword = function () {          	
      var data = $scope.clinic;      
      $http.patch(Api.setUriAndReturnAddress('clinics/password'), data)
      .then(function onSuccess(response) {    
        $scope.findClinic();        
        Alert.send('Informações alteradas', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);

        if (response.data.password_confirmation == 'The password confirmation and password new must match.') {
        	Alert.send('As senhas não coincidem, verifique.', 'warning', 5);    
        }

        if (response.data.message == "Invalid password") {
        	Alert.send('Senha inválida, verifique', 'danger', 3);    
        }
      });             
    }

  });
