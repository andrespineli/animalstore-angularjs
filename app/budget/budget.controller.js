angular.module('animalStoreApp')
.controller('BudgetCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams) {

  $scope.getBudgets = function () {         
    $http.get(Api.setUriAndReturnAddress('budgets'))
    .then(function onSuccess(response) {    
      if (response.data.data == '') {
        Alert.send('Nenhum serviço cadastrado', 'info', 3);
      }
      $scope.budgets = response.data.data;        
    })
    .catch(function onError(response) { 
    console.log(response)       			
    });             
  }  
 
  $scope.findBudgetById = function () {
    if ($routeParams.budget_id) {
      $http.get(Api.setUriAndReturnAddress('budgets/' + $routeParams.budget_id))
      .then(function onSuccess(response) {    
        $scope.budget = response.data;        
      })
      .catch(function onError(response) {        
        console.log(response);
      });        
    }                      
  }

  $scope.budgetRegister = function () {     
    if (!$routeParams.budget_id) {
      var data = $scope.budget;
      $http.post(Api.setUriAndReturnAddress('budgets'), data)
      .then(function onSuccess(response) {    
        $scope.budget = null;
        $scope.getBudgets();         
        Alert.send('Serviço cadastrado', 'success', 3);   
        console.log(response);              
      })
      .catch(function onError(response) {
        console.log(response);
      });        
    } else {
      $scope.budgetUpdate();  
    }         
  }

  $scope.budgetUpdate = function () {         
    var data = $scope.budget;
    $http.put(Api.setUriAndReturnAddress('budgets/' + $routeParams.budget_id), data)
    .then(function onSuccess(response) {            
      $location.path('/budgets');        
      Alert.send('Serviço alterado', 'warning', 3);          
    })
    .catch(function onError(response) {
      console.log(response);
    });             
  }

  $scope.budgetRemove = function (budget_id, budget_description) {    
    $.confirm({      
    theme: 'dark',   
    title: 'Deseja realmente excluir o serviço '+budget_description+'?',      
    content: '',
    buttons: {                
      'sim': {
        btnClass: 'btn-warning',
          action: function(){                                      
            $http.delete(Api.setUriAndReturnAddress('budgets/' + budget_id))
            .then(function onSuccess(response) {    
              $scope.getBudgets();                              
              Alert.send('O serviço '+budget_description+' foi excluido', 'danger', 3);          
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
