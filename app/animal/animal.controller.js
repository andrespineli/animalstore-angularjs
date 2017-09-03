angular.module('animalStoreApp')
.controller('AnimalCtrl', function (Alert, Auth, Api, $scope, $rootScope, $http, $location, $routeParams) {

  $scope.findAnimalById = function () {
    if ($routeParams.animal_id) {
      $http.get(Api.setUriAndReturnAddress('animals/' + $routeParams.animal_id))
      .then(function onSuccess(response) {    
        response.data.gender = response.data.gender.toString();        
        $scope.animal = response.data;    
        console.log(response);    
      })
      .catch(function onError(response) {        
        console.log(response);
      });        
    }                      
  }

  $scope.animalRegister = function () {     
    if (!$routeParams.animal_id) {
      $scope.animal.owner_id = $routeParams.owner_id;
      var data = $scope.animal;
      $http.post(Api.setUriAndReturnAddress('animals'), data)
      .then(function onSuccess(response) {    
        $scope.animal = null;
        $location.path('/owner/actions');  
        Alert.send('Animal cadastrado', 'success', 3);    
        return;      
      })
      .catch(function onError(response) {
        console.log(response);
      });        
    } else {
      $scope.animalUpdate();   
    }                 
  }

  $scope.animalUpdate = function () {         
    var data = $scope.animal;
    $http.put(Api.setUriAndReturnAddress('animals/' + $routeParams.animal_id), data)
    .then(function onSuccess(response) {            
      $location.path('/owner/actions');        
      Alert.send('Animal alterado', 'warning', 3);          
    })
    .catch(function onError(response) {
      console.log(response);
    });             
  }

  $scope.animalRemove = function (animal) {    
    $.confirm({      
    theme: 'dark',   
    title: 'Deseja realmente excluir o animal: '+animal.name+'?',      
    content: '',
    buttons: {                
      'sim': {
        btnClass: 'btn-warning',
          action: function(){                                      
            $http.delete(Api.setUriAndReturnAddress('animals/' + animal.id))
            .then(function onSuccess(response) {                                 
              Alert.send('O Animal: '+animal.name+' foi excluido', 'danger', 3);        
              for (var index = 0; index < $scope.animalsOfOwner.length; index++) {
                if ($scope.animalsOfOwner[index] == animal.id){
                  $scope.animalsOfOwner.splice(index, 1);
                  alert('teste');
                }
              }
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
