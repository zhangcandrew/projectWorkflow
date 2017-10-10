(function () {
  'use strict';

  angular
    .module('maps')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Maps',
      state: 'maps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'maps', {
      title: 'List Maps',
      state: 'maps.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'maps', {
      title: 'Create Map',
      state: 'maps.create',
      roles: ['user']
    });
  }
}());
