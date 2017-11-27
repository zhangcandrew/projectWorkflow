'use strict';

describe('Resources E2E Tests:', function () {
  describe('Test Resources page', function () {
    it('Should not have missing elements', function () {
      browser.get('http://localhost:3000/resources');
      //expect(element.all(by.repeater('resource in resources')).count()).toEqual(0);
      let resourceBoxes = $$('.txtbox');
      expect(resourceBoxes.count()).toBe(4);
    });
    //prevents switch to non-angular page from causing errors. Used StackOverflow
    beforeEach(function() {
      browser.ignoreSynchronization = true;
    });
    afterEach(function () {
      browser.ignoreSynchronization = false;
    });
    it('Should check if links work', function() {
      element(by.partialLinkText('(FHWA)')).click()
      expect(browser.getCurrentUrl()).toBe("https://safety.fhwa.dot.gov/");
      browser.navigate().back();
    });
  });
});
