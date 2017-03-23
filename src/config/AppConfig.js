function AppConfig(app){
    const Data = require('./DatabaseConfig');
    
    Data.config.sync().then(function(){
        var Migrations = require('./Migrations');
        return Migrations();
    });

    const Controllers = require('./ControllersConfig')(app.get('passport'));

    return Controllers;
};

module.exports = AppConfig;