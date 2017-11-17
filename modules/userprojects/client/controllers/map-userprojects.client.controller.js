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

  $scope.filterArray = [{ name: "proposed", on: false}, {name:"completed", on: false}, {name:"ongoing", on: false}, {name:"pavementmarking", on: false}, {name:"intersection", on: false}, {name:"curve", on: false}];
  $scope.showAll = true;

  $scope.checkChange = function(event,userproject) {
        for(name in $scope.filterArray){
            if($scope.filterArray[name].on){
                $scope.showAll = false;
                return;
            }
        }
        $scope.showAll = true;
        //showProject(event, project);
    };


   $scope.myFiltering = function(a) {
       //alert(hi);
      if($scope.showAll) { return true; }
       
       var sel = false;
       
        for(name in $scope.filterArray){
            var t = $scope.filterArray[name];
            //console.log(t);
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
