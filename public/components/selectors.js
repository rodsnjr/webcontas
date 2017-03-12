define(function(require){

    const api = {
        view : {
            items : 'table items'
        },
        resources : {
            item : 'item',
            items : 'items',
            item_pay : 'item pay',
            saldo : 'saldo',
            month : 'month'
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
            saldo : '/api/items/saldo',
            month : '/api/items/month'
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
        },
        saldo:'#saldo'
    }

    const item_form = {
        id: '.form.item',
        checkbox : '.form.item .checkbox',
        value : '.form.item #value',
        dropdown : '.form.item .categories'
    };
    
    var load = function(){
        require('jquery');
        require('semantic');

        $.fn.api.settings.api = {
            'table items' : '/view/items/',
            'item' : '/api/items/{id}',
            'items' : '/api/items',
            'item pay' : '/api/items/{id}/pay',
            'saldo' : '/api/items/saldo',
            'month' : '/api/items/month'
        };

    }

    return { 
        load : load,
        api : api,
        item_table : item_table,
        menu : menu,
        item_form : item_form
     };

});

