'use strict';

describe('Userprojects E2E Tests:', function () {
  describe('Test Userprojects page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/userprojects');
      expect(element.all(by.repeater('userproject in userprojects')).count()).toEqual(0);
    });
  });
});
