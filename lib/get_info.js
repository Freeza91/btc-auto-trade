var Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request"));

var ltc = function() {
  _promise =
    request.getAsync('http://api.huobi.com/staticmarket/ticker_ltc_json.js')
      .then( function(response){
        return JSON.parse(response[1]);
      });

  return _promise;
}

var btc = function() {
  _promise =
    request.getAsync('http://api.huobi.com/staticmarket/ticker_btc_json.js')
      .then( function(response){
        return JSON.parse(response[1]);
      });

  return _promise;
}


exports.ltc = ltc;
exports.btc = btc;