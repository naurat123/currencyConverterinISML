'use strict';

var server = require('server');
var service = require('naurat_custom_exercises/cartridge/services/currencyConverter.js');

server.get('Start',function(req, res, next){
    res.render('Assignment1');
    next();
});
    

server.get('Show', function (req, res, next) {
    var properties = {};
    //console.log('before service call');
    var svcResult = service.currencyConverterService.call();
    //console.log('after service call');
    if (svcResult.status === 'OK') {
        //console.log(svcResult);
        properties.rates = svcResult.object.rates;
    }
    //console.log('After If');

    res.json({data:properties.rates});
    next();
});


module.exports = server.exports();