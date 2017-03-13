function Query(model){
    this.model = model;

    this.all = function(){
        return this.model.findAll();
    };

    this.one = function(id){
        return this.model.findById(id);
    };

    this.save = function(value){
        return this.model.build(value).save();
    };

    this.update = function(value){
        this.one(value.id)
            .then(function(data){
                return data.update(value);
        });
    };

    this.delete = function(value){
        this.one.then(function(data){
            return data.destroy();
        });
    };
};

var restfulRoutes = function(model, router){
    var query = new Query(model);
    
    router.get('/', function(request, response){
        query.all().then(function(data){
            return response.send({success:true, data:data});
        });
    });
    router.post('/', function(request, response){
        query.save(request.body).then(function(data){
            return response.send({success:true, data:data});
        });
    });
    router.get('/:id', function(request, response){
        query.one(request.params.id).then(function(data){
            return response.send({success:true, data:data});
        });
    });
    router.put('/:id', function(request, response){
        query.update(request.body).then(function(data){
            return response.send({success:true, data:data});
        });
    });
    router.delete('/:id', function(request, response){
        query.delete(request.params.id).then(function(data){
            return response.send({success:true, data:data});
        });
    });
};

module.exports = restfulRoutes;