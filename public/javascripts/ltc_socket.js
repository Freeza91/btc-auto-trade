$(function(){

  var socket = io.connect();

  socket.on('ltc', function(data){
    if(data && data.code == 1){
      var ltc = data.ltc;
      $('#info').html("LTC: " + ltc);
    }
  });

});