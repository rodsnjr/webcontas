$(document).ready(function(){

    $('.form.login').api({
        url : '/login',
        method : 'POST',
        onSuccess : function(data){
            $('.content').html(data);
        },
        onFailure : function(data){
            console.log(data);
        }
    });
    
});