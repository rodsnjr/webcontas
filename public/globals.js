$.fn.api.settings.api = {
    'table items' : '/view/items/',
    'item' : '/api/items/{id}',
    'items' : '/api/items',
    'item pay' : '/api/items/{id}/pay',
    'saldo' : '/api/items/saldo'
};

function SaldoTemplate(value){
    this.value = value;
    this.render = function(){
        var templateIcon = '<i class="dollar ' + this.color() + ' icon"></i>';
        if (!this.value)
            this.value=0;
        return templateIcon + this.value;
    }
    this.color = function(){
        return (this.value > 0 ? 'green' : 'red');
    }
};

function ItemsTable() { }

ItemsTable.prototype.refreshItem = function (response) {

    var id = "#" + response.data.id;
    $(id).children('.item.name').html(response.data.name);

    if (response.data.category)
        $(id).children('.item.category').html(response.data.category.name);

    $(id).children('.item.value').html(response.data.value);

};

ItemsTable.prototype.payItem = function(response){
    var id = "#" + response.data.id;
    $(id).children('.value').removeClass('positive');
    $(id).children('.value').addClass('warning');
}

ItemsTable.prototype.tableActions = function(){
    $('.actions .edit').api(ItemsTable.prototype.itemEdit);
    $('.actions .delete').api(ItemsTable.prototype.itemDelete);
    $('.actions .pay').api(ItemsTable.prototype.itemPay);
};

ItemsTable.prototype.itemEditRefresh = function (response) {
    // Popula o formulário
    $('.form.item').form('set values', response.data);
    // Muda o estado do menu
    $('.menu .item').attr('class', 'item');
    $('.menu #item').attr('class', 'active item');
    // Desabilita o checkbox de pago
    $('.checkbox #pago').attr('disabled', 'disabled');
    // Muda a tab
    $.tab('change tab', 'item');
    //Atualiza a call/API do formulário pra update
    ItemsForm.prototype.formUpdate();
};

ItemsTable.prototype.findAll = {
    action : 'table items',
    method : 'GET',
    cache : false,
    onComplete : function(response){
        console.log('findAll');
        $('#items-table').html(response);
        ItemsTable.prototype.tableActions();
    }
}

ItemsTable.prototype.itemEdit = {
    action: 'item',
    method: 'GET',
    onSuccess: ItemsTable.prototype.itemEditRefresh
};
ItemsTable.prototype.itemDelete = {
    action: 'item',
    method: 'DELETE',
    onSuccess: ItemsTable.prototype.refreshItem
};
ItemsTable.prototype.itemPay = {
    action: "item pay",
    method: 'PUT',
    onSuccess: ItemsTable.prototype.payItem
};

function ItemsForm() { }
/* Common Functions */
ItemsForm.prototype.clear = function(response){
    $('.form.item').form('clear');
    $('.checkbox #pago').removeAttr('disabled');
};

ItemsForm.prototype.createForm = function(){
    $('#value').maskMoney();    
    $('.checkbox').checkbox();
    $('.selection.dropdown.categories').dropdown();
    ItemsForm.prototype.validations();
};

/* API Functions */
ItemsForm.prototype.updateSuccess = function (response) {
    $('.menu .item').attr('class', 'item');
    $('.menu #items').attr('class', 'active item');
    ItemsTable.prototype.refreshItem(response);
    $.tab('change tab', 'items');
}

/* API Objects */
ItemsForm.prototype.update = {
        action: 'item',
        method: 'PUT',
        beforeSend: function(settings){
            settings.urlData = {
                id: settings.data.id
            };
            return settings;
        },
        serializeForm: true,
        onSuccess: ItemsForm.prototype.updateSuccess
};
ItemsForm.prototype.formPost = {
    action: 'items',
    method: 'POST',
    serializeForm: true,
    onSuccess : ItemsForm.prototype.clear
};

/* API Changing Functions */
ItemsForm.prototype.formUpdate = function () {
    $('.form.item').api(ItemsForm.prototype.update);
};

ItemsForm.prototype.newItem = function(){
    ItemsForm.prototype.clear();
    $('.form.item').api(ItemsForm.prototype.formPost);
};

/* Validations and Rules */
ItemsForm.prototype.validations = function(){

var rules = {
      value : {
        identifier : 'value',
        rules : [{type: 'empty', prompt:'Preencher o valor'}]
      },
      itemType : {
        identifier : 'type',
        rules : [{type: 'checked', prompt:'Selecionar o tipo'}] 
      } 
}

$('.form.item')
  .form({
    inline : true,
    fields : rules
  });

}