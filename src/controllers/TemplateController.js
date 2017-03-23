function TemplateController() {
  var TemplateUtils = require('../utils/TemplateUtils');
  var QueryService = require('../services/QueryService');
  var Item = require('../models/Item');

  var app = require('express').Router();

  var itemQuery = QueryService(Item);
  app.get('/items', function (request, response) {
    itemQuery.all()
      .then(function (_items) {

        response.render('items/table.njk', {
          typeValue: TemplateUtils.typeValue,
          paid: TemplateUtils.paid,
          date: TemplateUtils.date,
          items: _items
        });

      });

  });

  app.get('/login/error', function (request, response) {

    response.render('error.njk');

  });

  return app;
}

module.exports = TemplateController();