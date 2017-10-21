(function () {
  'use strict';

  angular
    .module('userprojects')
    .controller('UserprojectsListController', UserprojectsListController);

  UserprojectsListController.$inject = ['UserprojectsService'];

  function UserprojectsListController(UserprojectsService) {
    var vm = this;

    vm.userprojects = UserprojectsService.query();
  }
}());
