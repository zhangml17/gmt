var express = require('express');
var router = express.Router();
var client = require('./conn-redis.js');

//查询list中的value
router.get("/getList",function(req,res,next){
    client.lrange("listkey",0,2,function(err,results){
      if(err)console.log("ERROR...");
      for(let i=0;i<results.length;i++){
        console.log(results[i]);
      }
    });
});

module.exports = router;
