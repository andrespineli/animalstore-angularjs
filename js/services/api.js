'use strict';

/**
 * @ngdoc service
 * @name animalAngularJsApp.api
 * @description
 * # api
 * Factory in the animalAngularJsApp.
 */
angular.module('animalStoreApp')
  .factory('Api', function () {
    // Service logic
    // ...

    var apiAddress = 'http://localhost:8000/api/v1/';
    //var apiAddress = 'http://animalstoreapi.upapp.com.br:8000/api/v1/';
      return {
        setUriAndReturnAddress: function(uri) {
          return apiAddress+uri;
        }
      }
  });
