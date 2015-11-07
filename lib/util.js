var crypto = require('crypto'),
    settings = require('../config/application');

function md5(string){
  return crypto.createHash('md5').update(string).digest('hex');
}

function deal_type(coin_type){
  if(coin_type === 'ltc'){
    return 2;
  } else if(coin_type == 'btc'){
    return 1;
  }
  return 0;
}

var trade_signature = function(params, secret_key){

  string = 'access_key=' + params.access_key + '&' +
           'amount=' + params.amount + '&' +
           'coin_type=' + params.coin_type + '&' +
           'created=' + params.created + '&' +
           'method=' + params.method + '&' +
           'secret_key=' + secret_key

  return md5(string);
}

var info_signature = function(params, secret_key){

  string = 'access_key=' + params.access_key + '&' +
           'created=' + params.created + '&' +
           'method=' + params.method + '&' +
           'secret_key=' + secret_key

  return md5(string);
}

var build_trade_params = function(amount, coin_type, method){

  var timestamp = Math.round(new Date().getTime() / 1000);
  params = {
    "access_key": settings.access_key,
    "created": timestamp,
    "coin_type":deal_type(coin_type),
    "amount":amount,
    "method":method
  }
  params.sign = trade_signature(params, settings.secret_key);
  params.trade_password = settings.trade_password;

  return params;
}

var build_info_params = function(method){

  var timestamp = Math.round(new Date().getTime() / 1000);
  params = {
    "access_key": settings.access_key,
    "created": timestamp,
    "method": method
  }
  params.sign = info_signature(params, settings.secret_key);

  return params;
}

exports.build_trade_params = build_trade_params;
exports.build_info_params = build_info_params;