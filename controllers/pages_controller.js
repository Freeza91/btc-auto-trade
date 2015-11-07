var trade = require('../lib/trade'),
    info = require('../lib/get_info'),
    redis = require('../lib/redis');

exports.home = function (req, res, next) {
  info.get_account_info()
    .then(function(data){
      res.render('pages/home');
    })
}

exports.ltc = function(req, res, next){
  // redis.store('ltc', { trade_type: 'sell_market', price: 24, amount: 0.2090, coin_type: 'ltc' });
  // redis.store('ltc', { trade_type: 'buy_market', price: 23, amount: 5, coin_type: 'ltc' });
  res.render('pages/ltc');
}

exports.btc = function(req, res, next){
  // redis.store('btc', { trade_type: 'sell_market', price: 24, amount: 0.2090, coin_type: 'btc' });
  // redis.store('btc', { trade_type: 'buy_market', price: 23, amount: 5, coin_type: 'btc' });
  res.render('pages/btc');
}

exports.delete_key = function(req, res, next){
  var key = req.params.key
  redis.delete_key(key);
}