function ItemController(){

    var Item = require('../models/Item');
    var RestfulController = require('./RestfulController');
    var ItemService = require('../services/ItemService');

    var app = require('express').Router();

    var SemanticResponse = function(response, data){
        return response.send({
            success:true,
            data:data
        });
    }

    RestfulController(app)
        .model(Item)
        .response(SemanticResponse)
        .create();

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
    
    return app;
};

module.exports = ItemController();