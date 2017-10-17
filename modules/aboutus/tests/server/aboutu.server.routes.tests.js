'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aboutu = mongoose.model('Aboutu'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  aboutu;

/**
 * Aboutu routes tests
 */
describe('Aboutu CRUD tests', function () {

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

    // Save a user to the test db and create new Aboutu
    user.save(function () {
      aboutu = {
        name: 'Aboutu name'
      };

      done();
    });
  });

  it('should be able to save a Aboutu if logged in', function (done) {
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

        // Save a new Aboutu
        agent.post('/api/aboutus')
          .send(aboutu)
          .expect(200)
          .end(function (aboutuSaveErr, aboutuSaveRes) {
            // Handle Aboutu save error
            if (aboutuSaveErr) {
              return done(aboutuSaveErr);
            }

            // Get a list of Aboutus
            agent.get('/api/aboutus')
              .end(function (aboutusGetErr, aboutusGetRes) {
                // Handle Aboutus save error
                if (aboutusGetErr) {
                  return done(aboutusGetErr);
                }

                // Get Aboutus list
                var aboutus = aboutusGetRes.body;

                // Set assertions
                (aboutus[0].user._id).should.equal(userId);
                (aboutus[0].name).should.match('Aboutu name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Aboutu if not logged in', function (done) {
    agent.post('/api/aboutus')
      .send(aboutu)
      .expect(403)
      .end(function (aboutuSaveErr, aboutuSaveRes) {
        // Call the assertion callback
        done(aboutuSaveErr);
      });
  });

  it('should not be able to save an Aboutu if no name is provided', function (done) {
    // Invalidate name field
    aboutu.name = '';

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

        // Save a new Aboutu
        agent.post('/api/aboutus')
          .send(aboutu)
          .expect(400)
          .end(function (aboutuSaveErr, aboutuSaveRes) {
            // Set message assertion
            (aboutuSaveRes.body.message).should.match('Please fill Aboutu name');

            // Handle Aboutu save error
            done(aboutuSaveErr);
          });
      });
  });

  it('should be able to update an Aboutu if signed in', function (done) {
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

        // Save a new Aboutu
        agent.post('/api/aboutus')
          .send(aboutu)
          .expect(200)
          .end(function (aboutuSaveErr, aboutuSaveRes) {
            // Handle Aboutu save error
            if (aboutuSaveErr) {
              return done(aboutuSaveErr);
            }

            // Update Aboutu name
            aboutu.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Aboutu
            agent.put('/api/aboutus/' + aboutuSaveRes.body._id)
              .send(aboutu)
              .expect(200)
              .end(function (aboutuUpdateErr, aboutuUpdateRes) {
                // Handle Aboutu update error
                if (aboutuUpdateErr) {
                  return done(aboutuUpdateErr);
                }

                // Set assertions
                (aboutuUpdateRes.body._id).should.equal(aboutuSaveRes.body._id);
                (aboutuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Aboutus if not signed in', function (done) {
    // Create new Aboutu model instance
    var aboutuObj = new Aboutu(aboutu);

    // Save the aboutu
    aboutuObj.save(function () {
      // Request Aboutus
      request(app).get('/api/aboutus')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Aboutu if not signed in', function (done) {
    // Create new Aboutu model instance
    var aboutuObj = new Aboutu(aboutu);

    // Save the Aboutu
    aboutuObj.save(function () {
      request(app).get('/api/aboutus/' + aboutuObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', aboutu.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Aboutu with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/aboutus/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Aboutu is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Aboutu which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Aboutu
    request(app).get('/api/aboutus/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Aboutu with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Aboutu if signed in', function (done) {
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

        // Save a new Aboutu
        agent.post('/api/aboutus')
          .send(aboutu)
          .expect(200)
          .end(function (aboutuSaveErr, aboutuSaveRes) {
            // Handle Aboutu save error
            if (aboutuSaveErr) {
              return done(aboutuSaveErr);
            }

            // Delete an existing Aboutu
            agent.delete('/api/aboutus/' + aboutuSaveRes.body._id)
              .send(aboutu)
              .expect(200)
              .end(function (aboutuDeleteErr, aboutuDeleteRes) {
                // Handle aboutu error error
                if (aboutuDeleteErr) {
                  return done(aboutuDeleteErr);
                }

                // Set assertions
                (aboutuDeleteRes.body._id).should.equal(aboutuSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Aboutu if not signed in', function (done) {
    // Set Aboutu user
    aboutu.user = user;

    // Create new Aboutu model instance
    var aboutuObj = new Aboutu(aboutu);

    // Save the Aboutu
    aboutuObj.save(function () {
      // Try deleting Aboutu
      request(app).delete('/api/aboutus/' + aboutuObj._id)
        .expect(403)
        .end(function (aboutuDeleteErr, aboutuDeleteRes) {
          // Set message assertion
          (aboutuDeleteRes.body.message).should.match('User is not authorized');

          // Handle Aboutu error error
          done(aboutuDeleteErr);
        });

    });
  });

  it('should be able to get a single Aboutu that has an orphaned user reference', function (done) {
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

          // Save a new Aboutu
          agent.post('/api/aboutus')
            .send(aboutu)
            .expect(200)
            .end(function (aboutuSaveErr, aboutuSaveRes) {
              // Handle Aboutu save error
              if (aboutuSaveErr) {
                return done(aboutuSaveErr);
              }

              // Set assertions on new Aboutu
              (aboutuSaveRes.body.name).should.equal(aboutu.name);
              should.exist(aboutuSaveRes.body.user);
              should.equal(aboutuSaveRes.body.user._id, orphanId);

              // force the Aboutu to have an orphaned user reference
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

                    // Get the Aboutu
                    agent.get('/api/aboutus/' + aboutuSaveRes.body._id)
                      .expect(200)
                      .end(function (aboutuInfoErr, aboutuInfoRes) {
                        // Handle Aboutu error
                        if (aboutuInfoErr) {
                          return done(aboutuInfoErr);
                        }

                        // Set assertions
                        (aboutuInfoRes.body._id).should.equal(aboutuSaveRes.body._id);
                        (aboutuInfoRes.body.name).should.equal(aboutu.name);
                        should.equal(aboutuInfoRes.body.user, undefined);

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
      Aboutu.remove().exec(done);
    });
  });
});
