var TemplateUtils = require('../utils/TemplateUtils');
var QueryService = require('../services/QueryService');
var Item = require('../models/Item');

function TabController(app) {
  var itemQuery = QueryService(Item);
  app.get('/items', function (request, response) {
    itemQuery.all()
      .then(function (_items) {

        response.render('items/table.njk', {
          typeValue: TemplateUtils.typeValue,
          paid: TemplateStringsArray.paid,
          date: TemplateUtils.date,
          items: _items
        });

      });

  });

  app.get('/login/error', function (request, response) {

    response.render('error.njk');

  });

}

module.exports = TabController;