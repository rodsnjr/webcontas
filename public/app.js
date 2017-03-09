$(document).ready(function(){
    
    $('.menu #items').api(ItemsTable.prototype.findAll);

    $('#saldo').api({
        action : 'saldo',
        on : 'now',
        onSuccess : function(response){
            $('#saldo').html(new SaldoTemplate(response.data).render());
        }
    });

    $('.menu .item').tab();

    $('#item').click(function(){
        ItemsForm.prototype.newItem();
    });

    ItemsForm.prototype.createForm();
});