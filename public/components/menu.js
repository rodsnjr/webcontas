define(['selectors', 'jquery', 'semantic', 'itemTable'], 
    function(selectors, itemTable){
    
    var onTabDraw = undefined;

    var tabs = {
        items : 'items',
        item : 'item',
        geral : 'geral'
    }

    var tableTab = {
        action: selectors.api.view.items,
        method: 'GET',
        cache: false,
        onComplete: function (response) {
            tabDraw(tabs.items, response);
        }
    };

    var _load = function(args){
        $(selectors.menu.tabs.items).api(tableTab);
        if (args.onTabDraw){
            onTabDraw = args.onTabDraw;
        }
        if (args.tabEnter){
            $(selectors.menu.buttons).tab({
                onLoad : function(tabPath, parameterArray, historyEvent){
                    args.tabEnter(tabPath);
                }
            });
        }else{
             $(selectors.menu.buttons).tab();
        }
    }

    var tabDraw = function(tab, html){

        if (tab==tabs.items){
            $(selectors.item_table.id).html(html);
        }
        
        if (onTabDraw)
            onTabDraw(tab);
    }

    var _changeTab = function(tab){
        if (tab==tab.items){
            $(selectors.menu.tabs.items).api('query');
        }
        $.tab('change tab', tab);
        activeItem(tab);
    };

    var activeItem = function(item){
        $('.menu .item').attr('class', 'item');
        $(item).attr('class', 'active item');
    };

    return {
        load : _load,
        changeTab : _changeTab,
        tabs : tabs
    };

});