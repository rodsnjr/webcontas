var Templates = (function(){
    
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

    var _saldoTemplate = function(value){
        return new SaldoTemplate(value);
    };

    return { saldoTemplate : _saldoTemplate };
})();