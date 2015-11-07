var http = require('../lib/get_info');

module.exports = function(io){

  var ltc = '';
  var btc = '';

  function getBtc(){
    http.btc()
      .then(function(data){
        if(data){
          btc = data.ticker.last;
        }
      })
      .catch(function(error){
        console.log(error.message);
      });
  }

  function getLtc(){
    http.ltc()
      .then(function(data){
        if(data){
          ltc = data.ticker.last;
        }
      })
      .catch(function(error){
        console.log(error.message);
      });
  }

  setInterval(getBtc, 1000);
  setInterval(getLtc, 1000);

  io.sockets.on('connect', function (socket){

    var show_ltc = function(){
      socket.emit('ltc', { code: 1, ltc: ltc });
    }

    var show_btc = function(){
      socket.emit('btc', { code: 1, btc: btc });
    }

    setInterval(show_btc, 1000);
    setInterval(show_ltc, 1000);

  });

}