angular.module(
  'animalStoreApp', [
    'ngRoute', 
    'ngResource', 
    'ngStorage',
    'angularUtils.directives.dirPagination',
    'ui.utils.masks'
  ])
  .config(function($routeProvider, $httpProvider, $locationProvider) {  
    $locationProvider.hashPrefix('');
    
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home.controller'
      })
      .when('/myclinic', {
        templateUrl: 'app/clinic/clinic-edit.html',
        controller: 'ClinicCtrl',
        controllerAs: 'clinic.controller'
      })
      .when('/myclinic/username', {
        templateUrl: 'app/clinic/clinic-user.html',
        controller: 'ClinicCtrl',
        controllerAs: 'clinic.controller'
      })
      .when('/myclinic/password', {
        templateUrl: 'app/clinic/clinic-pass.html',
        controller: 'ClinicCtrl',
        controllerAs: 'clinic.controller'
      })
      .when('/backup', {
        templateUrl: 'app/backup/backup.html',
        controller: 'BackupCtrl',
        controllerAs: 'backup.controller'
      })
      .when('/backup/config', {
        templateUrl: 'app/backup/backup-config.html',
        controller: 'BackupCtrl',
        controllerAs: 'backup.controller'
      })
      .when('/register', {
        templateUrl: 'app/clinic/clinic.html',
        controller: 'ClinicCtrl',
        controllerAs: 'clinic.controller'
      })
      .when('/vets', {
        templateUrl: 'app/vet/vet.html',
        controller: 'VetCtrl',
        controllerAs: 'vet.controller'
      })
      .when('/vets/:vet_id', {
        templateUrl: 'app/vet/vet.html',
        controller: 'VetCtrl',
        controllerAs: 'vet.controller'
      })
      .when('/owners', {
        templateUrl: 'app/owner/owner.html',
        controller: 'OwnerCtrl',
        controllerAs: 'owner.controller'
      })
      .when('/owners/:owner_id', {
        templateUrl: 'app/owner/owner.html',
        controller: 'OwnerCtrl',
        controllerAs: 'owner.controller'
      })
      .when('/owner/actions', {
        templateUrl: 'app/owner/owner-action.html',
        controller: 'OwnerCtrl',
        controllerAs: 'owner.controller'
      })
      .when('/owner/:owner_id/animals', {
        templateUrl: 'app/animal/animal.html',
        controller: 'AnimalCtrl',
        controllerAs: 'animal.controller'
      })
      .when('/types', {
        templateUrl: 'app/animal-type/animal-type.html',
        controller: 'TypeCtrl',
        controllerAs: 'animal-type.controller'
      })
      .when('/types/:type_id', {
        templateUrl: 'app/animal-type/animal-type.html',
        controller: 'TypeCtrl',
        controllerAs: 'animal-type.controller'
      })
      .when('/breeds', {
        templateUrl: 'app/animal-breed/animal-breed.html',
        controller: 'BreedCtrl',
        controllerAs: 'animal-breed.controller'
      })
      .when('/breeds/:breed_id', {
        templateUrl: 'app/animal-breed/animal-breed.html',
        controller: 'BreedCtrl',
        controllerAs: 'animal-breed.controller'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login.controller'
      });

    $routeProvider.otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('AuthInterceptor');
  });