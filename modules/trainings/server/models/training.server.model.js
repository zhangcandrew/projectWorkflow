'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Training Schema
 */
var TrainingSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Training name',
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

mongoose.model('Training', TrainingSchema);
