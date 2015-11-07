var Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request")),
    util = require('./util');

var ltc = function() {
  _promise =
    request.getAsync('http://api.huobi.com/staticmarket/ticker_ltc_json.js')
      .then(function(response){
        return JSON.parse(response[1]);
      })
      .catch(function(error){
        console.log(error.message);
      });

  return _promise;
}

var btc = function() {
  _promise =
    request.getAsync('http://api.huobi.com/staticmarket/ticker_btc_json.js')
      .then(function(response){
        return JSON.parse(response[1]);
      })
      .catch(function(error){
        console.log(error.message);
      });

  return _promise;
}

var get_account_info = function(params){

  _promise =
    request.postAsync('https://api.huobi.com/apiv3',
                      { form: util.build_info_params('get_account_info') })
      .then(function(response){
        return JSON.parse(response[1]);
      })
      .catch(function(error){
        console.log(error.message);
      });

  return _promise;
}


exports.ltc = ltc;
exports.btc = btc;
exports.get_account_info = get_account_info;