(function () {
  'use strict';

  angular
    .module('userprojects')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('userprojects', {
        abstract: true,
        url: '/userprojects',
        template: '<ui-view/>'
      })
      .state('userprojects.list', {
        url: '',
        templateUrl: 'modules/userprojects/client/views/list-userprojects.client.view.html',
        controller: 'UserprojectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Userprojects List'
        }
      })
      .state('userprojects.create', {
        url: '/create',
        templateUrl: 'modules/userprojects/client/views/form-userproject.client.view.html',
        controller: 'UserprojectsController',
        controllerAs: 'vm',
        resolve: {
          userprojectResolve: newUserproject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Userprojects Create'
        }
      })
      .state('userprojects.edit', {
        url: '/:userprojectId/edit',
        templateUrl: 'modules/userprojects/client/views/form-userproject.client.view.html',
        controller: 'UserprojectsController',
        controllerAs: 'vm',
        resolve: {
          userprojectResolve: getUserproject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Userproject {{ userprojectResolve.name }}'
        }
      })
      .state('userprojects.view', {
        url: '/:userprojectId',
        templateUrl: 'modules/userprojects/client/views/view-userproject.client.view.html',
        controller: 'UserprojectsController',
        controllerAs: 'vm',
        resolve: {
          userprojectResolve: getUserproject
        },
        data: {
          pageTitle: 'Userproject {{ userprojectResolve.name }}'
        }
      })
      .state('userprojectsadmin.list', {
        url: '',
        templateUrl: 'modules/userprojects/client/views/admin-list-userprojects.client.view.html',
        controller: 'UserprojectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'User Projects List'
        }
      });
  }

  getUserproject.$inject = ['$stateParams', 'UserprojectsService'];

  function getUserproject($stateParams, UserprojectsService) {
    return UserprojectsService.get({
      userprojectId: $stateParams.userprojectId
    }).$promise;
  }

  newUserproject.$inject = ['UserprojectsService'];

  function newUserproject(UserprojectsService) {
    return new UserprojectsService();
  }
}());
