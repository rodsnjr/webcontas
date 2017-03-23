var Category = require('../models/Category');
function MainController(){
    var app = require('express').Router();
    
    app.get('/', function(request, response) {
    Category.findAll().then(function(all){
            response.render('index.njk', { categories : all });
        });
    });

    return app;
}

module.exports = MainController;