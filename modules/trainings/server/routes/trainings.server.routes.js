'use strict';

/**
 * Module dependencies
 */
var trainingsPolicy = require('../policies/trainings.server.policy'),
  trainings = require('../controllers/trainings.server.controller');

module.exports = function(app) {
  // Trainings Routes
  app.route('/api/trainings').all(trainingsPolicy.isAllowed)
    .get(trainings.list)
    .post(trainings.create);

  app.route('/api/trainings/:trainingId').all(trainingsPolicy.isAllowed)
    .get(trainings.read)
    .put(trainings.update)
    .delete(trainings.delete);

  // Finish by binding the Training middleware
  app.param('trainingId', trainings.trainingByID);
};
