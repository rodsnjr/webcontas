requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/',
    paths: {
        // JQuery Base
        jquery: 'jquery/jquery.min',
        jquery_serialize:'jquery/jquery.serialize-object.min',
        jquery_maskMoney:'jquery/jquery.maskMoney.min',
        // Semantic-UI Base
        semantic:'semantic/semantic.min',
        // Componentes
        selectors:'components/selectors',
        menu:'components/menu',
        itemForm:'components/item.form',
        itemTable:'components/item.table',
        login:'components/login',
        templates:'components/templates'
    }
});

// Start the main app logic.
requirejs(['jquery', 'menu', 'itemForm'],
function   ($, menu, itemForm) {

    var onEditItem = function(item){
        itemForm.editItem(item);
        menu.changeTab(menu.tabs.item);
    }

    var tabEnter = function(tab){
        if (tab==menu.tabs.item){
            console.log('New Item!');
            itemForm.newItem();
        }
    }
    var tabDraw = function(tab){
        if (tab==menu.tabs.items){
            console.log('Create Item Table');
            itemTable = require('itemTable');
            itemTable.load();
            itemTable.onEdit = onEditItem;
        }
    }

    $(document).ready(function(){
        menu.load({
            onTabEnter : tabEnter,
            onTabDraw : tabDraw
        });
        itemForm.load();
    });

});