var ItemsForm = (function () {
    var selector = {};
    var onUpdate = undefined;
    /* Form Validation Rules */
    var rules = {
        value: {
            identifier: 'value',
            rules: [{ type: 'empty', prompt: 'Preencher o valor' }]
        },
        itemType: {
            identifier: 'type',
            rules: [{ type: 'checked', prompt: 'Selecionar o tipo' }]
        }
    };

    /* API Objects */
    var update = {
        action: selector.api.resources.item,
        method: 'PUT',
        beforeSend: function (settings) {
            settings.urlData = {
                id: settings.data.id
            };
            return settings;
        },
        serializeForm: true,
        onSuccess: updateSuccess
    };

    var formPost = {
        action: selector.api.resources.items,
        method: 'POST',
        serializeForm: true,
        onSuccess: clear
    };

    /* Common Functions */
    var clear = function () {
        $(selector.form.id).form('clear');
    };

    var createForm = function () {
        $(selector.form.value).maskMoney();
        $(selector.form.checkbox).checkbox();
        $().dropdown(selector.form.dropdown);
        validations();
    };

    /* API Functions */
    var updateSuccess = function (response) {
        if (onUpdate)
            onUpdate(response.data);
    };

    /* API Changing Functions */
    var formUpdate = function () {
        $(selector.form.id).api(update);
    };

    var newItem = function () {
        clear();
        $(selector.form.id).api(formPost);
    };

    var validations = function () {

        $(selector.form.id)
            .form({
                inline: true,
                fields: rules
            });

    };

    var _load = function(args){
        selector = args.selector;
        onUpdate = args.onUpdate;
    };

    return { load : _load };

})();