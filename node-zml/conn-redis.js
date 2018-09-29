var code = 0
var message = '"success"';
var reployCode = '{"code":'+code+","+'"message":'+message+ '}';

var VALUE='["8.22","12.51","2.86"]';
var TIME='['+1520855807+','+1520855807+','+1520855807+']';
var QTY='['+1+','+1+','+ 1+']';
var ERROR='['+0+','+0+','+0+ ']';

var result ='{"VALUE":'+VALUE+','+'"TIME":'+TIME+','+'"QTY":'+QTY+','+'"ERROR":'+ERROR +' }';

var jsStr = '{"reployCode":'+reployCode+','+'"result":'+result + '}';


console.log(JSON.parse(jsStr));

//假如从redis获得的数据，转换成了字符串
/*var redisObj ={
  "reployCode":{
    "code":0,
    "message":"success"
  },
  "result":{
    "VALUE":["8.22","12.51","2.86"],
    "TIME":[1520855807,1520855807,1520855807],
    "QTY":[1,1,1],
    "ERROR":[0,0,1]
  }
}

console.log(redisObj.reployCode);
console.log(redisObj.result);

console.log("1:"+JSON.stringify(redisObj));
*/


/*var code = 0;
//一定要将"success"作为值传递，如果没有单引号，相当于把success作为值传递，会出错
var message = '"success"';
var reployCode ='{ "code":' + code + "," + '"message":'  +message+ "}";

console.log(JSON.parse(reployCode));
*/
