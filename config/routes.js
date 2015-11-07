// controllers
var pages = require('../controllers/pages_controller');

// middlewares
var http_auth = require('../middlewares/http_auth');

module.exports = function(app){

  app.get('/', http_auth, pages.home);
  app.get('/ltc', http_auth, pages.ltc);
  app.get('/btc', http_auth, pages.btc);

}