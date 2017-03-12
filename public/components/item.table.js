define(function (require) {

    var events = undefined;
    var selectors = undefined;

    var itemEdit = undefined;
    var itemDelete = undefined;
    var itemPay = undefined;

    var removeItem = function (id) {
        $("#" + id).html("");
    };

    var refreshItem = function (data) {
        var id = "#" + data.id;
        $(id).children(selectors.item_table.row.name).html(data.name);
        if (data.category)
            $(id).children(selectors.item_table.row.category).html(data.category.name);
        $(id).children(selectors.item_table.row.value).html(data.value);
        $(id).children(selectors.item_table.row.date).html(data.date);
    };

    var refreshTable = function(){
         $(selectors.menu.tabs.items).api('query');
    }

    var tableActions = function () {
        $(selectors.item_table.actions.edit).api(itemEdit);
        $(selectors.item_table.actions.delete).api(itemDelete);
        $(selectors.item_table.actions.pay).api(itemPay);
    };

    var editItem = function (data) {
        events.onEditItem(data);
    };

    function apiObjects(){
        itemEdit = {
            action: selectors.api.resources.item,
            method: 'GET',
            onSuccess: function (response) {
                editItem(response.data);
            }
        };
        
        itemDelete = {
            action: selectors.api.resources.item,
            method: 'DELETE',
            onSuccess: function (response) {
                removeItem(response.data.id);
            }
        };
        
        itemPay = {
            action: selectors.api.resources.item_pay,
            method: 'PUT',
            onSuccess: function (response) {
                refreshItem(response.data);
            }
        };

    }

    var _load = function () {
        require('jquery');
        require('semantic');
        selectors = require('selectors');
        events = require('events');
        apiObjects();
        tableActions();
    };

    return {
        load : _load,
        refresh : refreshTable
    };

});