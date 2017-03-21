var Item = require('../models/Item');
var RestfulController = require('./RestfulController');
var ItemService = require('../services/ItemService');

function ItemController(app){
	if(!app){
		throw new Error('Express App Router Required');
	};

    var SemanticResponse = function(response, data){
        return response.send({
            success:true,
            data:data
        });
    }

    RestfulController.create(Item, app);

    app.get('/balance', function(request, response){
        ItemService.balance(function(balance){
            return SemanticResponse(response, balance);
        });
    });

    app.get('/month', function(request, response){
        ItemService.month(function(value){
            return SemanticResponse(response, value);
        });
    });
};