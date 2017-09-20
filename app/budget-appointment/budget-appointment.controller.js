angular.module('animalStoreApp')
.controller('BudgetAppointmentCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams) {

	$scope.budgetAppointmentPrintable = function () {
		$location.path('/printable/budget/'+$routeParams.appointment_id+'/'+$routeParams.animal_id);
	}

  $scope.getBudgetsAppointments = function () {         
    $scope.animal_name = $routeParams.animal_name;  
    $http.get(Api.setUriAndReturnAddress('appointments/' + $routeParams.appointment_id + '/budgets'))
    .then(function onSuccess(response) {    
      if (response.data == '') {
        Alert.send('Nenhum serviço ', 'info', 3);
      }
      $scope.budgetsAppointment = response.data;        
    })
    .catch(function onError(response) { 
    console.log(response)       			
    });             
  }  

  $scope.budgetAppointmentRegister = function (budget_id) {         
		var data = {'budget_id': budget_id};
    $http.post(Api.setUriAndReturnAddress('appointments/' + $routeParams.appointment_id + '/budgets'), data)
    .then(function onSuccess(response) {    
      $scope.budgetAppointment = null;
      $scope.getBudgetsAppointments();         
      Alert.send('Serviço cadastrado', 'success', 3);   
      console.log(response);              
    })
    .catch(function onError(response) {
      console.log(response);
    });           
  }

  $scope.budgetAppointmentRemove = function (budgetAppointment_id, budgetAppointment_description, animal_name) {    
    $.confirm({      
    theme: 'dark',   
    title: 'Deseja realmente excluir o serviço ' + budgetAppointment_description + ' do animal ' + animal_name + '?',      
    content: '',
    buttons: {                
      'sim': {
        btnClass: 'btn-warning',
          action: function(){                                      
            $http.delete(Api.setUriAndReturnAddress('appointments/' + $routeParams.appointment_id + '/budgets/' + budgetAppointment_id))
            .then(function onSuccess(response) {    
              $scope.getBudgetsAppointments();                              
              Alert.send('O serviço ' + budgetAppointment_description + ' foi excluido', 'danger', 3);          
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
