angular.module('animalStoreApp')
.controller('AppointmentCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams, $filter) {

  $scope.appointmentPage = function (animal_name) {         
   $location.path('/appointment/'+ $routeParams.animal_id + '/' + animal_name);
  }
 
  $scope.getAnimalAppointments = function () {       
      $scope.animal_name = $routeParams.animal_name;  
    if($routeParams.animal_id){
      $http.get(Api.setUriAndReturnAddress('animals/' + $routeParams.animal_id + '/appointments'))
      .then(function onSuccess(response) {    
        if (response.data == '') {
          Alert.send('Nenhuma consulta cadastrada', 'info', 3);
          console.log(response)                
        }
        $scope.animalAppointments = response.data;        
        console.log(response);
      })
      .catch(function onError(response) { 
        console.log(response);               
      });             
    }      
  }

  $scope.findAppointmentById = function () {
    if ($routeParams.appointment_id) {
      $http.get(Api.setUriAndReturnAddress('appointments/' + $routeParams.appointment_id))
      .then(function onSuccess(response) {    
        response.data.appointment_date = new Date(response.data.appointment_date);   
        response.data.vermifuge_date = new Date(response.data.vermifuge_date);     
        response.data.rabies_vaccine_date = new Date(response.data.rabies_vaccine_date);     
        response.data.multipurpose_vaccine_date = new Date(response.data.multipurpose_vaccine_date);           
        $scope.appointment = response.data;    
        console.log(response);    
      })
      .catch(function onError(response) {        
        console.log(response);        
      });        
    }                      
  }

  $scope.appointmentRegister = function () {     
    if (!$routeParams.appointment_id) {
      console.log($routeParams.animal_id)
      $scope.appointment.animal_id = $routeParams.animal_id;
      var data = $scope.appointment;
      $http.post(Api.setUriAndReturnAddress('appointments'), data)
      .then(function onSuccess(response) {    
        $scope.appointment = null;
        $location.path('/appointments/' + $routeParams.animal_id+'/'+$routeParams.animal_name);  
        Alert.send('Consulta cadastrada', 'success', 3);    
        console.log(response);
      })
      .catch(function onError(response) {
        console.log(response);       
      });        
    } else {
      $scope.appointmentUpdate();   
    }                 
  }

  $scope.appointmentUpdate = function () {         
    var data = $scope.appointment;
    $http.put(Api.setUriAndReturnAddress('appointments/' + $routeParams.appointment_id), data)
    .then(function onSuccess(response) {            
      $location.path('/appointments/' + $routeParams.animal_id+'/'+$routeParams.animal_name);  
      Alert.send('Consulta alterada', 'warning', 3);          
    })
    .catch(function onError(response) {
      console.log(response);
    });             
  }

  $scope.appointmentRemove = function (appointment_id, appointment_date, animal_name) {    
    appointment_date = $filter('formatDate')(appointment_date);   
    
    $.confirm({      
    theme: 'dark',   
    title: 'Deseja realmente excluir a consulta do animal ' + animal_name + ', do dia ' + appointment_date +'?',      
    content: '',
    buttons: {                
      'sim': {
        btnClass: 'btn-danger',
          action: function(){                                      
            $http.delete(Api.setUriAndReturnAddress('appointments/' + appointment_id))
            .then(function onSuccess(response) {                     
              $scope.getAnimalAppointments();            
              Alert.send('A Consulta do paciente '+animal_name+', do dia '+appointment_date+' foi excluida', 'danger', 3);       
              
            })
            .catch(function onError(response) {
              console.log(response);
            });                        
          }
        },    
        'não': {
          btnClass: 'btn-success',
          action: function(){}
        },            
      }
    });            
  }


});
