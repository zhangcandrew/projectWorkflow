//roles can be set to 'user', 'admin', both, or '*'. '*' Represents any web app user even those not signed in.
(function () {
  'use strict';

  angular
    .module('userprojects')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'User Projects',
      state: 'userprojects',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'userprojects', {
      title: 'List User Project',
      state: 'userprojects.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'userprojects', {
      title: 'Create User Project',
      state: 'userprojects.create',
      roles: ['admin']
    });

    menuService.addSubMenuItem('topbar', 'admin', {
    title: 'Manage Projects',
    state: 'userprojects.list'

    });

        menuService.addSubMenuItem('topbar', 'admin', {
    title: 'Add New Project',
    state: 'userprojects.create'

    });
          //Add menu item for the map
            menuService.addMenuItem('topbar', {
      title: 'Projects Map',
      state: 'userprojects.map',
      roles: ['*']
    });
  }
}());
