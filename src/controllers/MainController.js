function MainController(app){
    app.get('/', function(request, response) {
    data.Category.findAll().then(function(all){
            response.render('index.njk', { categories : all });
        });
    });

    return app;
}

module.exports = MainController;