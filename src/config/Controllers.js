var app = require('express').Router();
var items = require('./items');

app.use('/items', items);

module.exports = app;