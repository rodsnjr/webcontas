$.fn.api.settings.api = {
    'table items' : '/view/items/',
    'item' : '/api/items/{id}',
    'item pay' : '/api/items/{id}/pay',
    'saldo' : '/api/items/saldo'
};

function SaldoTemplate(value){
    this.value = value;
    this.render = function(){
        var templateIcon = '<i class="dollar ' + this.color() + ' icon"></i>';
        return templateIcon + value;
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
    $('.form.item').populate(response.data);
    // Muda o estado do menu
    $('.menu .item').attr('class', 'item');
    $('.menu #item').attr('class', 'active item');
    // Desabilita o checkbox de pago
    $('.checkbox #pago').attr('disabled', 'disabled');
    // Muda a tab
    $.tab('change tab', 'item');
    //Atualiza a call/API do formulário pra update
    $('.item .submit.button')
        .api(ItemsForm.prototype.formUpdate(response.data.id));
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

ItemsForm.prototype.formUpdate = function (_id) {
    var update = {
        url: '/api/items/{id}',
        method: 'PUT',
        urlData: { id: _id },
        serializeForm: true,
        onSuccess: function (response) {
            $('.menu .item').attr('class', 'item');
            $('.menu #items').attr('class', 'active item');
            ItemsTable.prototype.refreshItem(response);
            $.tab('change tab', 'items');
        }
    }
    return update;
};
ItemsForm.prototype.clear = function(response){
    $('.form.item').populate({});
    $('.checkbox #pago').removeAttr('disabled');
};
ItemsForm.prototype.formPost = {
    url: '/api/items/',
    method: 'POST',
    serializeForm: true,
    onSuccess : ItemsForm.prototype.clear
};