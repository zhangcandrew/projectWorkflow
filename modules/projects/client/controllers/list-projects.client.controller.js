(function () {
  'use strict';

  angular
    .module('projects')
    .controller('ProjectsListController', ProjectsListController);

 ProjectsListController.$inject = ['ProjectsService', '$scope'];

  function ProjectsListController(ProjectsService, $scope, project) {
    var vm = this;

    vm.projects = ProjectsService.query();

	$scope.showProject = function(event, project) {
	            $scope.selectedProject = project;
	            $scope.map.showInfoWindow('myInfoWindow', this);
	        };

  $scope.filterArray = [{ name: "proposed", on: false}, {name:"completed", on: false}, {name:"ongoing", on: false}, {name:"pavementmarking", on: false}, {name:"intersection", on: false}, {name:"curve", on: false}];
  $scope.showAll = true;
  //window.frames["projects_frame"].document.getElementById("filtering").style.display = "none";

  $scope.checkChange = function(event,project) {
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


  $scope.openFiltering = function() {
     // alert(window.frames["projects_frame"]);
      document.getElementById("filtering").style.display = "block";
  };

  $scope.closeFiltering = function() {
      document.getElementById("filtering").style.display = "none";
  };

  };

}());