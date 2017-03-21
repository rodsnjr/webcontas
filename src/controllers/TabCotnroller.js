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

var _date = function(date){
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [(dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
          date.getFullYear()
         ].join('/');
}

app.get('/items', function(request, response){
  console.log('table items');
  data.Item.findAll()
    .then(function(_items){

      response.render('items/table.njk', {
        typeValue: _typeValue,
        paid: _paid,
        date:_date,
        items : _items
      });
    
  });

});

app.get('/login/error', function(request, response){

  response.render('error.njk');
  
});

module.exports = app;