(function () {
  'use strict';

  // Trainings controller
  angular
    .module('trainings')
    .controller('TrainingsController', TrainingsController);

  TrainingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'trainingResolve'];

  function TrainingsController ($scope, $state, $window, Authentication, training) {
    var vm = this;

    vm.authentication = Authentication;
    vm.training = training;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Training
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.training.$remove($state.go('trainings.list'));
      }
    }

    // Save Training
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.trainingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.training._id) {
        vm.training.$update(successCallback, errorCallback);
      } else {
        vm.training.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('trainings.view', {
          trainingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
