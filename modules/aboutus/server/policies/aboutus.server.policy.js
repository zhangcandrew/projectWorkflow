'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Aboutus Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/aboutus',
      permissions: '*'
    }, {
      resources: '/api/aboutus/:aboutuId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/aboutus',
      permissions: ['get', 'post']
    }, {
      resources: '/api/aboutus/:aboutuId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/aboutus',
      permissions: ['get']
    }, {
      resources: '/api/aboutus/:aboutuId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Aboutus Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Aboutu is being processed and the current user created it then allow any manipulation
  if (req.aboutu && req.user && req.aboutu.user && req.aboutu.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
