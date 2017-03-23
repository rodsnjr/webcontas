var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var passport = require('passport');
var appConfig = require('./src/config/AppConfig');
var app = express();

// Templating
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(require('cookie-parser')());
app.use(require('express-session')
    ({ secret: 'nogueiraRodney', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 5000));
app.set('dbconfig', 'dev');
app.set('passport', passport);
app.use(express.static(__dirname + '/public'));

app.use(appConfig(app));

app.listen(app.get('port'), function() {
   console.log('Application Runing on Port ', app.get('port'));
});