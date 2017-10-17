'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Training = mongoose.model('Training'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  training;

/**
 * Training routes tests
 */
describe('Training CRUD tests', function () {

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

    // Save a user to the test db and create new Training
    user.save(function () {
      training = {
        name: 'Training name'
      };

      done();
    });
  });

  it('should be able to save a Training if logged in', function (done) {
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

        // Save a new Training
        agent.post('/api/trainings')
          .send(training)
          .expect(200)
          .end(function (trainingSaveErr, trainingSaveRes) {
            // Handle Training save error
            if (trainingSaveErr) {
              return done(trainingSaveErr);
            }

            // Get a list of Trainings
            agent.get('/api/trainings')
              .end(function (trainingsGetErr, trainingsGetRes) {
                // Handle Trainings save error
                if (trainingsGetErr) {
                  return done(trainingsGetErr);
                }

                // Get Trainings list
                var trainings = trainingsGetRes.body;

                // Set assertions
                (trainings[0].user._id).should.equal(userId);
                (trainings[0].name).should.match('Training name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Training if not logged in', function (done) {
    agent.post('/api/trainings')
      .send(training)
      .expect(403)
      .end(function (trainingSaveErr, trainingSaveRes) {
        // Call the assertion callback
        done(trainingSaveErr);
      });
  });

  it('should not be able to save an Training if no name is provided', function (done) {
    // Invalidate name field
    training.name = '';

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

        // Save a new Training
        agent.post('/api/trainings')
          .send(training)
          .expect(400)
          .end(function (trainingSaveErr, trainingSaveRes) {
            // Set message assertion
            (trainingSaveRes.body.message).should.match('Please fill Training name');

            // Handle Training save error
            done(trainingSaveErr);
          });
      });
  });

  it('should be able to update an Training if signed in', function (done) {
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

        // Save a new Training
        agent.post('/api/trainings')
          .send(training)
          .expect(200)
          .end(function (trainingSaveErr, trainingSaveRes) {
            // Handle Training save error
            if (trainingSaveErr) {
              return done(trainingSaveErr);
            }

            // Update Training name
            training.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Training
            agent.put('/api/trainings/' + trainingSaveRes.body._id)
              .send(training)
              .expect(200)
              .end(function (trainingUpdateErr, trainingUpdateRes) {
                // Handle Training update error
                if (trainingUpdateErr) {
                  return done(trainingUpdateErr);
                }

                // Set assertions
                (trainingUpdateRes.body._id).should.equal(trainingSaveRes.body._id);
                (trainingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Trainings if not signed in', function (done) {
    // Create new Training model instance
    var trainingObj = new Training(training);

    // Save the training
    trainingObj.save(function () {
      // Request Trainings
      request(app).get('/api/trainings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Training if not signed in', function (done) {
    // Create new Training model instance
    var trainingObj = new Training(training);

    // Save the Training
    trainingObj.save(function () {
      request(app).get('/api/trainings/' + trainingObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', training.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Training with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/trainings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Training is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Training which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Training
    request(app).get('/api/trainings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Training with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Training if signed in', function (done) {
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

        // Save a new Training
        agent.post('/api/trainings')
          .send(training)
          .expect(200)
          .end(function (trainingSaveErr, trainingSaveRes) {
            // Handle Training save error
            if (trainingSaveErr) {
              return done(trainingSaveErr);
            }

            // Delete an existing Training
            agent.delete('/api/trainings/' + trainingSaveRes.body._id)
              .send(training)
              .expect(200)
              .end(function (trainingDeleteErr, trainingDeleteRes) {
                // Handle training error error
                if (trainingDeleteErr) {
                  return done(trainingDeleteErr);
                }

                // Set assertions
                (trainingDeleteRes.body._id).should.equal(trainingSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Training if not signed in', function (done) {
    // Set Training user
    training.user = user;

    // Create new Training model instance
    var trainingObj = new Training(training);

    // Save the Training
    trainingObj.save(function () {
      // Try deleting Training
      request(app).delete('/api/trainings/' + trainingObj._id)
        .expect(403)
        .end(function (trainingDeleteErr, trainingDeleteRes) {
          // Set message assertion
          (trainingDeleteRes.body.message).should.match('User is not authorized');

          // Handle Training error error
          done(trainingDeleteErr);
        });

    });
  });

  it('should be able to get a single Training that has an orphaned user reference', function (done) {
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

          // Save a new Training
          agent.post('/api/trainings')
            .send(training)
            .expect(200)
            .end(function (trainingSaveErr, trainingSaveRes) {
              // Handle Training save error
              if (trainingSaveErr) {
                return done(trainingSaveErr);
              }

              // Set assertions on new Training
              (trainingSaveRes.body.name).should.equal(training.name);
              should.exist(trainingSaveRes.body.user);
              should.equal(trainingSaveRes.body.user._id, orphanId);

              // force the Training to have an orphaned user reference
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

                    // Get the Training
                    agent.get('/api/trainings/' + trainingSaveRes.body._id)
                      .expect(200)
                      .end(function (trainingInfoErr, trainingInfoRes) {
                        // Handle Training error
                        if (trainingInfoErr) {
                          return done(trainingInfoErr);
                        }

                        // Set assertions
                        (trainingInfoRes.body._id).should.equal(trainingSaveRes.body._id);
                        (trainingInfoRes.body.name).should.equal(training.name);
                        should.equal(trainingInfoRes.body.user, undefined);

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
      Training.remove().exec(done);
    });
  });
});
