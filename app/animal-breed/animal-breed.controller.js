angular.module('animalStoreApp')
  .controller('BreedCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams) {

    $scope.getBreeds = function () {         
      $http.get(Api.setUriAndReturnAddress('animals/breeds'))
      .then(function onSuccess(response) {    
        if (response.data.data == '') {
          Alert.send('Nenhuma raça cadastrada', 'info', 3);
        }
        $rootScope.breeds = response.data.data;        
        console.log(response.data.data)
      })
      .catch(function onError(response) { 
      console.log(response)       
        
      });             
    }

    $scope.getTypes = function () {         
      $http.get(Api.setUriAndReturnAddress('animals/types'))
      .then(function onSuccess(response) {    
        if (response.data.data == '') {
          Alert.send('Nenhum tipo de animal cadastrado', 'info', 3);
        }
        $scope.types = response.data.data;       
         console.log(response.data.data) 
      })
      .catch(function onError(response) { 
      console.log(response)       
        
      });             
    }

    $scope.findBreedById = function () {
      if ($routeParams.breed_id) {
        $http.get(Api.setUriAndReturnAddress('animals/breeds/' + $routeParams.breed_id))
        .then(function onSuccess(response) {    
          $scope.breed = '';
          $scope.breed = response.data;  
          console.log(response.data.type_id);      
        })
        .catch(function onError(response) {        
          console.log(response);
        });        
      }            
    }

    $scope.breedRegister = function () {     
      if (!$routeParams.breed_id) {
        var data = $scope.breed;
        $http.post(Api.setUriAndReturnAddress('animals/breeds'), data)
        .then(function onSuccess(response) {    
          $scope.breed = null;
          $scope.getBreeds();         
          Alert.send('Raça cadastrada', 'success', 3);    
          return ;      
        })
        .catch(function onError(response) {
          console.log(response);
        });        
      } else {
        $scope.breedUpdate();   
      }          
         
    }

    $scope.breedUpdate = function () {         
      var data = $scope.breed;
      $http.put(Api.setUriAndReturnAddress('animals/breeds/' + $routeParams.breed_id), data)
      .then(function onSuccess(response) {            
        $location.path('/breeds');        
        Alert.send('Raça alterada', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }

    $scope.breedRemove = function (breed_id, breed_name) {    
      $.confirm({      
      theme: 'dark',   
      title: 'Deseja realmente excluir a raça: '+breed_name+'?',      
      content: '',
      buttons: {                
        'sim': {
          btnClass: 'btn-warning',
            action: function(){                                      
              $http.delete(Api.setUriAndReturnAddress('animals/breeds/' + breed_id))
              .then(function onSuccess(response) {    
                $scope.getbreeds();                              
                Alert.send('A raça: '+breed_name+' foi excluido', 'danger', 3);          
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
