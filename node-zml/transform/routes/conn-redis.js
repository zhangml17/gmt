//连接redis数据库
var config = require('../db-config.js');
const REDIS_REST_IP=config.REDIS_REST_IP;
const REDIS_PORT = config.REDIS_PORT;

var redis = require('redis');

var client = redis.createClient(REDIS_PORT,REDIS_REST_IP);

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
