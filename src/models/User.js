var sequelize = require('sequelize');

var User = sequelize.define('user', {
  username: {
      type : Sequelize.STRING,
      primaryKey : true
  },
  password: Sequelize.STRING
});

module.exports = User;