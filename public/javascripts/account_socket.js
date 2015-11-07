$(function(){

  var socket = io.connect();

  socket.on('account', function(data){
    if(data && data.code == 1){
      var account = data.account;
      $('#info').html(account.net_asset);
    }
  });

});