var Selector = (function(){
    
    const api = {
        view : {
            items : '/view/items/'
        },
        resources : {
            item : '/api/items/{id}',
            items : '/api/items',
            item_pay : '/api/items/{id}/pay',
            saldo : '/api/items/saldo'
        }
    }
    
    const item_table = { 
        id: '#item-table',
        row : { name : '.item.name', category : '.item.category', value : '.item.value', date: '.item.date'},
        actions: { edit:'.actions .edit', delete:'.actions .delete', pay:'.actions .pay'}
    };

    const menu = {
        id : '',
        buttons : '.menu .item',
        item : '.menu #item',
        items : '.menu #items'
    }

    const form = {
        id: '.form.item',
        checkbox : id + ' .checkbox',
        value : id + ' #value',
        dropdown : id + ' .categories'
    };

    var _load = function(){
        $.fn.api.settings.api = {
            'table items' : api.view.items,
            'item' : api.resources.item,
            'items' : api.resources.items,
            'item pay' : api.resources.item_pay,
            'saldo' : api.resources.saldo
        };
    };

    return { load : _load };
})();

