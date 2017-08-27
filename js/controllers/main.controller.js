angular.module('animalStoreApp')
  .controller('MainCtrl', function (Alert, Auth, Api, $scope, $http, $location) {

    $scope.logout = function () {       
      $.confirm({      
      theme: 'dark',   
      title: 'Deseja realmente se desconectar?',      
      content: '',
      buttons: {                
        'sim': {
          btnClass: 'btn-warning',
            action: function(){                                      
              Auth.setToken(null); 
              //$scope.isLogged();            
              document.location.href = '#/login';             
            }
          },    
          'não': {
            btnClass: 'btn-success',
            action: function(){}
          },            
        }
      });           
    } 

    $scope.loginForm = function () {      
        $.confirm({
          theme: 'dark',    
          title: 'Acessar',      
          content: '' +
          '<form id="form" action="" class="formName">' +
          '<div class="form-group">' +                 
          '<input type="text" placeholder="Usuário" class="user_name form-control" required />' +          
          '<input type="password" placeholder="Senha" class="password form-control" required />' +
          '</div>' +
          '</form>',
          buttons: {
              formSubmit: {
                  text: 'Entrar',
                  btnClass: 'btn-blue',
                  action: function () {
                      var user_name = this.$content.find('.user_name').val();
                      var password = this.$content.find('.password').val();
                      if(!user_name){
                        $.alert('Insira seu nome de usuário');
                        return false;
                      }
                      if(!password){
                        $.alert('Insira sua senha');
                        return false;
                      }                           
                      return $scope.clinicLogin(user_name, password);
                  }
              },
              cancelar: function () {
                  //close
              },
          }
        });
      }
      $scope.registerForm = function () {      
        $.confirm({
          theme: 'dark',    
          title: 'Cadastre sua clínica',      
          content: '' +
          '<form id="form" action="" class="formName">' +
          '<div class="form-group">' +                 
          '<input type="text" placeholder="Nome" class="name form-control" required />' +    
          '<input type="text" placeholder="Usuário" class="user_name form-control" required />' +      
          '<input type="text" placeholder="E-mail" class="email form-control" required />' +
          '<input type="text" placeholder="CNPJ" class="document_number form-control" required />' +         
          '<input type="password" placeholder="Senha" class="password form-control" required />' +
          '<input type="password" placeholder="Confirme sua senha" class="password_confirmation form-control" required />' +
          '</div>' +
          '</form>',
          buttons: {
              formSubmit: {
                  text: 'Cadastrar',
                  btnClass: 'btn-blue',
                  action: function () {
                      var name = this.$content.find('.name').val();
                      var user_name = this.$content.find('.user_name').val();
                      var email = this.$content.find('.email').val();
                      var document_number = this.$content.find('.document_number').val();
                      var password = this.$content.find('.password').val();
                      var password_confirmation = this.$content.find('.password_confirmation').val();
                      if(!name){
                        $.alert('Insira o nome da clínica');
                        return false;
                      }
                      if(!user_name){
                        $.alert('Insira seu nome de usuário');
                        return false;
                      }
                      if(!email){
                        $.alert('Insira seu E-mail');
                        return false;
                      }
                      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                      if (!filter.test(email)) {                          
                          $.alert('Insira um E-mail válido');
                          return false;
                      }
                      if(!document_number){
                        $.alert('Insira seu CNPJ');
                        return false;
                      }
                      if(document_number.length != 14){
                        $.alert('CNPJ Inválido');
                        return false;
                      }                                  
                      if (isNaN(document_number)) {
                        $.alert('CNPJ Só deve conter números');
                        return false;
                      }     
                      if(!password){
                        $.alert('Insira sua senha');
                        return false;
                      } 
                      if(!password_confirmation){
                        $.alert('Confirme sua senha');
                        return false;
                      } 
                      if(password != password_confirmation){
                        $.alert('As senhas não coincidem');
                        return false;
                      }                             
                      return $scope.clinicRegister(name, user_name, email, document_number, password, password_confirmation);
                  }
              },
              cancelar: function () {
                  //close
              },
          }
        });
      }

    $scope.clinicLogin = function (user_name, password) {
      var data = {
        'user_name': user_name,
        'password': password
      };
      $http.post(Api.setUriAndReturnAddress('clinics/login'), data)
      .then(function onSuccess(response) {    
        Auth.setToken(response.data.api_token);
        Auth.setTokenExpiration(response.data.api_token_expiration);
        $location.path('/');   
        Alert.send('Bem vindo de volta '+user_name+ '.', 'info', 4); 
        return true;
      })
      .catch(function onError(response) {      
        if (response.data.message == 'Invalid user_name') {
          Alert.send('Usuário inválido, verifique', 'warning', 3);  
          return false;          
        }
        if (response.data.message == 'Invalid password') {
          Alert.send('Senha inválida, verifique', 'warning', 3); 
          return false;           
        }                    
      });
    }  

    $scope.clinicRegister = function (name, user_name, email, document_number, password, password_confirmation) {
      var data = {
        'name': name,
        'user_name': user_name,
        'email': email,
        'document_number': document_number,
        'password': password,
        'password_confirmation': password_confirmation
      };
      $http.post(Api.setUriAndReturnAddress('clinics'), data)
      .then(function onSuccess(response) {    
        Alert.send('Cadastro realizado, seja bem vindo ao AnimalStore', 'success', 10); 
        $scope.clinicLogin(user_name, password);  
        console.log(response.data)    
      })
      .catch(function onError(response) {      
        console.log(response.data)
        if (response.data.name) {
          Alert.send('Nome inválido, verifique', 'warning', 3);  
          return false;          
        }
        if (response.data.user_name) {
          Alert.send('Este usuário já está em uso, utilize outro', 'warning', 3);  
          return false;          
        }
        if (response.data.email) {
          Alert.send('E-mail inválido, verifique', 'warning', 3);  
          return false;          
        }
        if (response.data.document_number) {
          Alert.send('CNPJ inválido, verifique', 'warning', 3);  
          return false;          
        }
        if (response.data.password) {
          Alert.send('Senha inválida, verifique', 'warning', 3);  
          return false;          
        }
        if (response.data.password_confirmation) {
          Alert.send('Confirmação de senha inválida, verifique', 'warning', 3);  
          return false;          
        }
        return false;         
      });
    }  

    $scope.isLogged = function () {      
      if (Auth.getToken()) {
        return true;
      }
      return false;
      
    }       


  $scope.loadBackground = function () {
    if (document.getElementById("unLoadbackground")) {
      document.getElementById("unLoadbackground").id = "loadBackground";    
    }   
  }

  $scope.unLoadBackground = function () {
    if (document.getElementById("loadBackground")) {
      document.getElementById("loadBackground").id = "unLoadbackground";
    }   
  }

  $scope.watchAuthTokenExpiration = function () {       
    setTimeout(function() {
      $http.get(Api.setUriAndReturnAddress('clinics/refresh-token'))
      .then(function onSuccess(response) {    
        Auth.setToken(response.data.api_token);
        Auth.setTokenExpiration(response.data.api_token_expiration);      
        $scope.watchAuthTokenExpiration();            
        console.log("Token refreshed");
        return true;
      })
      .catch(function onError(response) {
        return false;
      });             
    }, 60000);
    
    

    
  }

  });
