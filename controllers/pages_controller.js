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
  res.render('pages/ltc');
}

exports.btc = function(req, res, next){
  res.render('pages/btc');
}

exports.settings = function(req, res, next){
  var body = req.body;
  value = {
    trade_type: body.trade_type,
    price: body.price,
    amount: body.amount,
    coin_type: body.coin_type
  }
  // redis.store(body.coin_type, value);
  req.flash('value', JSON.stringify(value));
  res.redirect('/' + body.coin_type);
}

exports.delete_key = function(req, res, next){
  var key = req.params.key
  redis.delete_key(key);
}