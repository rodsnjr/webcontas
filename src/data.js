var Sequelize = require('sequelize');
var sequelize = new Sequelize('dbname', 'contasapp', '', {
    host: "localhost",
    port: 5432,
    dialect: 'postgres'
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Category = sequelize.define('category', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true    
    },
    name: Sequelize.STRING,
    icon: Sequelize.STRING,
    color: Sequelize.STRING
});

var beforeHook = function(item){
            if (item.type=='CONTA'){
                item.value = Math.abs(item.value) * -1;
            } else if (item.type=='RECEBIMENTO'){
                item.value = Math.abs(item.value);
            }
        };

var Item = sequelize.define('item', 

{
    name: Sequelize.STRING,
    value: Sequelize.DECIMAL,
    category: Sequelize.INTEGER,
    type: Sequelize.ENUM('CONTA', 'RECEBIMENTO', 'PAGO')
},
{
hooks : {
            beforeCreate : beforeHook,
            beforeUpdate : beforeHook
        }
}
);

var categories = Category.bulkCreate([
    /* Contas */
    { id: 1, name: 'Aluguel', icon: '', color: '' },
    { id: 2, name: 'Condomínio', icon: '', color: '' },
    { id: 3, name: 'Luz', icon: '', color: '' },
    { id: 4, name: 'Telefone', icon: '', color: '' },
    { id: 5, name: 'Cartão', icon: '', color: '' },
    { id: 6, name: 'Outros', icon: '', color: ''},
    /* Recebimentos */
    { id: 7, name: 'Salário', icon: '', color: '' },
    { id: 8, name: 'Venda', icon: '', color: '' }
]);

var user = User.create({
    username: 'rodsnjr',
    password: 'n0gueir@'
});

sequelize.sync().then(function() {
    return [user, categories];
});

module.exports = {Category:Category, Item:Item};