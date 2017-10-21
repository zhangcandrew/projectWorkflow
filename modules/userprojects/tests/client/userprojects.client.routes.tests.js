(function () {
  'use strict';

  describe('Userprojects Route Tests', function () {
    // Initialize global variables
    var $scope,
      UserprojectsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _UserprojectsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      UserprojectsService = _UserprojectsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('userprojects');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/userprojects');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          UserprojectsController,
          mockUserproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('userprojects.view');
          $templateCache.put('modules/userprojects/client/views/view-userproject.client.view.html', '');

          // create mock Userproject
          mockUserproject = new UserprojectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Userproject Name'
          });

          // Initialize Controller
          UserprojectsController = $controller('UserprojectsController as vm', {
            $scope: $scope,
            userprojectResolve: mockUserproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:userprojectId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.userprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            userprojectId: 1
          })).toEqual('/userprojects/1');
        }));

        it('should attach an Userproject to the controller scope', function () {
          expect($scope.vm.userproject._id).toBe(mockUserproject._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/userprojects/client/views/view-userproject.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          UserprojectsController,
          mockUserproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('userprojects.create');
          $templateCache.put('modules/userprojects/client/views/form-userproject.client.view.html', '');

          // create mock Userproject
          mockUserproject = new UserprojectsService();

          // Initialize Controller
          UserprojectsController = $controller('UserprojectsController as vm', {
            $scope: $scope,
            userprojectResolve: mockUserproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.userprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/userprojects/create');
        }));

        it('should attach an Userproject to the controller scope', function () {
          expect($scope.vm.userproject._id).toBe(mockUserproject._id);
          expect($scope.vm.userproject._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/userprojects/client/views/form-userproject.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          UserprojectsController,
          mockUserproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('userprojects.edit');
          $templateCache.put('modules/userprojects/client/views/form-userproject.client.view.html', '');

          // create mock Userproject
          mockUserproject = new UserprojectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Userproject Name'
          });

          // Initialize Controller
          UserprojectsController = $controller('UserprojectsController as vm', {
            $scope: $scope,
            userprojectResolve: mockUserproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:userprojectId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.userprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            userprojectId: 1
          })).toEqual('/userprojects/1/edit');
        }));

        it('should attach an Userproject to the controller scope', function () {
          expect($scope.vm.userproject._id).toBe(mockUserproject._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/userprojects/client/views/form-userproject.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
