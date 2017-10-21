'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Userproject = mongoose.model('Userproject'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Userproject
 */
exports.create = function(req, res) {
  var userproject = new Userproject(req.body);
  userproject.user = req.user;

  userproject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(userproject);
    }
  });
};

/**
 * Show the current Userproject
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var userproject = req.userproject ? req.userproject.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  userproject.isCurrentUserOwner = req.user && userproject.user && userproject.user._id.toString() === req.user._id.toString();

  res.jsonp(userproject);
};

/**
 * Update a Userproject
 */
exports.update = function(req, res) {
  var userproject = req.userproject;

  userproject = _.extend(userproject, req.body);

  userproject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(userproject);
    }
  });
};

/**
 * Delete an Userproject
 */
exports.delete = function(req, res) {
  var userproject = req.userproject;

  userproject.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(userproject);
    }
  });
};

/**
 * List of Userprojects
 */
exports.list = function(req, res) {
  Userproject.find().sort('-created').populate('user', 'displayName').exec(function(err, userprojects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(userprojects);
    }
  });
};

/**
 * Userproject middleware
 */
exports.userprojectByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Userproject is invalid'
    });
  }

  Userproject.findById(id).populate('user', 'displayName').exec(function (err, userproject) {
    if (err) {
      return next(err);
    } else if (!userproject) {
      return res.status(404).send({
        message: 'No Userproject with that identifier has been found'
      });
    }
    req.userproject = userproject;
    next();
  });
};
