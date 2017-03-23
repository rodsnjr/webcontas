var QueryService = require('../services/QueryService');

function RestfulController(router) {

    if (!router) {
        throw new Error('Express Router is Required');
    }

    var queryService = undefined;
    var responseItem = function (response, data) {
        return response.send(data);
    };

    var buildRoutes = function(){
        router.get('/', function (request, response) {
            queryService.all().then(function (data) {
                return responseItem(response, data);
            });
        });

        router.get('/page/:page', function(request, response){
            var limit = request.params.limit || 10;
            queryService.page(request.params.page).then(function(data){
                return responseItem(response, data);
            });
        });

        router.post('/', function (request, response) {
            queryService.save(request.body).then(function (data) {
                return responseItem(response, data);
            });
        });

        router.get('/:id', function (request, response) {
            queryService.one(request.params.id).then(function (data) {
                return responseItem(response, data);
            });
        });

        router.put('/:id', function (request, response) {
            queryService.update(request.body).then(function (data) {
                return responseItem(response, data);
            });
        });

        router.delete('/:id', function (request, response) {
            queryService.delete(request.params.id).then(function (data) {
                return responseItem(response, data);
            });
        });

        return router;
    }

    var query = function (model) {
        queryService = QueryService(model);
        return self;
    };

    var response = function (responseItem) {
        // Verificar se é uma função de dois argumentos, senão throw new Error ...
        responseItem = responseItem;
        return self;
    };

    var create = function () {
        if (!queryService) {
            throw new Error('A query Service must be defined');
        }
        if (!responseItem) {
            console.log('Response item undefined, using default');
        }
        return buildRoutes();
    };

    var self =  {
            model : query,
            response : response,
            create : create
        };

    return self;
};

module.exports = RestfulController;