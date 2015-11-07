var trade = require('../lib/trade'),
    info = require('../lib/get_info');

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