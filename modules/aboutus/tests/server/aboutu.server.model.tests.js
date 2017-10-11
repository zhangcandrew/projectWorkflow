'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aboutu = mongoose.model('Aboutu');

/**
 * Globals
 */
var user,
  aboutu;

/**
 * Unit tests
 */
describe('Aboutu Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      aboutu = new Aboutu({
        name: 'Aboutu Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return aboutu.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      aboutu.name = '';

      return aboutu.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Aboutu.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
