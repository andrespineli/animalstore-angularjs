angular.module('animalStoreApp')
  .controller('TypeCtrl', function (Alert, Auth, Api, $scope, $http, $location, $routeParams) {

    $scope.getTypes = function () {         
      $http.get(Api.setUriAndReturnAddress('animals/types'))
      .then(function onSuccess(response) {    
        if (response.data.data == '') {
          Alert.send('Nenhuma espécie cadastrada', 'info', 3);
        }
        $scope.types = response.data.data;        
      })
      .catch(function onError(response) { 
      console.log(response)       
        
      });             
    }

    $scope.findTypeById = function () {
      if ($routeParams.type_id) {
        $http.get(Api.setUriAndReturnAddress('animals/types/' + $routeParams.type_id))
        .then(function onSuccess(response) {    
          $scope.type = response.data;        
        })
        .catch(function onError(response) {        
          console.log(response);
        });        
      }         
             
    }

    $scope.typeRegister = function () {     
      if (!$routeParams.type_id) {
        var data = $scope.type;
        $http.post(Api.setUriAndReturnAddress('animals/types'), data)
        .then(function onSuccess(response) {    
          $scope.type = null;
          $scope.getTypes();         
          Alert.send('Tipo de animal cadastrado', 'success', 3);    
          return ;      
        })
        .catch(function onError(response) {
          console.log(response);
        });        
      } else {
        $scope.typeUpdate();   
      }          
         
    }

    $scope.typeUpdate = function () {         
      var data = $scope.type;
      $http.put(Api.setUriAndReturnAddress('animals/types/' + $routeParams.type_id), data)
      .then(function onSuccess(response) {            
        $location.path('/types');        
        Alert.send('Tipo de animal alterado', 'warning', 3);          
      })
      .catch(function onError(response) {
        console.log(response);
      });             
    }

    $scope.typeRemove = function (type_id, type_name) {    
      $.confirm({      
      theme: 'dark',   
      title: 'Deseja realmente excluir o tipo de animal '+type_name+'?',      
      content: '',
      buttons: {                
        'sim': {
          btnClass: 'btn-warning',
            action: function(){                                      
              $http.delete(Api.setUriAndReturnAddress('animals/types/' + type_id))
              .then(function onSuccess(response) {    
                $scope.getTypes();                              
                Alert.send('O tipo de animal '+type_name+' foi excluido', 'danger', 3);          
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
