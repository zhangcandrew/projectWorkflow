(function () {
  'use strict';

  // Userprojects controller
  angular
    .module('userprojects')
    .controller('UserprojectsController', UserprojectsController);

  UserprojectsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userprojectResolve'];

  function UserprojectsController ($scope, $state, $window, Authentication, userproject) {
    var vm = this;

    vm.authentication = Authentication;
    vm.userproject = userproject;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Userproject
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.userproject.$remove($state.go('userprojects.list'));
      }
    }

    // Save Userproject
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.userprojectForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.userproject._id) {
        vm.userproject.$update(successCallback, errorCallback);
      } else {
        vm.userproject.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('userprojects.view', {
          userprojectId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
