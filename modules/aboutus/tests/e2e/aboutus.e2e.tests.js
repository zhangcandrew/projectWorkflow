'use strict';

describe('Aboutus E2E Tests:', function () {
  describe('Test Aboutus page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/aboutus');
      expect(element.all(by.repeater('aboutu in aboutus')).count()).toEqual(0);
    });
  });
});
