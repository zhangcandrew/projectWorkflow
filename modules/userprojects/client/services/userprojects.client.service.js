// Userprojects service used to communicate Userprojects REST endpoints
(function () {
  'use strict';

  angular
    .module('userprojects')
    .factory('UserprojectsService', UserprojectsService);

  UserprojectsService.$inject = ['$resource'];

  function UserprojectsService($resource) {
    return $resource('/api/userprojects/:userprojectId', {
      userprojectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
