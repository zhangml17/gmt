

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "1": "\u4e91\u7aef\u7684\u9ad8\u6027\u80fd\u4eff\u771f\u5e73\u53f0\u3002", 
    "10": "\u4e91\u4eff\u771f", 
    "100": "\u516c\u5f00", 
    "101": "\u6807\u7b7e(\u591a\u4e2a\u5173\u952e\u5b57\u4e4b\u95f4\u7528\u201c,\u201d\u5206\u9694\uff0c\u6700\u591a\u4e0d\u8d85\u8fc73\u4e2a)", 
    "102": "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939", 
    "103": "\u65b0\u5efa\u6587\u4ef6\u5939", 
    "104": "\u4fdd\u5b58", 
    "105": "\u663e\u793a", 
    "106": "\u66f4\u65b0\u4e8e", 
    "107": "\u5143\u4ef6\u6570\u91cf\uff1a", 
    "108": "\u6a21\u5757\u6570\u91cf\uff1a", 
    "109": "\u5728\u5de5\u4f5c\u53f0\u4e2d\u6253\u5f00", 
    "11": "\u6838\u5fc3\u6280\u672f \u81ea\u4e3b\u7814\u53d1 \u56db\u5927\u4eff\u771f\u529f\u80fd \u96f6\u786c\u4ef6\u8d1f\u62c5 \u9ad8\u6548\u4eff\u771f", 
    "110": "\u5df2\u7ecf\u6ca1\u6709\u66f4\u591a\u5185\u5bb9\u4e86", 
    "111": "\u66f4\u6362\u5934\u50cf", 
    "112": "\u6635\u79f0", 
    "113": "\u5de5\u4f5c\u5355\u4f4d", 
    "114": "\u5bc6\u7801", 
    "115": "\u4fee\u6539\u5bc6\u7801", 
    "116": "\u6ce8\u518c\u65f6\u95f4", 
    "117": "\u6240\u5c5e\u7528\u6237\u7ec4", 
    "118": "\u6700\u591a\u4fdd\u5b58\u4eff\u771f\u6570", 
    "119": "\u505a\u591a\u4eff\u771f\u5143\u4ef6\u6570", 
    "12": "CloudPSS\u57fa\u4e8e\u201c\u4e91\u8ba1\u7b97\u201d\u601d\u60f3\uff0c\u7531\u4e91\u7aef\u4eff\u771f\u670d\u52a1\u5668\u5b8c\u6210\u5927\u89c4\u6a21\u98ce\u7535\u573a\u7535\u78c1\u6682\u6001\u4eff\u771f\u3001\u7535\u529b\u7cfb\u7edf\u786c\u4ef6\u5728\u73af\u4eff\u771f\u3001\u591a\u529f\u80fd\u4e92\u8865\u8026\u5408\u4eff\u771f\u4ee5\u53ca\u5176\u4ed6\u7535\u529b\u7cfb\u7edf\u6682\u6001\u4eff\u771f\u529f\u80fd\uff0c\u5ba2\u6237\u8fd0\u7528\u666e\u901a\u8ba1\u7b97\u673a\u5373\u53ef\u514d\u8d39\u4eab\u53d7\u6602\u8d35\u7684\u5927\u578b\u8ba1\u7b97\u673a\u5bf9\u5e9e\u5927\u7b97\u91cf\u7684\u9ad8\u6548\u8ba1\u7b97\u6210\u679c\u3002", 
    "120": "\u4eff\u771f\u9891\u7387", 
    "121": "\u9996&nbsp;&nbsp;\u9875", 
    "122": "\u7814\u7a76\u6210\u679c", 
    "123": "\u8fd0\u884c\u60c5\u51b5", 
    "124": "\u90ae\u7bb1", 
    "125": "\u83b7\u53d6\u9a8c\u8bc1\u7801", 
    "126": "\u8fd4\u56de\u767b\u5f55", 
    "127": "\u9a8c\u8bc1\u7801", 
    "128": "\u91cd\u65b0\u53d1\u9001", 
    "129": "\u786e\u5b9a", 
    "13": "\u4e91\u540c\u6b65", 
    "130": "\u786e\u8ba4\u5bc6\u7801", 
    "131": "\u7528\u6237\u540d", 
    "132": "\u6ce8\u518c\u7801", 
    "133": "\u53d1\u9001\u6ce8\u518c\u7801", 
    "134": "\u5df2\u6709\u8d26\u53f7?\u7acb\u523b\u53bb\u767b\u5f55\u5427", 
    "135": "\u6ce8\u518c", 
    "136": "\u518d\u6b21\u8f93\u5165\u5bc6\u7801", 
    "137": "\u5fae\u4fe1\u626b\u4e00\u626b\uff1a\u5206\u4eab", 
    "138": "\u5fae\u4fe1\u91cc\u70b9\u201c\u53d1\u73b0\u201d\uff0c\u626b\u4e00\u4e0b", 
    "139": "\u4e8c\u7ef4\u7801\u4fbf\u53ef\u5c06\u672c\u6587\u5206\u4eab\u81f3\u670b\u53cb\u5708\u3002", 
    "14": "\u8fdc\u7a0b\u8c03\u7528 \u591a\u7ec8\u7aef\u540c\u6b65 \u968f\u65f6\u968f\u5730\u968f\u5fc3\u5de5\u4f5c", 
    "140": "\u6700\u5c11\u95f4\u9694 \uff08s\uff09", 
    "141": "\u5173\u95ed", 
    "142": "\u63d0\u4ea4\u66f4\u6539", 
    "143": "\u6211\u521b\u5efa\u7684", 
    "144": "\u6211\u7684\u6536\u85cf", 
    "145": "\u670d\u52a1\u6761\u6b3e", 
    "146": "\u6e05\u534e\u5927\u5b66\u80fd\u6e90\u4e92\u8054\u7f51\u521b\u65b0\u7814\u7a76\u9662", 
    "147": "\u6ca1\u6709\u627e\u5230\u6700\u8fd1\u4fee\u6539\u7684\u5185\u5bb9\uff0c\u8bf7\u6253\u5f00\u5de5\u4f5c\u53f0\u8fdb\u884c", 
    "148": "\u65b0\u5efa", 
    "149": "\u6700\u8fd1\u6253\u5f00\u7684\u4eff\u771f\uff1a", 
    "15": "\u6240\u6709\u8bbe\u8ba1\u53ca\u8ba1\u7b97\u5de5\u4f5c\u90fd\u7531\u4e91\u6570\u636e\u5e93\u5b58\u50a8\uff0c\u52a0\u4e0a\u5e73\u53f0\u63d0\u4f9b\u4e0d\u540c\u7684\u6570\u636e\u63a5\u53e3\u4ee5\u53ca\u8c03\u7528API\u4f9b\u5404\u79cd\u5e94\u7528\u4f7f\u7528\uff0c\u7528\u6237\u53ea\u8981\u767b\u5f55\u8d26\u53f7\uff0c\u5373\u53ef\u968f\u65f6\u5728\u4efb\u4f55\u7ec8\u7aef\u8bbf\u95ee\u8bbe\u8ba1\u6587\u6863\uff0c\u8f83\u4e4b\u4f20\u7edf\u7684\u79bb\u7ebf\u4eff\u771f\u8f6f\u4ef6\u53ea\u80fd\u5728\u672c\u5730\u73af\u5883\u8fd0\u884c\uff0cCloudPSS\u6781\u5927\u89e3\u653e\u4e86\u8bbe\u8ba1\u8005\u7684\u65f6\u95f4\u4e0e\u7a7a\u95f4\uff0c\u8ba9\u60a8\u968f\u65f6\u968f\u5730\u968f\u5fc3\u5de5\u4f5c\u3002", 
    "150": "\u6700\u8fd1\u6253\u5f00\u7684\u6587\u6863\uff1a", 
    "151": "\u6ca1\u6709\u627e\u5230\u6700\u8fd1\u7684\u52a8\u6001\u3002", 
    "152": "\u6ca1\u6709\u627e\u5230\u6700\u8fd1\u5206\u4eab\u7684\u5185\u5bb9\u3002", 
    "153": "\u66f4\u591a", 
    "154": "\u6682\u65f6\u6ca1\u6709\u76f8\u5e94\u7684\u4eff\u771f", 
    "155": "\u5df2\u7ecf\u6ca1\u6709\u66f4\u591a\u5185\u5bb9\u4e86\u3002", 
    "156": "\u786e\u8ba4\u5220\u9664\uff1f", 
    "157": "\u4eff\u771f\u5e8f\u53f7", 
    "158": "\u663e\u793a", 
    "159": "\u662f\u5426\u7cfb\u7edf\u6a21\u5757", 
    "16": "\u4e91\u534f\u4f5c", 
    "160": "\u662f\u5426\u5171\u4eab", 
    "161": "\u6a21\u5757\u7b26\u53f7", 
    "162": "\u521b\u5efa\u65f6\u95f4", 
    "163": "\u70ed\u7f51\u6f6e\u6d41\u8bbe\u8ba1", 
    "17": "\u56fe\u5c42\u7ba1\u7406\uff0c\u591a\u4eba\u534f\u4f5c\uff0c\u65e0\u7f1d\u5bf9\u63a5", 
    "18": "\u9488\u5bf9\u65e5\u76ca\u590d\u6742\u5316\u7684\u7535\u7f51\u8bbe\u8ba1\u8d8b\u52bf\u4ee5\u53ca\u56e2\u961f\u5de5\u4f5c\u7684\u91cd\u8981\u6027\uff0cCloudPSS\u91c7\u7528\u56fe\u5c42\u7ba1\u7406\u601d\u8def\uff0c\u5404\u4eba\u5728\u4e0d\u540c\u7684\u56fe\u5c42\u4e2d\u8fdb\u884c\u8bbe\u8ba1\uff0c\u4ece\u800c\u5b9e\u73b0\u76f8\u5bf9\u72ec\u7acb\u540c\u65f6\u53c8\u80fd\u65e0\u7f1d\u5bf9\u63a5\u7684\u5206\u5de5\u5de5\u4f5c\u3002", 
    "19": "\u7acb\u5373\u4f53\u9a8c", 
    "2": "\u7075\u6d3b\u3001\u5171\u4eab\u3001\u9ad8\u6548\u3001\u514d\u8d39\u7684\u65b0\u4e00\u4ee3\u7535\u529b\u7cfb\u7edf\u4eff\u771f\u5e73\u53f0", 
    "20": "\u6210\u529f\u6848\u4f8b", 
    "21": "\u76f4\u9a71\u98ce\u673a\u7b97\u4f8b", 
    "22": "\u76f4\u9a71\u98ce\u673a\u662f\u5e38\u7528\u7684\u4e24\u79cd\u98ce\u673a\u4e2d\u7684\u4e00\u79cd\uff0c\u8be5\u7b97\u4f8b\u7ed9\u51fa\u4e86\u76f4\u9a71\u98ce\u673a\u7684\u7535\u78c1\u6682\u6001\u6a21\u578b\uff0c\u5176\u4e2d\u5305\u62ec\uff1a\u6c38\u78c1\u540c\u6b65\u7535\u673a\u3001\u80cc\u9760\u80cc\u53d8\u6d41\u5668\u7b49\u7535\u6c14\u90e8\u5206\u4ee5\u53ca\u76f8\u5e94\u7684\u63a7\u5236\u7cfb\u7edf\u3002", 
    "23": "\u53cc\u9988\u98ce\u673a\u7b97\u4f8b", 
    "24": "\u53cc\u9988\u98ce\u673a\u662f\u5e38\u7528\u7684\u4e24\u79cd\u98ce\u673a\u4e2d\u7684\u4e00\u79cd\uff0c\u8be5\u7b97\u4f8b\u7ed9\u51fa\u4e86\u53cc\u9988\u98ce\u673a\u7684\u7535\u78c1\u6682\u6001\u6a21\u578b\uff0c\u5176\u4e2d\u5305\u62ec\uff1a\u5f02\u6b65\u7535\u673a\u3001\u80cc\u9760\u80cc\u53d8\u6d41\u5668\u7b49\u7535\u6c14\u90e8\u5206\u4ee5\u53ca\u76f8\u5e94\u7684\u63a7\u5236\u7cfb\u7edf\u3002", 
    "25": "\u5149\u4f0f\u5e76\u7f51\u7cfb\u7edf\u7b97\u4f8b", 
    "26": "\u5149\u4f0f\u53d1\u7535\u7cfb\u7edf\u662f\u65b0\u80fd\u6e90\u53d1\u7535\u7684\u91cd\u8981\u7ec4\u6210\u90e8\u5206\uff0c\u8be5\u7b97\u4f8b\u7ed9\u51fa\u4e86PQ\u63a7\u5236\u7684\u5149\u4f0f\u5e76\u7f51\u7cfb\u7edf\u7b97\u4f8b\uff0c\u5e76\u8fdb\u884c\u4e86\u5149\u7167\u53d8\u5316\u60c5\u51b5\u7684\u6682\u6001\u8fc7\u7a0b\u5206\u6790\u3002", 
    "27": "\u5386\u53f2\u7248\u672c", 
    "28": "2016\u5e7409\u670821\u65e5\uff0cCloudPSS 1.0 \u6b63\u5f0f\u53d1\u5e03\u3002", 
    "29": "2017\u5e7409\u670821\u65e5\uff0cCloudPSS 2.0 \u6b63\u5f0f\u53d1\u5e03\u3002", 
    "3": "\u4e13\u6ce8\u4e8e\u4ea4\u76f4\u6d41\u4e92\u8054\u7535\u7f51\u7535\u78c1\u6682\u6001\u4eff\u771f", 
    "30": "\u7528\u6237\u5206\u5e03", 
    "31": "\u56fd\u5185\u9ad8\u6821", 
    "32": "\u56fd\u5916\u9ad8\u6821", 
    "33": "\u673a\u6784\u4e0e\u4f01\u4e1a", 
    "34": "\u6ce8\u518c\u7528\u6237", 
    "35": "\u7b97\u4f8b\u6570", 
    "36": "\u8ba1\u7b97\u4efb\u52a1\u6570", 
    "37": "\u5e38\u89c1\u95ee\u9898", 
    "38": "\u6ce8\u518c\u95ee\u9898", 
    "39": "\u4f7f\u7528\u95ee\u9898", 
    "4": "\u89e3\u51b3\u5927\u89c4\u6a21\u98ce\u7535\u573a\uff0c\u5149\u4f0f\u7535\u7ad9\u8be6\u7ec6\u5efa\u6a21\u4eff\u771f\u96be\u9898", 
    "40": "\u5176\u4ed6", 
    "41": "1. \u5982\u679c\u4f7f\u7528QQ\u90ae\u7bb1\u8fdb\u884c\u6ce8\u518c\uff0c\u82e5\u65e0\u6cd5\u63a5\u6536\u5230\u9a8c\u8bc1\u7801\uff0c\u8bf7\u5c1d\u8bd5\u5728\u5783\u573e\u90ae\u4ef6\u4e2d\u5bfb\u627e\u3002", 
    "42": "2. \u5982\u679c\u4f7f\u7528126s\u7b49\u7f51\u6613\u90ae\u7bb1\u8fdb\u884c\u6ce8\u518c\uff0c\u82e5\u65e0\u6cd5\u63a5\u6536\u5230\u9a8c\u8bc1\u7801\uff0c\u8bf7\u7528\u6ce8\u518c\u90ae\u7bb1\u5411noreply@cloudpss.net\u90ae\u7bb1\u53d1\u9001\u4e00\u5c01\u4efb\u610f\u5185\u5bb9\u90ae\u4ef6\uff0c\u4e4b\u540e\u518d\u5c1d\u8bd5\u53d1\u9001\u9a8c\u8bc1\u7801\u3002", 
    "43": "3. \u82e5\u4ecd\u65e0\u6cd5\u63a5\u6536\u9a8c\u8bc1\u7801\uff0c\u8bf7\u4e0eyuzhitong@cloudpss.net\u8054\u7cfb\u3002", 
    "44": "\u5f85\u8865\u5145", 
    "45": "\u8d44\u6e90\u4e0b\u8f7d", 
    "46": "CloudPSS\u56fd\u5bb6\u80fd\u6e90\u4e92\u8054\u7f51\u5927\u4f1a\u53d1\u5e03PPT", 
    "47": "\u70b9\u51fb\u4e0b\u8f7d", 
    "48": "CloudPSS\u7528\u6237\u624b\u518c", 
    "49": "\u9000\u51fa", 
    "5": "\u4e3b\u52a8\u914d\u7535\u7f51\uff0c\u5fae\u7535\u7f51\u52a8\u6001\u6a21\u62df\u548c\u7814\u7a76\u652f\u6491\u5de5\u5177", 
    "50": "\u8fdb\u5165\u6211\u7684\u4e3b\u9875", 
    "51": "\u767b\u5f55", 
    "52": "\u5fd8\u8bb0\u5bc6\u7801", 
    "53": "\u8fd8\u6ca1\u6709\u8d26\u53f7\uff1f\u8d76\u5feb\u6ce8\u518c\u4e00\u4e2a\u5427", 
    "54": "\u6211\u7684\u9996\u9875", 
    "55": "\u6211\u7684\u5de5\u4f5c\u53f0", 
    "56": "\u9000\u51fa", 
    "57": "\u6b22\u8fce\u4f7f\u7528CloudPSS", 
    "58": "\u8fdb\u5165\u5de5\u4f5c\u53f0", 
    "59": "\u6b63\u5f0f\u4f1a\u5458", 
    "6": "\u65e0\u9700\u5b89\u88c5 \uff0d \u7acb\u5373\u8bd5\u7528\u3002", 
    "60": "\u4eff\u771f", 
    "61": "\u6a21\u5757", 
    "62": "\u5173\u6ce8", 
    "63": "\u7c89\u4e1d", 
    "64": "\u4e3b\u9875", 
    "65": "\u5de5\u4f5c\u53f0", 
    "66": "\u4e91\u7a7a\u95f4", 
    "67": "\u8bbe\u7f6e", 
    "68": "\u5e94\u7528", 
    "69": "\u5e2e\u52a9", 
    "7": "\u7acb\u5373\u8bd5\u7528", 
    "70": "\u6700\u8fd1\u6253\u5f00\u7684\u5de5\u7a0b", 
    "71": "\u6700\u8fd1\u6253\u5f00\u7684\u6587\u6863", 
    "72": "\u5206\u4eab\u4e86\u6587\u6863", 
    "73": "\u66f4\u591a", 
    "74": "\u6211\u7684\u4eff\u771f", 
    "75": "\u4eff\u771f\u5e7f\u573a", 
    "76": "\u6211\u7684\u6a21\u5757", 
    "77": "\u53d1\u5e03", 
    "78": "\u6536\u85cf", 
    "79": "\u9009\u62e9\u6587\u4ef6\u5939\uff1a", 
    "8": "\u57fa\u4e8e\u4e91\u8ba1\u7b97\u7684\u7535\u78c1\u4eff\u771f\u5de5\u5177", 
    "80": "\u6240\u6709\u4eff\u771f", 
    "81": "\u6587\u4ef6\u5939\u7ba1\u7406", 
    "82": "\u5efa\u7acb\u65f6\u95f4", 
    "83": "\u6700\u540e\u4fee\u6539", 
    "84": "\u662f\u5426\u516c\u5f00", 
    "85": "\u7f16\u8f91", 
    "86": "\u6253\u5f00", 
    "87": "\u5220\u9664", 
    "88": "\u67e5\u8be2\u4eff\u771f", 
    "89": "\u641c\u7d22", 
    "9": "\u5229\u7528GPU\u5e76\u884c\u8ba1\u7b97\u7684\u5feb\u901f\u4eff\u771f\u89e3\u51b3\u65b9\u6848,\u63d0\u4f9b\u4e86\u7edf\u4e00\u6570\u636e\u63a5\u53e3\u7684\u5e94\u7528\u5e73\u53f0", 
    "90": "\u6dfb\u52a0\u6587\u4ef6\u5939", 
    "91": "\u8bf7\u586b\u5199\u65b0\u6587\u4ef6\u5939\u540d\u79f0", 
    "92": "\u521b\u5efa\u6587\u4ef6\u5939", 
    "93": "\u6211\u7684\u6587\u4ef6\u5939", 
    "94": "\u5e8f\u53f7", 
    "95": "\u540d\u79f0", 
    "96": "\u64cd\u4f5c", 
    "97": "\u4eff\u771f\u540d\u79f0", 
    "98": "\u4eff\u771f\u63cf\u8ff0", 
    "99": "\u79c1\u6709"
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };
  

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y/%m/%d %H:%M", 
      "%Y-%m-%d %H:%M", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M", 
      "%Y/%m/%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M:%S", 
      "%Y/%m/%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%n:%S.%f", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "DATE_INPUT_FORMATS": [
      "%Y/%m/%d", 
      "%Y-%m-%d", 
      "%Y\u5e74%n\u6708%j\u65e5"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "m\u6708j\u65e5", 
    "NUMBER_GROUPING": "4", 
    "SHORT_DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "SHORT_DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "THOUSAND_SEPARATOR": "", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M", 
      "%H:%M:%S", 
      "%H:%M:%S.%f"
    ], 
    "YEAR_MONTH_FORMAT": "Y\u5e74n\u6708"
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));

