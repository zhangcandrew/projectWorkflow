(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
  }
  angular.module('core').controller('HomeController', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;  

    //input links to images here to be displayed- works for 4 images and jpg files in array below
    var gatorSlides = $scope.gatorSlides = ['https://i.imgur.com/mtgcd80.jpg','https://i.imgur.com/9Zml2dR.jpg', 'https://i.imgur.com/vs3C2bq.jpg', 'https://i.imgur.com/4vReQRP.jpg'];

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: gatorSlides[currIndex],
        style:{
          width: '1030px',
          height: '400px',
          
        },
        /*image: '//unsplash.it/' + newWidth + ,'/300',*/
        //text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: currIndex++
      });
    };
  
    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };
  
    for (var i = 0; i < 4; i++) {
      $scope.addSlide();
    }
  
    // Randomize logic below
  
    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }
  
    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }
  
    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;
  
      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }
  
      return array;
    }
  });
}());
