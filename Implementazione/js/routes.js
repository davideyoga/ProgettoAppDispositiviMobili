angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.esploraEventi', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/esploraEventi.html',
        controller: 'esploraEventiCtrl'
      }
    }
  })

  .state('menu.preferiti', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/preferiti.html',
        controller: 'preferitiCtrl'
      }
    }
  })

  .state('menu.amici', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/amici.html',
        controller: 'amiciCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.profilo', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profilo.html',
        controller: 'profiloCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page4')


});