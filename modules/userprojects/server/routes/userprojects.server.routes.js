'use strict';

/**
 * Module dependencies
 */
var userprojectsPolicy = require('../policies/userprojects.server.policy'),
  userprojects = require('../controllers/userprojects.server.controller');

module.exports = function(app) {
  // Userprojects Routes
  app.route('/api/userprojects').all(userprojectsPolicy.isAllowed)
    .get(userprojects.list)
    .post(userprojects.create);

  app.route('/api/userprojects/:userprojectId').all(userprojectsPolicy.isAllowed)
    .get(userprojects.read)
    .put(userprojects.update)
    .delete(userprojects.delete);

  // Finish by binding the Userproject middleware
  app.param('userprojectId', userprojects.userprojectByID);
};
