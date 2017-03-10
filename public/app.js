requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        // JQuery Base
        jquery: 'jquery/jquery.min.js',
        jquery_serialize:'jquery/jquery.serialize-object.min.js',
        jquery_maskMoney:'jquery/jquery.maskMoney.min.js',
        // Semantic-UI Base
        semantic:'semantic/semantic.min.js',
        // Componentes
        globals:'components/globals.js',
        item_form:'components/item.form.js',
        item_table:'components/item.table.js',
        login:'components/login.js',
        templates:'components/templates.js'
    }
});

// Start the main app logic.
requirejs(['jquery'],
function   ($) {
    
    $(document).ready(function(){
        

        $('#saldo').api({
            action : 'saldo',
            on : 'now',
            onSuccess : function(response){
                $('#saldo').html(new SaldoTemplate(response.data).render());
            }
        });

        ItemsForm.prototype.createForm();
    });
});