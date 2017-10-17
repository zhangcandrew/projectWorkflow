(function () {
  'use strict';

  describe('Aboutus Route Tests', function () {
    // Initialize global variables
    var $scope,
      AboutusService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AboutusService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AboutusService = _AboutusService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('aboutus');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/aboutus');
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
          AboutusController,
          mockAboutu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('aboutus.view');
          $templateCache.put('modules/aboutus/client/views/view-aboutu.client.view.html', '');

          // create mock Aboutu
          mockAboutu = new AboutusService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Aboutu Name'
          });

          // Initialize Controller
          AboutusController = $controller('AboutusController as vm', {
            $scope: $scope,
            aboutuResolve: mockAboutu
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:aboutuId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.aboutuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            aboutuId: 1
          })).toEqual('/aboutus/1');
        }));

        it('should attach an Aboutu to the controller scope', function () {
          expect($scope.vm.aboutu._id).toBe(mockAboutu._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/aboutus/client/views/view-aboutu.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AboutusController,
          mockAboutu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('aboutus.create');
          $templateCache.put('modules/aboutus/client/views/form-aboutu.client.view.html', '');

          // create mock Aboutu
          mockAboutu = new AboutusService();

          // Initialize Controller
          AboutusController = $controller('AboutusController as vm', {
            $scope: $scope,
            aboutuResolve: mockAboutu
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.aboutuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/aboutus/create');
        }));

        it('should attach an Aboutu to the controller scope', function () {
          expect($scope.vm.aboutu._id).toBe(mockAboutu._id);
          expect($scope.vm.aboutu._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/aboutus/client/views/form-aboutu.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AboutusController,
          mockAboutu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('aboutus.edit');
          $templateCache.put('modules/aboutus/client/views/form-aboutu.client.view.html', '');

          // create mock Aboutu
          mockAboutu = new AboutusService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Aboutu Name'
          });

          // Initialize Controller
          AboutusController = $controller('AboutusController as vm', {
            $scope: $scope,
            aboutuResolve: mockAboutu
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:aboutuId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.aboutuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            aboutuId: 1
          })).toEqual('/aboutus/1/edit');
        }));

        it('should attach an Aboutu to the controller scope', function () {
          expect($scope.vm.aboutu._id).toBe(mockAboutu._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/aboutus/client/views/form-aboutu.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
