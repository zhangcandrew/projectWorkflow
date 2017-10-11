(function () {
  'use strict';

  // Aboutus controller
  angular
    .module('aboutus')
    .controller('AboutusController', AboutusController);

  AboutusController.$inject = ['$scope', '$state', '$window', 'Authentication', 'aboutuResolve'];

  function AboutusController ($scope, $state, $window, Authentication, aboutu) {
    var vm = this;

    vm.authentication = Authentication;
    vm.aboutu = aboutu;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Aboutu
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.aboutu.$remove($state.go('aboutus.list'));
      }
    }

    // Save Aboutu
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aboutuForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.aboutu._id) {
        vm.aboutu.$update(successCallback, errorCallback);
      } else {
        vm.aboutu.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('aboutus.view', {
          aboutuId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
