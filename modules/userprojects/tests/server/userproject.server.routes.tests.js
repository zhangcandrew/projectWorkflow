'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Userproject = mongoose.model('Userproject'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  userproject;

/**
 * Userproject routes tests
 */
describe('Userproject CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Userproject
    user.save(function () {
      userproject = {
        name: 'Userproject name'
      };

      done();
    });
  });

  it('should be able to save a Userproject if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Userproject
        agent.post('/api/userprojects')
          .send(userproject)
          .expect(200)
          .end(function (userprojectSaveErr, userprojectSaveRes) {
            // Handle Userproject save error
            if (userprojectSaveErr) {
              return done(userprojectSaveErr);
            }

            // Get a list of Userprojects
            agent.get('/api/userprojects')
              .end(function (userprojectsGetErr, userprojectsGetRes) {
                // Handle Userprojects save error
                if (userprojectsGetErr) {
                  return done(userprojectsGetErr);
                }

                // Get Userprojects list
                var userprojects = userprojectsGetRes.body;

                // Set assertions
                (userprojects[0].user._id).should.equal(userId);
                (userprojects[0].name).should.match('Userproject name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Userproject if not logged in', function (done) {
    agent.post('/api/userprojects')
      .send(userproject)
      .expect(403)
      .end(function (userprojectSaveErr, userprojectSaveRes) {
        // Call the assertion callback
        done(userprojectSaveErr);
      });
  });

  it('should not be able to save an Userproject if no name is provided', function (done) {
    // Invalidate name field
    userproject.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Userproject
        agent.post('/api/userprojects')
          .send(userproject)
          .expect(400)
          .end(function (userprojectSaveErr, userprojectSaveRes) {
            // Set message assertion
            (userprojectSaveRes.body.message).should.match('Please fill Userproject name');

            // Handle Userproject save error
            done(userprojectSaveErr);
          });
      });
  });

  it('should be able to update an Userproject if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Userproject
        agent.post('/api/userprojects')
          .send(userproject)
          .expect(200)
          .end(function (userprojectSaveErr, userprojectSaveRes) {
            // Handle Userproject save error
            if (userprojectSaveErr) {
              return done(userprojectSaveErr);
            }

            // Update Userproject name
            userproject.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Userproject
            agent.put('/api/userprojects/' + userprojectSaveRes.body._id)
              .send(userproject)
              .expect(200)
              .end(function (userprojectUpdateErr, userprojectUpdateRes) {
                // Handle Userproject update error
                if (userprojectUpdateErr) {
                  return done(userprojectUpdateErr);
                }

                // Set assertions
                (userprojectUpdateRes.body._id).should.equal(userprojectSaveRes.body._id);
                (userprojectUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Userprojects if not signed in', function (done) {
    // Create new Userproject model instance
    var userprojectObj = new Userproject(userproject);

    // Save the userproject
    userprojectObj.save(function () {
      // Request Userprojects
      request(app).get('/api/userprojects')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Userproject if not signed in', function (done) {
    // Create new Userproject model instance
    var userprojectObj = new Userproject(userproject);

    // Save the Userproject
    userprojectObj.save(function () {
      request(app).get('/api/userprojects/' + userprojectObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', userproject.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Userproject with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/userprojects/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Userproject is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Userproject which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Userproject
    request(app).get('/api/userprojects/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Userproject with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Userproject if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Userproject
        agent.post('/api/userprojects')
          .send(userproject)
          .expect(200)
          .end(function (userprojectSaveErr, userprojectSaveRes) {
            // Handle Userproject save error
            if (userprojectSaveErr) {
              return done(userprojectSaveErr);
            }

            // Delete an existing Userproject
            agent.delete('/api/userprojects/' + userprojectSaveRes.body._id)
              .send(userproject)
              .expect(200)
              .end(function (userprojectDeleteErr, userprojectDeleteRes) {
                // Handle userproject error error
                if (userprojectDeleteErr) {
                  return done(userprojectDeleteErr);
                }

                // Set assertions
                (userprojectDeleteRes.body._id).should.equal(userprojectSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Userproject if not signed in', function (done) {
    // Set Userproject user
    userproject.user = user;

    // Create new Userproject model instance
    var userprojectObj = new Userproject(userproject);

    // Save the Userproject
    userprojectObj.save(function () {
      // Try deleting Userproject
      request(app).delete('/api/userprojects/' + userprojectObj._id)
        .expect(403)
        .end(function (userprojectDeleteErr, userprojectDeleteRes) {
          // Set message assertion
          (userprojectDeleteRes.body.message).should.match('User is not authorized');

          // Handle Userproject error error
          done(userprojectDeleteErr);
        });

    });
  });

  it('should be able to get a single Userproject that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Userproject
          agent.post('/api/userprojects')
            .send(userproject)
            .expect(200)
            .end(function (userprojectSaveErr, userprojectSaveRes) {
              // Handle Userproject save error
              if (userprojectSaveErr) {
                return done(userprojectSaveErr);
              }

              // Set assertions on new Userproject
              (userprojectSaveRes.body.name).should.equal(userproject.name);
              should.exist(userprojectSaveRes.body.user);
              should.equal(userprojectSaveRes.body.user._id, orphanId);

              // force the Userproject to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Userproject
                    agent.get('/api/userprojects/' + userprojectSaveRes.body._id)
                      .expect(200)
                      .end(function (userprojectInfoErr, userprojectInfoRes) {
                        // Handle Userproject error
                        if (userprojectInfoErr) {
                          return done(userprojectInfoErr);
                        }

                        // Set assertions
                        (userprojectInfoRes.body._id).should.equal(userprojectSaveRes.body._id);
                        (userprojectInfoRes.body.name).should.equal(userproject.name);
                        should.equal(userprojectInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Userproject.remove().exec(done);
    });
  });
});
