'use strict';

describe('Projects E2E Tests:', function () {
  describe('Test Projects page', function () {
    var map = element(by.id('map'));
    it('Should not have missing elements', function () {
      browser.get('http://localhost:3000/projects');
      //expect(element.all(by.repeater('project in projects')).count()).toEqual(0);
      expect(map.isPresent()).toBeTruthy();
    });
  });
});
