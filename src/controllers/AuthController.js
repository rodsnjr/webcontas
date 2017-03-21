var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy
var md5 = require('md5');

function AuthController(app, passport) {
  if (!app && !passport) {
    throw new Error('Express App Router and Passport Required');
  }

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
  })
  );

  app.get('/login', function (request, response) {
    response.render('login.njk');
  });

};


module.exports = AuthController;