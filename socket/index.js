var http = require('../lib/get_info')
    redis = require('../lib/redis'),
    trade = require('../lib/trade');

module.exports = function(io){

  var ltc = '';
  var btc = '';
  var account = {}

  function getBtc(){
    http.btc()
      .then(function(data){
        if(data){
          btc = data.ticker.last;
          redis.get_value('btc')
            .then(function(data){
              if(data){
                trade.makeTrade(data, btc, 'btc');
              }
            });
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
          redis.get_value('ltc')
            .then(function(data){
              if(data){
                trade.makeTrade(data, ltc, 'ltc');
              }
            });
        }
      })
      .catch(function(error){
        console.log(error.message);
      });
  }

  function getAccountInfo(){
    http.get_account_info()
      .then(function(data){
        account = data;
      })
      .catch(function(error){
        console.log(error.message);
      })
  }

  setInterval(getBtc, 2000);
  setInterval(getLtc, 2000);
  setInterval(getAccountInfo, 1000);

  io.sockets.on('connect', function (socket){

    var show_ltc = function(){
      socket.emit('ltc', { code: 1, ltc: ltc });
    }

    var show_btc = function(){
      socket.emit('btc', { code: 1, btc: btc });
    }

    var show_account_info = function(){
      socket.emit('account', { code: 1, account: account });
    }

    setInterval(show_btc, 1000);
    setInterval(show_ltc, 1000);
    setInterval(show_account_info, 1000);

  });

}