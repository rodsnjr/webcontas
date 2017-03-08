//Routers
var express = require('express');
var bodyParser = require('body-parser');
//Views
var nunjucks = require('nunjucks');
var views = require('./src/views');
//Database
var data = require('./src/data');
var api = require('./src/api');
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


// Auth
var auth = require('./src/auth');
var loggedIn = require('connect-ensure-login').ensureLoggedIn;
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(auth.app);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use('/view', loggedIn(), views);
app.use('/api', loggedIn(), api);

app.get('/', loggedIn(), function(request, response) {
    data.Category.findAll().then(function(all){
        response.render('index.njk', { categories : all });
    });
});

app.listen(app.get('port'), function() {
   console.log('Application Runing on Port ', app.get('port'));
});