var sequelize = require('sequelize')

var Category = sequelize.define('category', {
    name: {
        type : Sequelize.STRING,
        primaryKey : true
    },
    icon: Sequelize.STRING,
    color: Sequelize.STRING,
    type: Sequelize.ENUM('CONTA', 'RECEBIMENTO')
});

module.exports = Category;