$(document).ready(function(){
    
    $('.menu #items').api(ItemsTable.prototype.findAll);

    $('#saldo').api({
        action : 'saldo',
        on : 'now',
        onSuccess : function(response){
            console.log(response.data);
            $('#saldo').html(new SaldoTemplate(response.data).render());
        }
    });

    $('.selection.dropdown.categories').dropdown();

    $('.menu .item').tab();

    $('#item').click(function(){
        ItemsForm.prototype.clear();
        $('.item .submit.button').api(ItemsForm.prototype.formPost);
    });

    $('.checkbox').checkbox();
});