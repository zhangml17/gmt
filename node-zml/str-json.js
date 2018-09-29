//1、Map 转 JSON，需要先将Map转化为Object（对象）
function mapToObj(map){
  let obj = Object.create(null);
    for(let [k,v] of map){
        obj[k] = v;
    }
       return obj;
}
           
//nodejs中使用map、array数组来组合一个json对象
var map1 = new Map();
map1.set("key1", "value1");
map1.set("key2", "value2");
map1.set("key3", "value3");

var mapObj =  mapToObj(map1);

var arr = new Array ();
arr.push(mapObj);

var map2 = new Map();
map2.set('result',arr);
map2.set('total',300);

//console.log(map2.get('result')[0].get('key3'));
//输出map类i型
console.log("map类型：");
console.log(map2);

//如果所有 Map 的键都是字符串， 它可以转为对象。

var mapObj2 = mapToObj(map2);
//输出对象类型
console.log("对象类型：");
console.log(mapObj2);

//2、将对象转换为JSON字符串
var strMap = JSON.stringify(mapObj2);
//输出map字符串类型
console.log("字符串类型:"+strMap);

//3、将字符串转换为JSON对象
var json = JSON.parse(strMap);

console.log("对象取值：");
console.log(json.result[0].key3);
