function Controllers(app){
    const main = require('../controllers/MainController')(app);
    const auth = require('../controllers/AuthController')(app, app.get('passport'));
    const items = require('../controllers/ItemsController')(app);
    const template = require('../controllers/TemplateController')(app);
    
    const AuthMiddleware = require('../middleware/AuthMiddleware');
    app.use(auth);
    app.use(main);
    
    app.use('/view', AuthMiddleware(), template);
    app.use('/api/items', AuthMiddleware(), items);
    
    return app;
};

module.exports = Controllers;