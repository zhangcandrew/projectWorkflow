// Aboutus service used to communicate Aboutus REST endpoints
(function () {
  'use strict';

  angular
    .module('aboutus')
    .factory('AboutusService', AboutusService);

  AboutusService.$inject = ['$resource'];

  function AboutusService($resource) {
    return $resource('api/aboutus/:aboutuId', {
      aboutuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
