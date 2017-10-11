(function () {
  'use strict';

  describe('Aboutus List Controller Tests', function () {
    // Initialize global variables
    var AboutusListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      AboutusService,
      mockAboutu;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _AboutusService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      AboutusService = _AboutusService_;

      // create mock article
      mockAboutu = new AboutusService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Aboutu Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Aboutus List controller.
      AboutusListController = $controller('AboutusListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockAboutuList;

      beforeEach(function () {
        mockAboutuList = [mockAboutu, mockAboutu];
      });

      it('should send a GET request and return all Aboutus', inject(function (AboutusService) {
        // Set POST response
        $httpBackend.expectGET('api/aboutus').respond(mockAboutuList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.aboutus.length).toEqual(2);
        expect($scope.vm.aboutus[0]).toEqual(mockAboutu);
        expect($scope.vm.aboutus[1]).toEqual(mockAboutu);

      }));
    });
  });
}());
