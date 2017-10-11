'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Training = mongoose.model('Training'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Training
 */
exports.create = function(req, res) {
  var training = new Training(req.body);
  training.user = req.user;

  training.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(training);
    }
  });
};

/**
 * Show the current Training
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var training = req.training ? req.training.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  training.isCurrentUserOwner = req.user && training.user && training.user._id.toString() === req.user._id.toString();

  res.jsonp(training);
};

/**
 * Update a Training
 */
exports.update = function(req, res) {
  var training = req.training;

  training = _.extend(training, req.body);

  training.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(training);
    }
  });
};

/**
 * Delete an Training
 */
exports.delete = function(req, res) {
  var training = req.training;

  training.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(training);
    }
  });
};

/**
 * List of Trainings
 */
exports.list = function(req, res) {
  Training.find().sort('-created').populate('user', 'displayName').exec(function(err, trainings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trainings);
    }
  });
};

/**
 * Training middleware
 */
exports.trainingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Training is invalid'
    });
  }

  Training.findById(id).populate('user', 'displayName').exec(function (err, training) {
    if (err) {
      return next(err);
    } else if (!training) {
      return res.status(404).send({
        message: 'No Training with that identifier has been found'
      });
    }
    req.training = training;
    next();
  });
};
