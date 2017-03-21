var Category = require('../models/Category');
var User = require('../models/User');
var Item = require('../models/Item');
var md5 = require('md5');

var Migration = function(Model, Migration){
    Model.count().then(function(value){
        if (value <= 0){
            return Migration();
        }
    });
}

var CategoryMigration = function() {
    var categories = [
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
    ];
    return Category.bulkCreate(categories);
};

var ItemMigration = function(){
    var items = [
        { name: 'Mãetrocínio', value: 900, category: 'Salario', type: 'RECEBIMENTO' },
        { name: 'Nubank', value: -500, category: 'Cartão', type: 'CONTA' }
    ];

    return Item.bulkCreate(items);
};

var UserMigration = function(){
    var mainUser = {
        username: 'rodsnjr',
        password: md5('n0gueir@')
    };
    return User.create(mainUser);
};

var Migrations = function(){
    var migrations = [
        Migration(Category, CategoryMigration),
        Migration(Item, ItemMigration),
        Migration(User, UserMigration)
    ];

    return migrations;
};

module.exports = Migrations;