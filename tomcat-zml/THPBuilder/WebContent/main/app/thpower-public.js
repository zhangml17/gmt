/**
 * 
 */



function GetQueryString(name) {
    var str = window.location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            if (name === arr[i].substring(0, num)) {
                return decodeURIComponent(arr[i].substr(num + 1));
            }
        }
    }
    return "";
}
