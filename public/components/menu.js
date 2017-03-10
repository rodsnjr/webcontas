define(function (require) {

        const tabs = {
            items: 'items',
            item: 'item',
            geral: 'geral'
        }
        var selectors=undefined;
        var tableTab = undefined;
        var events = undefined;

        function _import(){
            require('jquery');
            require('semantic');
            events = require('events');
            selectors=require('selectors');
        };

        var _load = function () {
            _import();
            
            tableTab = {
                action: selectors.api.view.items,
                method: 'GET',
                cache: false,
                onComplete: loadTableTab
            };

            $(selectors.menu.tabs.items).api(tableTab);
            $(selectors.menu.buttons).tab();
        }

        var loadTableTab = function (response) {
            tabDraw(tabs.items, response);
            events.onTableLoad();
        }

        var tabDraw = function (tab, html) {
            if (tab == tabs.items) {
                $(selectors.item_table.id).html(html);
            }
        }

        var _changeTab = function (tab) {
            $.tab('change tab', tab);
            activeItem(selectors.menu.tabs[tab]);
        };

        var activeItem = function (item) {
            $('.menu .item').attr('class', 'item');
            $(item).attr('class', 'active item');
        };

        return {
            load: _load,
            changeTab: _changeTab,
            tabs: tabs
        };

    });