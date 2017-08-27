

'use strict';

/**
 * @ngdoc service
 * @name animalAngularJsApp.Auth
 * @description
 * # Auth
 * Factory in the animalAngularJsApp.
 */
angular.module('animalStoreApp')
.service('fileUpload', ['$http', function ($http, $scope) {
    this.uploadFileToUrl = function(file, uploadUrl, id){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('id', id);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(data){
            console.log(data);
            var src = '../../api/clientes/upload/imagens/clientes/' + data.imagemUrl;
            document.getElementById('imagemUrl').src = src;
            location.reload();

         })
         .error(function(data){
            //console.log("Success");
             console.log(data);
         });
     }
 }]);
