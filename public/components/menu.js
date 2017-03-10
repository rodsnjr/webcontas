var Menu = (function(){
    var selector = {};
    var onItemEnter = undefined;
    var _load = function(){
        $(selector.menu.buttons).tab();
        
        $(selector.menu.item).click(function(){
            onItemEnter(selector.menu.item);
        });
    }

    var changeTab = function(tab){
        $.tab('change tab', tab);
        activeItem(tab);
    };

    var activeItem = function(item){
        $('.menu .item').attr('class', 'item');
        $('.menu ' + item).attr('class', 'active item');
    };

})();