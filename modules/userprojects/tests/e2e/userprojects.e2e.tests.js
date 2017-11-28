'use strict';

describe('Userprojects E2E Tests:', function () {

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3000/authentication/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };

/*  var project1 = {
    name: 'testProject',
    address: '1234 testing st',
    description: 'this intersection is not real',
    longitude: '',
    latitude: ''
  }
  var user3 = {
    firstName: 'testing',
    lastName: 'this',
    email: 'testthis@mean.js',
    username: 'testthisss',
    password: 'P@$$w0rd!!'
  };
  */

  var newProject1 = {
      name: 'testProject',
      address: '1234 testing st',
      description: 'this intersection is not real',
      longitude: '-81.611738',
      latitude: '30.3004161',
      projType: 'Intersection',
      progress: 'Proposed',
      projImage: ''
    }

  describe('Test Userprojects page', function () {
    var listedProj = element.all(by.repeater('userproject'));
    it('Should be able to explore all listed projects', function () {
      browser.get('http://localhost:3000/userprojects');
      expect(listedProj.count()).toEqual(9);
    });

    /*describe('User projects when logged in as Admin', function(){
      it('should be allowed to create a project', function() {
        // Make sure user is signed out first
        signout();
        //signin as Admin
        browser.get('http://localhost:3000/authentication/signin');
        // Enter UserName
        element(by.model('vm.credentials.usernameOrEmail')).sendKeys(user3.username);
        // Enter Password
        element(by.model('vm.credentials.password')).sendKeys(user3.password);
        // Click Submit button
        element(by.css('button[type="submit"]')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
        //access form page for a new project
        browser.get('http://localhost:3000/create');
        //select a project to edit
      });
    });*/
  });
  /*

  */

  /*describe('Admin to project interaction', function(){
    it('should successfully create a project', function() {
      // Make sure user is signed out first
      signout();
      //signin as Admin
      browser.get('http://localhost:3000/authentication/signin');
      // Enter UserName
      element(by.model('vm.credentials.usernameOrEmail')).sendKeys('testthisss');
      // Enter Password
      element(by.model('vm.credentials.password')).sendKeys('P@$$w0rd!!');
      // Click Submit button
      element(by.css('button[type="submit"]')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
      // Open Add New Project option
      browser.get('http://localhost:3000/admin/create');
      //fill out form with test project
    });
  });*/
});
