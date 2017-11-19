(function () {
  'use strict';

  angular
    .module('userprojects')
    .controller('UserprojectsMapController', UserprojectsMapController);

  UserprojectsMapController.$inject = ['UserprojectsService', '$scope'];

  function UserprojectsMapController(UserprojectsService, $scope, userproject) {
    var vm = this;

    vm.userprojects = UserprojectsService.query();

    $scope.showProject = function(event, userproject) {
	            $scope.selectedProject = userproject;
	            $scope.map.showInfoWindow('myInfoWindow', this);
	        };

  $scope.filterArray = [{ name: "Proposed", on: false}, {name:"Completed", on: false}, {name:"Ongoing", on: false}, {name:"Pavement Marking", on: false}, {name:"Intersection", on: false}, {name:"Curve", on: false}];
  $scope.showAll = true;

  $scope.checkChange = function(event,userproject) {
        for(name in $scope.filterArray){
            if($scope.filterArray[name].on){
                $scope.showAll = false;
                return;
            }
        }
        $scope.showAll = true;
    };


   $scope.myFiltering = function(a) {
      if($scope.showAll) { return true; }
       
       var sel = false;
       
        for(name in $scope.filterArray){
            var t = $scope.filterArray[name];
            if(t.on){
                if(a.progress.indexOf(t.name) == -1 && a.projecttype.indexOf(t.name) == -1){
                    return false;
                }else{
                    sel = true;
                }

            }           
        }
       return sel;

    };


  }
}());
