angular.module('animalStoreApp') 
  .factory('Auth', function($localStorage) {
    return {
      getToken: function() {       
        return $localStorage.token;
      },
      setToken: function(_token) {
        $localStorage.token = _token;        
      },
      getTokenExpiration: function() {       
        return $localStorage.tokenExpiration;
      },
      setTokenExpiration: function(_tokenExpiration) {
        $localStorage.tokenExpiration = _tokenExpiration;        
      }
    }
  })
  .run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.auth) {
        if (!Auth.getToken()) {
          $rootScope.$evalAsync(function() {
            $location.path('/login')
          });
        }
      }
    })
  });
