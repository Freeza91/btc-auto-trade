// controllers
var pages = require('../controllers/pages_controller');

// middlewares
var http_auth = require('../middlewares/http_auth');

module.exports = function(app){

  app.get('/', http_auth, pages.home);
  app.get('/ltc', http_auth, pages.ltc);
  app.get('/btc', http_auth, pages.btc);
  app.post('/settings', http_auth, pages.settings);
  app.get('/delete', http_auth, pages.delete_key);

}