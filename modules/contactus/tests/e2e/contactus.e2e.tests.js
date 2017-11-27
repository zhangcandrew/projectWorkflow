'use strict';

describe('Contactus E2E Tests:', function () {
  describe('Test Contactus page', function () {
    it('Should not have missing elements', function () {
      browser.get('http://localhost:3000/contactus');
      //expect(element.all(by.repeater('contactu in contactus')).count()).toEqual(0);
      let contactBoxes = $$('.contactTextBox');
      expect($('#contactImage').isPresent()).toBeTruthy();
      expect(contactBoxes.count()).toBe(3);
    });
  });
});
