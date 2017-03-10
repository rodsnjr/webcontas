define(function (require) {

        /* Form Validation Rules */
        var rules = undefined;

        /* API Objects */
        var update = undefined;
        var item_formPost = undefined;

        var events = undefined;
        var selectors = undefined;

        function loadRules() {
            rules = {
                value: {
                    identifier: 'value',
                    rules: [{ type: 'empty', prompt: 'Preencher o valor' }]
                },
                itemType: {
                    identifier: 'type',
                    rules: [{ type: 'checked', prompt: 'Selecionar o tipo' }]
                }
            };
        }

        function loadApis() {
            item_formPost = {
                action: selectors.api.resources.items,
                method: 'POST',
                serializeForm: true,
                onSuccess: clear
            };
            update = {
                action: selectors.api.resources.item,
                method: 'PUT',
                urlData: { id : -1},
                beforeSend: function (settings) {
                    settings.urlData = {
                        id: settings.data.id
                    };
                    return settings;
                },
                serializeForm: true,
                onSuccess: updateSuccess
            };
        };

        function _require(){
            // Base modules
            require('jquery');
            require('jquery_serialize');
            require('jquery_maskMoney');
            require('semantic');

            // Custom Components
            selectors = require('selectors');
            events = require('events');
        }
        
        var _load = function () {
            _require();
            loadRules();
            loadApis();
            createItemForm();
        };
        
        /* Common Functions */
        var clear = function () {
            $(selectors.item_form.id).form('clear');
        };

        var createItemForm = function () {
            $(selectors.item_form.value).maskMoney();
            $(selectors.item_form.checkbox).checkbox();
            $(selectors.item_form.dropdown).dropdown();
            validations();
        };

        var _setValues = function (values) {
            $(selectors.item_form.id).form('set values', values);
        }

        /* API Functions */
        var updateSuccess = function (response) {
            events.onUpdateItem(response.data);
        };

        /* API Changing Functions */
        var newItem = function () {
            clear();
            $(selectors.item_form.id).api(item_formPost);
        };

        var editItem = function (item) {
            clear();
            $(selectors.item_form.id).api(update);
            _setValues(item);
        }

        var validations = function () {

            $(selectors.item_form.id)
                .form({
                    inline: true,
                    fields: rules
                });

        };

        return {
            load: _load,
            editItem: editItem,
            newItem: newItem
        };

    });