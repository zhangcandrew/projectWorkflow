(function () {
  'use strict';

  angular
    .module('aboutus')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'About Us',
      state: 'aboutus.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'aboutus', {
      title: 'List About Us',
      state: 'aboutus.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'aboutus', {
      title: 'Create About Us',
      state: 'aboutus.create',
      roles: ['user']
    });
  }
}());
