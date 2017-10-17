(function () {
  'use strict';

  angular
    .module('contactus')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contact Us',
      state: 'contactus.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'contactus', {
      title: 'List Contact Us',
      state: 'contactus.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'contactus', {
      title: 'Create Contact Us',
      state: 'contactus.create',
      roles: ['user']
    });
  }
}());
