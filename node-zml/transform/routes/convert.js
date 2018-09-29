var express = require('express');
var router = express.Router();
var client = require('./conn-redis.js');

console.log(client);

//获取所有测点值
router.post('/getValues',function(req,res,next){
  
});
