'use strict';

describe('Userprojects E2E Tests:', function () {
  describe('Test Userprojects page', function () {
    var listedProj = element.all(by.repeater('userproject'));
    it('Should be able to explore all listed projects', function () {
      browser.get('http://localhost:3000/userprojects');
      expect(listedProj.count()).toEqual(9);
    });
  });
});
