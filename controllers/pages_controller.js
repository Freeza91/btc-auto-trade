exports.home = function (req, res, next) {
  res.render('pages/home');
}

exports.ltc = function(req, res, next){
  res.render('pages/ltc');
}

exports.btc = function(req, res, next){
  res.render('pages/btc');
}