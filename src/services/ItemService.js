var linq = require('linqjs');
var Item = require('../models/Item');

var ItemService = function(){

    var findMonthQuery = function(currentMonth){
        var nextMonth = new Date(currentMonth.getFullYear(), 
            currentMonth.getMonth() + 1, 1);
        
        var queryObject = {
            attributes : ['type','date','value'],
            where : {
                date : {
                    between : [currentMonth , nextMonth]
                }
            },
            raw: true,
            order: [['type', 'ASC'], ['date', 'ASC']]
        };

        return queryObject;
    };

    var balance = function(success){
        Item.sum('value').then(function(actualBalance){
            success(actualBalance);
        }).catch(function(error){
            return error;
        });
    };

    var month = function(success){
        var today = new Date();
        var currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        Item.findAll(findMonthQuery(currentMonth)).then(function(values){
            var groups = values
            .groupBy(function(t){ return t.type.toLowerCase() });
            
            var total = values.sum(function(t){ return Number(t.value) });
            var contas = groups[0].sum(function(t){ return Number(t.value) });
            var recebimento = groups[1].sum(function(t){ return Number(t.value) });
        
            var datas = values.select(function(t){ return t.date.getDate() });

            var exit = {
                today : today.toLocaleDateString("pt-br"),
                saldo : { total: total, conta: contas, recebimento : recebimento},
                labels : datas,
                contas : groups[0].select(function(t){ return (Number(t.value) * -1) }),
                recebimentos : groups[1].select(function(t){ return Number(t.value) })
            };
            success(exit);
        }).catch(function(error){
            return error;
        });
    }

    return {
        balance : balance,
        month : month
    };

};

module.exports = ItemService();