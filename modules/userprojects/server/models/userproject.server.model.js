'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Userproject Schema
 */
var UserprojectSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill project name',
    trim: true
  },
    address: {
    type: String,
    default: '',
    required: 'Please fill project address',
    trim: true
  },
    description: {
    type: String,
    default: '',
    required: 'Please fill project description',
    trim: true
  },
    longitude: {
    type: Number,
    default: '',
    required: 'Please fill Userproject longitude',
    trim: true
  },
    latitude: {
    type: Number,
    default: '',
    required: 'Please fill project latitude',
    trim: true
  },
    progress: {
    type: String,
    default: '',
    required: 'Please select your projects current progress',
    trim: true
  },
    imagelink: {
    type: String,
    default: '',
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

mongoose.model('Userproject', UserprojectSchema);
