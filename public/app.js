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

    $('.menu .item').tab();

    $('#item').click(function(){
        $('.form.item').populate({});
        $('.item .submit.button').api(ItemsForm.prototype.formPost);
    });

    /*
    $('.checkbox').checkbox({
      onChecked : FormCheckBox.prototype.form_check,
      onUnchecked : FormCheckBox.prototype.form_uncheck
    });
    */
    $('.checkbox').checkbox();
});