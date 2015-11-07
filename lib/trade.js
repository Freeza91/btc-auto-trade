var Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request")),
    util = require('./util'),
    settings = require('../config/application'),
    redis = require('../lib/redis');

var api_url = 'https://api.huobi.com/apiv3';

function trade(amount, coin_type, trade_type){
  params = util.build_trade_params(amount, coin_type, trade_type);

  return request.postAsync(api_url, { form: params })
    .then(function(response){
      return JSON.parse(response[1])
    })
    .catch(function(error){
      console.log(error.message);
    })
}

var sellMarket = function(amount, coin_type){
  return trade(amount, coin_type, 'sell_market');
}

var buyMarket = function(amount, coin_type){
  return trade(amount, coin_type, 'buy_market');
}

var makeTrade = function(data, price, coin_type){

  if(data.trade_type === 'buy_market' && price >= data.price){
    redis.delete_key(coin_type);
    buyMarket(data.amount, coin_type)
      .then(function(response){
        console.log(response);
        if(response.result !== 'success'){
          redis.store(coin_type, data);
        }
      });
  } else if(data.trade_type === 'sell_market' && price <= data.price){
    redis.delete_key(coin_type);
    sellMarket(data.amount, coin_type)
      .then(function(response){
        console.log(response);
        if(response.result !== 'success'){
          redis.store(coin_type, data);
        }
      });
  }
}

exports.makeTrade = makeTrade;