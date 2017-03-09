var Sequelize = require('sequelize');
var md5 = require('md5');

var sequelize = new Sequelize('dbname', 'contasapp', '', {
    host: "localhost",
    port: 5432,
    dialect: 'postgres'
});

//teste

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

var migration = function () {
    var exit=[]
    Category.count().then(function(value){
        if (value <= 0){
            var categories = Category.bulkCreate([
            /* Contas */
            { name: 'Aluguel', icon: 'home', color: 'red', type: 'CONTA' },
            { name: 'Condomínio', icon: 'building outline', color: 'red', type: 'CONTA' },
            { name: 'Luz', icon: 'lightning', color: 'red', type: 'CONTA' },
            { name: 'Telefone', icon: 'phone', color: 'red', type: 'CONTA' },
            { name: 'Cartão', icon: 'mastercard', color: 'red', type: 'CONTA' },
            { name: 'Outros', icon: 'money', color: 'red', type: 'CONTA' },
            /* Recebimentos */
            { name: 'Salário', icon: 'book', color: 'green', type: 'RECEBIMENTO' },
            { name: 'Venda', icon: 'shop', color: 'green', type: 'RECEBIMENTO' }
            ]);
            
            exit.push(categories);
        }
    });

    Item.count().then(function(value){
        if (value <=0){
            var dummyItems = Item.bulkCreate([
                { name: 'Mãetrocínio', value: 900, category: 'Salario', type: 'RECEBIMENTO' },
                { name: 'Nubank', value: -500, category: 'Cartão', type: 'CONTA' }
            ]);
            exit.push(dummyItems);
        }
    });


    User.count().then(function(value){
        if (value <=0){
            var user = User.create({
                username: 'rodsnjr',
                password: md5('n0gueir@')
            });

            exit.push(user);
        }
    });
}


sequelize.sync().then(function(){
    return migration();
});

module.exports = {Category:Category, Item:Item, User:User};