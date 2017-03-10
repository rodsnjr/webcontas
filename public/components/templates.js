var Templates = (function(){

    var saldoTemplate = new SaldoTemplate();
    
    function SaldoTemplate(){        
        $('#saldo').api({
            action : 'saldo',
            on : 'now',
            onSuccess : function(response){
                $('#saldo').html(this.render(response.data));
            }
        });
        
        this.render = function(value){
            var templateIcon = '<i class="dollar ' + this.color() + ' icon"></i>';
            if (!value)
                value=0;
            return templateIcon + value;
        }
        this.color = function(){
            return (this.value > 0 ? 'green' : 'red');
        }
    };

    return { saldo : _saldoTemplate };
})();