'use strict';

describe('Trainings E2E Tests:', function () {
  describe('Test Trainings page', function () {
    var registerButton = element(by.id('register'));
    var googleCal = element(by.id('calendar'));
    it('Should not have missing elements', function () {
      browser.get('http://localhost:3000/trainings');
      expect(registerButton.isPresent()).toBeTruthy();
      expect(googleCal.isPresent()).toBeTruthy();
      //expect(element.all(by.repeater('training in trainings')).count()).toEqual(0);
    });
    //prevents switch to non-angular page from causing errors. Used StackOverflow
    beforeEach(function() {
      browser.ignoreSynchronization = true;
    });
    afterEach(function () {
      browser.ignoreSynchronization = false;
    });
    //switches from opened tab after clicking back to original app's page
    it('should be able to register',function () {
      registerButton.click().then(function() {
        browser.getAllWindowHandles().then(function (handles) {
          browser.switchTo().window(handles[handles.length - 1]).then(function(){
            expect(browser.getCurrentUrl()).toBe("https://xms.dce.ufl.edu/reg/groups/FT/");
          });

          //switch windows
          browser.switchTo().window(handles[0]);
        });
      });


    });
  });
});
