// controllers
var pages = require('../controllers/pages_controller');

// middlewares
var http_auth = require('../middlewares/http_auth');

module.exports = function(app){

  app.get('/', http_auth, pages.home);
}