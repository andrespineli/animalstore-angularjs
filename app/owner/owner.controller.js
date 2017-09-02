angular.module('animalStoreApp')
  .controller('OwnerCtrl', function (Alert, Auth, Api, $scope, $http, $location, $routeParams) {

    $scope.getOwners = function () {         
      $http.get(Api.setUriAndReturnAddress('owners'))
      .then(function onSuccess(response) {    
        if (response.data.data == '') {
          Alert.send('Nenhum cliente cadastrado', 'info', 3);
          console.log(response);       
        }
        $scope.owners = response.data.data;        
      })
      .catch(function onError(response) { 
        console.log(response);               
      });             
    }

    $scope.getOwnersWithAnimals = function () {         
      $http.get(Api.setUriAndReturnAddress('owners/animals'))
      .then(function onSuccess(response) {    
        if (response.data.data == '') {
          Alert.send('Nenhum cliente cadastrado', 'info', 3);
          console.log(response)       
        }
        $scope.ownersWithAnimals = response.data;        
      })
      .catch(function onError(response) { 
        console.log(response);               
      });             
    }

    $scope.getAnimalsOfOwner = function (animalsOfOwner) {         
      $scope.animalsOfOwner = animalsOfOwner;      
    }

    $scope.findOwnerById = function () {
      if ($routeParams.owner_id) {
        $http.get(Api.setUriAndReturnAddress('owners/' + $routeParams.owner_id))
        .then(function onSuccess(response) {    
          response.data.birth_date = new Date(response.data.birth_date);
          response.data.gender = response.data.gender.toString();
          $scope.owner = response.data;    
          console.log(response);    
        })
        .catch(function onError(response) {        
          console.log(response);
        });        
      }                      
    }

    $scope.ownerRegister = function () {     
      if (!$routeParams.owner_id) {
        var data = $scope.owner;        
        $http.post(Api.setUriAndReturnAddress('owners'), data)
        .then(function onSuccess(response) {    
          $scope.owner = '';
          $scope.getOwners();         
          Alert.send('Cliente cadastrado', 'success', 3);          
        })
        .catch(function onError(response) {
          console.log(response);
        });        
      } else {
        $scope.ownerUpdate(); 
      }           
    }

    $scope.ownerUpdate = function () {        
      var data = $scope.owner;      
      $http.put(Api.setUriAndReturnAddress('owners/' + $routeParams.owner_id), data)
      .then(function onSuccess(response) {    
        $location.path('/owners');        
        Alert.send('Cliente alterado', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }

    $scope.ownerRemove = function (owner_id, owner_name) {    
      $.confirm({      
      theme: 'dark',   
      title: 'Deseja realmente excluir o cliente: '+owner_name+'?',      
      content: '',
      buttons: {                
        'sim': {
          btnClass: 'btn-warning',
            action: function(){                                      
              $http.delete(Api.setUriAndReturnAddress('owners/' + owner_id))
              .then(function onSuccess(response) {    
                $scope.getOwners();                              
                Alert.send('O cliente: '+owner_name+' foi excluido', 'danger', 3);          
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
