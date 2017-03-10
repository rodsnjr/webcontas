define(['selectors', 'jquery', 'semantic'], 
    function(selectors){
    
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
        action: selectors.api.resources.item,
        method: 'PUT',
        beforeSend: function (settings) {
            settings.urlData = {
                id: settings.data.id
            };
            return settings;
        },
        serializeitem_form: true,
        onSuccess: updateSuccess
    };

    var item_formPost = {
        action: selectors.api.resources.items,
        method: 'POST',
        serializeitem_form: true,
        onSuccess: clear
    };

    /* Common Functions */
    var clear = function () {
        $(selectors.item_form.id).form('clear');
    };

    var createitem_form = function () {
        $(selectors.item_form.value).maskMoney();
        $(selectors.item_form.checkbox).checkbox();
        $().dropdown(selectors.item_form.dropdown);
        validations();
    };

    var _setValues = function(values){
        $(selectors.item_form.id).form('set values', values);
    }

    /* API Functions */
    var updateSuccess = function (response) {
        console.log('update Sucess!');
        clear();
        if (onUpdate)
            onUpdate(response.data);
    };

    /* API Changing Functions */
    var newItem = function () {
        clear();
        $(selectors.item_form.id).api(item_formPost);
    };

    var editItem = function(item){
        clear();
        $(selectors.item_form.id).api(update);
        _setValues(item);
    }

    var validations = function () {

        $(selectors.item_form.id)
            .item_form({
                inline: true,
                fields: rules
            });

    };

    var _load = function(args){
        try {
            onUpdate = args.onUpdate;
        } catch(e){
            console.log(e);
        }        
    };

    return { 
        load : _load,
        editItem : editItem,
        newItem : newItem
    };

});