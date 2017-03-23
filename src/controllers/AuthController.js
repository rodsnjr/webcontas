function AuthController(passport) {
  
  if (!passport) {
    throw new Error('Passport Required');
  }

  var User = require('../models/User');
  var LocalStrategy = require('passport-local').Strategy
  var md5 = require('md5');
  
  var app = require('express').Router();

  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findById(username)
        .then(function (user) {
          if (!user) {
            return done(null, false, { message: "No User with this name" + username });
          }
          if (user.password == md5(password)) {
            return done(null, user);
          }
          return done(null, false);
        }).catch(function (error) {
          return done(error);
        });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    User.findById(username)
      .then(function (user) {
        done(null, user);
      }).catch(function (error) {
        done(error);
      });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/view/login/error'
  }));

  app.get('/login', function (request, response) {
    response.render('login.njk');
  });

  return app;

};


module.exports = AuthController;