var Sequelize = require('sequelize');
var path = require('path');
var config = require(path.join(__dirname, '..', '', 'config.json'));

if (config.env == 'prod') {
    /* Produção */
    sequelize = new Sequelize(
        'd34j8iut6s3rm9',
        'vaxlypenzpwnst',
        '8ca31a7e4d59cd538a6a8c39902eeb99494851be3f2522258391ca15fa249aa7',
        {
            host: "ec2-54-225-66-44.compute-1.amazonaws.com",
            port: 5432,
            dialect: 'postgres'
        });

} else if (config.env == 'dev') {
    /* Develop */
    sequelize = new Sequelize('dbname', 'contasapp', '', {
        host: "localhost",
        port: 5432,
        dialect: 'postgres'
    });
}

var User = sequelize.define('user', {
  username: {
      type : Sequelize.STRING,
      primaryKey : true
  },
  password: Sequelize.STRING
});

var Category = sequelize.define('category', {
    name: {
        type : Sequelize.STRING,
        primaryKey : true
    },
    icon: Sequelize.STRING,
    color: Sequelize.STRING,
    type: Sequelize.ENUM('CONTA', 'RECEBIMENTO')
});

var beforeHook = function(item){
    if (item.type=='CONTA' || item.type=='PAGO'){
        item.value = Math.abs(item.value) * -1;
    } else if (item.type=='RECEBIMENTO'){
        item.value = Math.abs(item.value);
    }
};

var Item = sequelize.define('item', 
{
    name: Sequelize.STRING,
    value: Sequelize.DECIMAL,
    category: Sequelize.STRING,
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    type: Sequelize.ENUM('CONTA', 'RECEBIMENTO')
},
{
hooks : {
            beforeCreate : beforeHook,
            beforeUpdate : beforeHook
        }
});

Category.belongsTo(Item, {foreignKey: 'category'});

module.exports.config = sequelize;
module.exports.User = User;
module.exports.Category = Category;
module.exports.Item = Item;