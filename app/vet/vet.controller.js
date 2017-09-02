angular.module('animalStoreApp')
  .controller('VetCtrl', function (Alert, Auth, Api, $scope, $http, $location, $routeParams) {

    $scope.findVetById = function () {
      if ($routeParams.vet_id) {
        $http.get(Api.setUriAndReturnAddress('vets/' + $routeParams.vet_id))
        .then(function onSuccess(response) {    
          $scope.vet = response.data;        
        })
        .catch(function onError(response) {        
          console.log(response);
        });        
      }         
             
    }

    $scope.vetRegister = function () {     
      if (!$routeParams.vet_id) {
        var data = $scope.vet;
        $http.post(Api.setUriAndReturnAddress('vets'), data)
        .then(function onSuccess(response) {    
          $scope.vet = null;
          $scope.getVets();         
          Alert.send('Veterinário cadastrado', 'success', 3);          
        })
        .catch(function onError(response) {
          console.log(response);
        });        
      } else {
        $scope.vetUpdate();  
      }
         
    }

    $scope.vetUpdate = function () {         
      var data = $scope.vet;
      $http.put(Api.setUriAndReturnAddress('vets/' + $routeParams.vet_id), data)
      .then(function onSuccess(response) {            
        $location.path('/vets');        
        Alert.send('Veterinário alterado', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }

    $scope.vetRemove = function (vet_id, vet_name) {    
      $.confirm({      
      theme: 'dark',   
      title: 'Deseja realmente excluir o veterinário: '+vet_name+'?',      
      content: '',
      buttons: {                
        'sim': {
          btnClass: 'btn-warning',
            action: function(){                                      
              $http.delete(Api.setUriAndReturnAddress('vets/' + vet_id))
              .then(function onSuccess(response) {    
                $scope.getVets();                              
                Alert.send('O veterinário: '+vet_name+' foi excluido', 'danger', 3);          
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
