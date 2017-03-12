var Sequelize = require('sequelize');
var md5 = require('md5');
/* 
Produção
*/
var sequelize = new Sequelize(
    'd34j8iut6s3rm9', 
    'vaxlypenzpwnst', 
    '8ca31a7e4d59cd538a6a8c39902eeb99494851be3f2522258391ca15fa249aa7', 
{
    host: "ec2-54-225-66-44.compute-1.amazonaws.com",
    port: 5432,
    dialect: 'postgres'
});
/* Develop 
var sequelize = new Sequelize('dbname', 'contasapp', '', {
    host: "localhost",
    port: 5432,
    dialect: 'postgres'
});
*/

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