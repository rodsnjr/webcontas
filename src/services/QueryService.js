function QueryService(model) {
    if (!model) {
        throw new Error('Model for query building needed');
    }

    return {
        all : function () {
            return model.findAll();
        },

        one : function (id) {
            return model.findById(id);
        },

        save : function (value) {
            return model.build(value).save();
        },

        update : function (value) {
            one(value.id)
                .then(function (data) {
                    return data.update(value);
                });
        },

        delete : function (value) {
            one.then(function (data) {
                return data.destroy();
            });
        },
    }
};

module.exports = QueryService;