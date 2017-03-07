//Routers
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
//Views
var nunjucks = require('nunjucks');
var views = require('./src/views');
//Database
var data = require('./src/data');
var api = require('./src/api');
var ws=require('./src/websocket');

var app = express();

// Templating
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use('/view', views);
app.use('/api', api);

app.get('/', function(request, response) {
    response.render('index.njk');
});

const server = http.createServer(app);
ws.createServer(server);

server.listen(app.get('port'), function() {
   console.log('Application Runing on Port ', app.get('port'));
});