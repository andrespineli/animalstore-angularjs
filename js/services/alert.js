'use strict';

angular.module('animalStoreApp')
  .factory('Alert', function() {   
    return {
      send: function(message, type, time) {
        document.getElementById("alert").innerHTML = '<div class="alert alert-'+type+'"><p>'+message+'</p></div>';
        setTimeout(function() {
          document.getElementById("alert").innerHTML = '';
      }, time*1000);
        return true;
      }
    }
  })