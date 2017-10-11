'use strict';

/**
 * Module dependencies
 */
var aboutusPolicy = require('../policies/aboutus.server.policy'),
  aboutus = require('../controllers/aboutus.server.controller');

module.exports = function(app) {
  // Aboutus Routes
  app.route('/api/aboutus').all(aboutusPolicy.isAllowed)
    .get(aboutus.list)
    .post(aboutus.create);

  app.route('/api/aboutus/:aboutuId').all(aboutusPolicy.isAllowed)
    .get(aboutus.read)
    .put(aboutus.update)
    .delete(aboutus.delete);

  // Finish by binding the Aboutus middleware
  app.param('aboutuId', aboutus.aboutuByID);
};
