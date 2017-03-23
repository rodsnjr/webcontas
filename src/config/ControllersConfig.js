function Controllers(passport){
    var app = require('express').Router();
    
    const main = require('../controllers/MainController');
    const auth = require('../controllers/AuthController')(passport);
    const items = require('../controllers/ItemsController');
    const template = require('../controllers/TemplateController');
    
    var AuthMiddleware = require('../middleware/AuthMiddleware');
    app.use(auth);
    app.use('/', AuthMiddleware(), main);
    
    app.use('/view', AuthMiddleware(), template);
    app.use('/api/items', AuthMiddleware(), items);
    
    return app;
};

module.exports = Controllers;