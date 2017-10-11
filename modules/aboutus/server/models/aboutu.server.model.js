'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Aboutu Schema
 */
var AboutuSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Aboutu name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Aboutu', AboutuSchema);
