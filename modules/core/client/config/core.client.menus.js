(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      state: 'settings.accounts'
    });

    menuService.addMenuItem('topbar', {
      title: 'About Us',
      state: 'aboutus',
      roles: ['*']
    });

        menuService.addMenuItem('topbar', {
      title: 'Projects',
      state: 'projects',
      roles: ['*']
    });

            menuService.addMenuItem('topbar', {
      title: 'Training',
      state: 'training',
      roles: ['*']
    });

                menuService.addMenuItem('topbar', {
      title: 'Resources',
      state: 'resources',
      roles: ['*']
    });
                    menuService.addMenuItem('topbar', {
      title: 'Contact Us',
      state: 'contactus',
      roles: ['*']
    });
  }
}());
