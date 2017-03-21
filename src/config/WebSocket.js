var WebSocket = require('ws');

var wss = undefined;
var connectedWS = undefined;

var myWSS = function(httpServer){
    /*
    if (wss==undefined)
        wss = new WebSocket.Server({ httpServer });
    
    wss.on('connection', function(ws){
        connectedWS=ws;
    });
    */
};

var broadCastSaldo = function(saldo){
    /*
    console.log('broadcasting %s' + saldo);
    myWSS.clients.forEach(function(client){
        if (client !== connectedWS && 
            client.readyState === WebSocket.OPEN){

            client.send(saldo);
        
        }
    });
    */
}

module.exports = { createServer : myWSS, broadcast : broadCastSaldo};