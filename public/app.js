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
        //ChartsJS
        chartsJS:'other/Chart.bundle.min',
        // Componentes
        selectors:'components/selectors',
        menu:'components/menu',
        itemForm:'components/item.form',
        itemTable:'components/item.table',
        templates:'components/templates',
        events : 'components/events',
        charts:'components/charts'
    }
});

// Start the main app logic.
requirejs(['jquery', 'events', 'menu', 'itemForm'],
function   ($, events, menu, itemForm) {

    $(document).ready(function(){
        events.load();
        menu.load();
        itemForm.load();
    });

});