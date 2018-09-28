/**
 * 
 */
       
    
// 对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {  
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "H+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };  
   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
	   if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
}  



/**生成一个随机数**/
function randomNum(min,max){
  return Math.floor( Math.random()*(max-min)+min);
}

/**生成一个随机色**/
function randomColor(min,max){
  var r = randomNum(min,max);
  var g = randomNum(min,max);
  var b = randomNum(min,max);
  return "rgb("+r+","+g+","+b+")";
}
	  
//document.getElementById("canvas").onclick = function(e){
//  e.preventDefault();
//  drawPic();
//}	  
//drawPic();

/**绘制验证码图片**/
function drawPic(){
  var canvas=document.getElementById("canvas");
  var width=canvas.width;
  var height=canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.textBaseline = 'bottom';

  /**绘制背景色**/
  ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
  ctx.fillRect(0,0,width,height);
  /**绘制文字**/
  var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
  for(var i=0; i<4; i++){
    var txt = str[randomNum(0,str.length)];
    ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
    ctx.font = randomNum(15,40)+'px SimHei'; //随机生成字体大小
    var x = 10+i*25;
    var y = randomNum(25,45);
    var deg = randomNum(-45, 45);
    //修改坐标原点和旋转角度
    ctx.translate(x,y);
    ctx.rotate(deg*Math.PI/180);
    ctx.fillText(txt, 0,0);
    //恢复坐标原点和旋转角度
    ctx.rotate(-deg*Math.PI/180);
    ctx.translate(-x,-y);
  }
  /**绘制干扰线**/
  /*
  for(var i=0; i<8; i++){
    ctx.strokeStyle = randomColor(40,180);
    ctx.beginPath();
    ctx.moveTo( randomNum(0,width), randomNum(0,height) );
    ctx.lineTo( randomNum(0,width), randomNum(0,height) );
    ctx.stroke();
  }*/
  /**绘制干扰点**/
  
  /*
  for(var i=0; i<100; i++){
    ctx.fillStyle = randomColor(0,255);
    ctx.beginPath();
    ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
    ctx.fill();
  }*/
}