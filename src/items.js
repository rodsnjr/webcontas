var app = require('express').Router();
var data = require('./data');
var sequelize = require('sequelize');
var linq = require('linqjs');


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

app.post('/', function(request, response){
    var item = request.body;
    if (item.date == '') item.date = Date.now()
    data.Item.build(item)
        .save()
        .then(function(item){
            response.send({ success : true, data : item });
        }).catch(function(error){
            response.send({ success : false, data : error });
        });
});

app.get('/:id', function(request, response){

    data.Item.findById(request.params.id)
    .then(function(item){
        var success = { success : true, data : item};
        response.send(success);
    }).catch(function(error){
        response.send({success : false, data : error});
    }); 

});

app.delete('/:id', function(request, response){
    data.Item.findById(request.params.id).then(function(one){
        one.destroy().then(function(destroyed){
            var success = { success : true, data : destroyed};
            response.send(success);
        });
    });
});
/*
app.put('/:id/pay', function(request, response){
    data.Item.findById(request.params.id).then(function(one){
        one.update({type:'PAGO'}).then(function(done){
            response.send({success:true, data:done});
        });
    });
    
});
*/
app.put('/:id', function(request, response){
    var item = request.body;
    if (item.date == '') item.date = Date.now()
    data.Item.findById(request.params.id)
        .then(function(one){
            one.update(item)
                .then(function(updated){
                    var success = { success : true, data : updated };
                    response.send(success);
        });
    });
});

module.exports = app;