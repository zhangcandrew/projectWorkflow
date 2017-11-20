(function () {
  'use strict';

  angular
    .module('userprojects')
    .controller('UserprojectsMapController', UserprojectsMapController);

  UserprojectsMapController.$inject = ['UserprojectsService', '$scope'];

  function UserprojectsMapController(UserprojectsService, $scope, userproject) {
    var vm = this;

    vm.userprojects = UserprojectsService.query();

    //show info window if selected / clicked for details on the project 
    $scope.showProject = function(event, userproject) {
	            $scope.selectedProject = userproject;
	            $scope.map.showInfoWindow('myInfoWindow', this);
	        };

  // holds each of the types to filter by to be used in the function to check which should be on
  $scope.filterArray = [{ name: "Proposed", on: false}, {name:"Completed", on: false}, {name:"In Progress", on: false}, {name:"Pavement Marking", on: false}, {name:"Intersection", on: false}, {name:"Curve", on: false}];
  
  //must be set to true in the beginning before any filtering so that all are shown if no filters are chosen
  $scope.showAll = true;

  //function to actually filter each marker based on attributes checked
  $scope.myFiltering = function(a){
      if($scope.showAll) { return true; }
       
      var sel = false;
      for(name in $scope.filterArray){
        var t = $scope.filterArray[name];
        if(t.on){
            if(t.name == "Proposed"){
              if(a.progress == "Proposed"){
                sel = true;
              }
            }
            if(t.name == "Completed"){
              if(a.progress == "Completed"){
                sel = true;
              }
            }
            if(t.name == "In Progress"){
              if(a.progress == "In Progress"){
                sel = true;
              }
            }
            if(t.name == "Pavement Marking"){
              if(a.projecttype == "Pavement Marking"){
                sel = true;
              }
            }
            if(t.name == "Intersection"){
              if(a.projecttype == "Intersection"){
                sel = true;
              }
            }
            if(t.name == "Curve"){
              if(a.projecttype == "Curve"){
                sel = true;
              }
            }
        }
      }
       return sel;
  };

  // checks to see if filters are used, if not, display all, if filters used, display all is false 
  $scope.checkChange = function(event,userproject) {
        for(name in $scope.filterArray){
            if($scope.filterArray[name].on){
                $scope.showAll = false;
                return;
            }
        }
        $scope.showAll = true;
    };


  }
}());
