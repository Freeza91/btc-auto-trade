var Promise = require("bluebird"),
    redis = require("redis"),
    client = redis.createClient();

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var store = function(key, value){
  client.set(key, JSON.stringify(value));
}

var get_value = function(key){
  return client.getAsync(key)
    .then(function(value){
      return JSON.parse(value);
    })
    .catch(function(error){
      console.log(error.message);
    });
}

var delete_key = function(key){
  client.del(key);
}

exports.store = store;
exports.get_value = get_value;
exports.delete_key = delete_key;
