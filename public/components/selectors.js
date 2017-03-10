define(['jquery', 'semantic'], function(){

    const api = {
        view : {
            items : 'table items'
        },
        resources : {
            item : 'item',
            items : 'items',
            item_pay : 'item pay',
            saldo : 'saldo'
        }
    };
    
    const urls = {
        view : {
            items : '/view/items/'
        },
        resources : {
            item : '/api/items/{id}',
            items : '/api/items',
            item_pay : '/api/items/{id}/pay',
            saldo : '/api/items/saldo'
        }
    };
    
    const item_table = { 
        id: '#items-table',
        row : { name : '.item.name', category : '.item.category', value : '.item.value', date: '.item.date'},
        actions: { edit:'.actions .edit', delete:'.actions .delete', pay:'.actions .pay'}
    };

    const menu = {
        id : '',
        buttons : '.menu .item',
        tabs : {
            item : '.menu #item',
            items : '.menu #items',
            geral : '.menu #geral'
        }
    }

    const item_form = {
        id: '.form.item',
        checkbox : this.id + ' .checkbox',
        value : this.id + ' #value',
        dropdown : this.id + ' .categories'
    };

    $.fn.api.settings.api = {
        'table items' : urls.view.items,
        'item' : urls.resources.item,
        'items' : urls.resources.items,
        'item pay' : urls.resources.item_pay,
        'saldo' : urls.resources.saldo
    };

    return { 
        api : api,
        item_table : item_table,
        menu : menu,
        item_form : item_form
     };

});

