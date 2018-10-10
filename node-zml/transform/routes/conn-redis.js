//连接redis数据库
var express = require('express');
var config = require('../db-config.js');

const REDIS_IP=config.REDIS_IP;
const REDIS_PORT = config.REDIS_PORT;
const REDIS_PWD = config.REDIS_PWD;

var redis = require('redis');
var client = redis.createClient(REDIS_PORT,REDIS_IP,{auth_pass:REDIS_PWD});

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
module.exports = client;
