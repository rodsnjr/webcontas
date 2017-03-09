var app = require('express').Router();
var data = require('./data');
var sequelize = require('sequelize');
//var ws = require('./websocket');

var saldo = function (request, response, next) {
    
    data.Item.sum('value')
    .then(function(saldo){
        response.send({ success : true, data : saldo });
    });

    //next();
};

app.get('/saldo', saldo);

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