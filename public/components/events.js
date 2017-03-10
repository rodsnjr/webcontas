define(function(require){
    
    var menu = undefined;
    var itemForm = undefined;
    var itemTable = undefined;
    var templates = undefined;
    var selectors = require('selectors');

    $(selectors.menu.saldo).api({
        action : selectors.api.resources.saldo,
        onSuccess : function(response){
            templates.saldo(response.data);      
        }
    });

    var load = function (){
        menu = require('menu');
        itemForm = require('itemForm');
        templates = require('templates');
        saldoUpdate();
    };

    var saldoUpdate = function(){
        $(selectors.menu.saldo).api('query');
    };

    var editItem = function(item){
        itemForm.editItem(item);
        menu.changeTab(menu.tabs.item);
    };

    var updateItem = function(item){
        if (itemTable)
            itemTable.refresh();
    };

    var newItem = function(){
        itemForm.newItem();
    };

    var tableLoad = function(){
        itemTable = require('itemTable');
        itemTable.load(this);
    };

    return {
        load : load,
        onTableLoad : tableLoad,
        onEditItem : editItem,
        onUpdateItem : updateItem,
        onNewItem : newItem,
        onUpdateSaldo : saldoUpdate
    };

});