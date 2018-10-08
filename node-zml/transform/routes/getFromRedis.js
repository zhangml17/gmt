var express = require('express');
var router = express.Router();
var client = require('./conn-redis.js');

//查询list中的value
//
//已经路由实现将数据转换为json字符串，再通过json字符串将数据转换为json对象
router.get("/getList",function(req,res,next){
    client.lrange("listkey",0,2,function(err,results){
      if(err)console.log("ERROR...");
      for(let i=0;i<results.length;i++){
        console.log(results[i]);
      }
      //先将map转换为object
      function mapToObj(map){
        let obj = Object.create(null);
        for(let [k,v] of map){
          obj[k] = v;
        }
        return obj;
      }
     
      var map1 = new Map();
      map1.set("code","0");
      map1.set("message","success");
     
      var mapObj1 = mapToObj(map1);

      var map2 = new Map();
      map2.set("VALUE",["8.2200002670288086","0","12.510000228881836","2.869999885559082"]);
      map2.set("QTY",[1,0,1,1,1]);
      
      var mapObj2 = mapToObj(map2);
      
     var map0 = new Map();
     map0.set("reployCode",mapObj1);
     map0.set("result",mapObj2);
    
     var mapObj0 = mapToObj(map0);
     var json = JSON.stringify(mapObj0); 
     console.log("json字符串：",json);

     var jsonObj = JSON.parse(json);
     console.log("json对象:",jsonObj);
    });
});

module.exports = router;
