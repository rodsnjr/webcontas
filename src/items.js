var app = require('express').Router();
var data = require('./data');
var sequelize = require('sequelize');
var linq = require('linqjs');
var query = require('./data/query');

var saldo = function (request, response) {
    
    data.Item.sum('value')
    .then(function(saldo){
        response.send({ success : true, data : saldo });
    });

};

app.get('/saldo', saldo);

app.get('/month', function(request, response){
    var today = new Date();
    var currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    data.Item.findAll({
        attributes : ['type','date','value'],
        where : {
            date : {
                between : [currentMonth , nextMonth]
            }
        },
        raw: true,
        order: [['type', 'ASC'], ['date', 'ASC']]
        //group:['type', 'date', 'value']
    }).then(function(values){
        
        var groups = values
            .groupBy(function(t){ return t.type.toLowerCase() });
        
        var total = values.sum(function(t){ return Number(t.value) });
        var contas = groups[0].sum(function(t){ return Number(t.value) });
        var recebimento = groups[1].sum(function(t){ return Number(t.value) });
        
        var datas = values.select(function(t){ return t.date.getDate() });
        
        var responseData = {
            today : today.toLocaleDateString("pt-br"),
            saldo : { total: total, conta: contas, recebimento : recebimento},
            labels : datas,
            contas : groups[0].select(function(t){ return (Number(t.value) * -1) }),
            recebimentos : groups[1].select(function(t){ return Number(t.value) })
        };

        response.send({ success : true, data : responseData });
    });

});

app.use('/', query(data.Item, app));

module.exports = app;