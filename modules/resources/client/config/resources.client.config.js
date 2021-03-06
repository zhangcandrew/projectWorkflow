(function () {
  'use strict';

  angular
    .module('resources')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Resources',
      state: 'resources.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'resources', {
      title: 'List Resources',
      state: 'resources.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'resources', {
      title: 'Create Resource',
      state: 'resources.create',
      roles: ['user']
    });
  }
}());
