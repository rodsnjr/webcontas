define(function(require, exports, module){
    var selectors = require('selectors');
    require('jquery');
           
    var saldoTemplate = function(value){
            var color = (this.value > 0 ? 'green' : 'red');
            var templateIcon = '<i class="dollar ' + color + ' icon"></i>';
            if (!value)
                value=0;
            var html = templateIcon + value;
            $(selectors.menu.saldo).html(html);
    };
    
    return { saldo : saldoTemplate };
});