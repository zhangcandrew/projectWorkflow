'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Aboutu = mongoose.model('Aboutu'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Aboutus
 */
exports.create = function(req, res) {
  var aboutu = new Aboutu(req.body);
  aboutu.user = req.user;

  aboutu.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutu);
    }
  });
};

/**
 * Show the current Aboutu
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var aboutu = req.aboutu ? req.aboutu.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  aboutu.isCurrentUserOwner = req.user && aboutu.user && aboutu.user._id.toString() === req.user._id.toString();

  res.jsonp(aboutu);
};

/**
 * Update a Aboutu
 */
exports.update = function(req, res) {
  var aboutu = req.aboutu;

  aboutu = _.extend(aboutu, req.body);

  aboutu.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutu);
    }
  });
};

/**
 * Delete an Aboutu
 */
exports.delete = function(req, res) {
  var aboutu = req.aboutu;

  aboutu.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutu);
    }
  });
};

/**
 * List of Aboutus
 */
exports.list = function(req, res) {
  Aboutu.find().sort('-created').populate('user', 'displayName').exec(function(err, aboutus) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aboutus);
    }
  });
};

/**
 * Aboutu middleware
 */
exports.aboutuByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Aboutus is invalid'
    });
  }

  Aboutu.findById(id).populate('user', 'displayName').exec(function (err, aboutu) {
    if (err) {
      return next(err);
    } else if (!aboutu) {
      return res.status(404).send({
        message: 'No Aboutus with that identifier has been found'
      });
    }
    req.aboutu = aboutu;
    next();
  });
};
