function AppConfig(app){
    const Controllers = require('./Controllers')(app);
    const Data = require('./Data')(app.get('dbconfig'));

    return app;
};

module.exports = AppConfig;

