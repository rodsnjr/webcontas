var express = require('express');
var data = require('./data');
var app = express.Router();

var _typeValue = function(value){
    if (value.valueOf()=='CONTA')
      return 'negative';
    else if (value.valueOf()=='RECEBIMENTO')
      return 'positive';
    else
      return 'warning';
}

var _paid = function(item){
  return item.type.valueOf()=='CONTA';
}

app.get('/items', function(request, response){
  
  data.Item.findAll()
    .then(function(_items){

      response.render('items/table.njk', {
        typeValue: _typeValue,
        paid: _paid,
        items : _items
      });
    
  });

});

app.get('/login/error', function(request, response){

  response.render('error.njk');
  
});

module.exports = app;