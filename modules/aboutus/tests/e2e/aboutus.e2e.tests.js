'use strict';

describe('Aboutus E2E Tests:', function () {
  describe('Test Aboutus page', function () {
    it('Should not have missing elements', function () {
      browser.get('http://localhost:3000/aboutus');
      //expect(element.all(by.repeater('aboutu in aboutus')).count()).toEqual(0);
      //this is the only content on the page. Checking if it exists
      let aboutBoxes = $$('.aboutustxtbox');
      expect($('#aboutImage').isPresent()).toBeTruthy();
      expect(aboutBoxes.count()).toBe(3);
      //browser.pause(5001);
    });
  });
});
