angular.module('animalStoreApp')
  .factory('AuthInterceptor', function($location, Auth, $q) {
    return {
      request: function(config) {
        config.headers = config.headers || {};     

        if (Auth.getToken()) {        
          token = Auth.getToken();
          config.headers['Authorization'] = token;       
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          Auth.setToken(null);
          $location.path('/login');
        } 
        return $q.reject(response);
      }
    }
  })
     