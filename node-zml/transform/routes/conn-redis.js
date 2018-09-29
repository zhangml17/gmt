//连接redis数据库

var redis = require('redis');

var client = redis.createClient(16379,'192.168.100.42');

/*client.on("error",function(err){
  console.log('Error:'+err);
});

client.on('connect',runSample);

function runSample(){

  client.set("stringkey", "Hello World", function (err, reply) {     
    console.log(reply.toString());   
   });
   
  client.get("stringkey", function (err, reply) {   
    console.log(reply.toString());   
   });
}*/


var express = require('express');

module.exports = client;
