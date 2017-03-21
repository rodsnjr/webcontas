var sequelize = require('sequelize');
var Category = require('./Category')

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

module.exports = Item;