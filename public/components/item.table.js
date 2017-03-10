var ItemsTable = (function(){
    // Default Selector
    // Adicionar o Seletor pelo RequireJS nesse módulo
    // Ou adicionar no Load, tem que ver ...
    var selector = {};
    var onEdit=undefined;

    var findAll = {
        action : selector.api.view.items,
        method : 'GET',
        cache : false,
        onComplete : function(response){
            $(selector.item_table.id).html(response);
            tableActions();
        }
    };

    var itemEdit = {
        action: selector.api.resources.item,
        method: 'GET',
        onSuccess: function(response){ 
            editItem(response.data);
        }
    };

    var itemDelete = {
        action: selector.api.resources.item,
        method: 'DELETE',
        onSuccess: function(response){
            removeItem(response.data.id);
        }
    };

    var itemPay = {
        action: selector.api.resources.item_pay,
        method: 'PUT',
        onSuccess: function(response){
            refreshItem(response.data);
        }
    };

    var removeItem = function(id){
        $("#"+id).html("");
    };

    var refreshItem = function (data) {
        var id = "#" + data.id;
        $(id).children(selector.item_table.row.name).html(data.name);
        if (data.category)
            $(id).children(selector.item_table.row.category).html(data.category.name);
        $(id).children(selector.item_table.row.value).html(data.value);
        $(id).children(selector.item_table.row.date).html(data.date);
    };

    var tableActions = function(){
        $(selector.item_table.action.edit).api(ItemsTable.prototype.itemEdit);
        $(selector.item_table.action.delete).api(ItemsTable.prototype.itemDelete);
        $(selector.item_table.action.pay).api(ItemsTable.prototype.itemPay);
    };

    var editItem = function(data){
        // Muda o estado do menu
        $(selector.menu.buttons).attr('class', 'item');
        $(selector.menu.item).attr('class', 'active item');
        
        if (onEdit)
            onEdit(data);
    };

    var load = function(args){
        selector = args.selector;
        onEdit= args.onEdit;

        $(selector.menu.items).api(findAll);
    };

    return {
        load : load
    };

})();