(function () {
  'use strict';

  angular
    .module('aboutus')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('aboutus', {
        abstract: true,
        url: '/aboutus',
        template: '<ui-view/>'
      })
      .state('aboutus.list', {
        url: '',
        templateUrl: 'modules/aboutus/client/views/list-aboutus.client.view.html',
        controller: 'AboutusListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'About Us List'
        }
      })
      .state('aboutus.create', {
        url: '/create',
        templateUrl: 'modules/aboutus/client/views/form-aboutu.client.view.html',
        controller: 'AboutusController',
        controllerAs: 'vm',
        resolve: {
          aboutuResolve: newAboutu
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Aboutus Create'
        }
      })
      .state('aboutus.edit', {
        url: '/:aboutuId/edit',
        templateUrl: 'modules/aboutus/client/views/form-aboutu.client.view.html',
        controller: 'AboutusController',
        controllerAs: 'vm',
        resolve: {
          aboutuResolve: getAboutu
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Aboutu {{ aboutuResolve.name }}'
        }
      })
      .state('aboutus.view', {
        url: '/:aboutuId',
        templateUrl: 'modules/aboutus/client/views/view-aboutu.client.view.html',
        controller: 'AboutusController',
        controllerAs: 'vm',
        resolve: {
          aboutuResolve: getAboutu
        },
        data: {
          pageTitle: 'Aboutu {{ aboutuResolve.name }}'
        }
      });
  }

  getAboutu.$inject = ['$stateParams', 'AboutusService'];

  function getAboutu($stateParams, AboutusService) {
    return AboutusService.get({
      aboutuId: $stateParams.aboutuId
    }).$promise;
  }

  newAboutu.$inject = ['AboutusService'];

  function newAboutu(AboutusService) {
    return new AboutusService();
  }
}());
