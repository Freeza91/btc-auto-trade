$(function(){

  var socket = io.connect();

  socket.on('btc', function(data){
    if(data && data.code == 1){
      var btc = data.btc;
      $('#info').html(btc);
    }
  });

});