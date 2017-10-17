(function () {
  'use strict';

  angular
    .module('aboutus')
    .controller('AboutusListController', AboutusListController);

  AboutusListController.$inject = ['AboutusService'];

  function AboutusListController(AboutusService) {
    var vm = this;

    vm.aboutus = AboutusService.query();
  }
}());
