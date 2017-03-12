define(function (require) {

        const tabs = {
            items: 'items',
            item: 'item',
            geral: 'geral'
        }
        var selectors=undefined;
        var tableTab = undefined;
        var events = undefined;
        var chartData=undefined;

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

            chartData = {
                action: selectors.api.resources.month,
                method: 'GET',
                cache: false,
                onComplete: loadChart
            };

            $(selectors.menu.tabs.items).api(tableTab);
            $(selectors.menu.tabs.geral).api(chartData);
            $(selectors.menu.buttons).tab();

            $(selectors.menu.tabs.item).click(function(){
                events.onNewItem();
            });

            $(selectors.menu.tabs.geral).api('query');
        }

        var loadTableTab = function (response) {
            tabDraw(tabs.items, response);
            events.onTableLoad();
        }

        var loadChart = function(response){
            events.onLoadChart(response.data);
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