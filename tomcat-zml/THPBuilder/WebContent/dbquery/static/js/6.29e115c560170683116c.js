webpackJsonp([6],{"569y":function(t,e){},"7Mwk":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("mvHQ"),r=a.n(n),l=a("//Fk"),s=a.n(l),i={data:function(){return{tableTitles:[{prop:"ID32",label:"通道编号",width:"70"},{prop:"name",label:"通道名称",width:"130"},{prop:"flag",label:"启用标志",width:"90"},{prop:"runStatus",label:"运行状态",width:"90"}],tableDataPrint:[],pauseButton:"暂停",multipleSelection:[],channelArr:[],tunitArr:[],sendCid:"",subscribeMsgObject:"",subscribeInfoObject:"",socket:"",stompClient:"",logHtml:""}},mounted:function(){this.getTableData(),this.connect()},methods:{tableRowClassName:function(t){var e=t.row;return"关闭"==e.flag||"断开"==e.runStatus?"discontrol-row":""},checkboxInit:function(t){return"关闭"==t.flag||"断开"==t.runStatus?0:1},switchDisable:function(t){return"关闭"==t.flag||"断开"==t.runStatus},connect:function(){var t=this;this.socket=new SockJS(this.BASE_INFO.MESSAGE_URL+"/thpclientConnect"),this.stompClient=Stomp.over(this.socket),this.stompClient.connect({},function(e){console.log("Connect Success!"),t.openMsgkafka(),t.openInfokafka()},function(t){console.log("Connect Error!")})},openMsgkafka:function(){var t=this;t.subscribeMsgObject=t.stompClient.subscribe("/user/rmsg/commDataMsg",function(e){for(var a=JSON.parse(e.body),n=0;n<t.multipleSelection.length;n++)a.cid==t.multipleSelection[n].ID32&&t.multipleSelection[n].msgOn&&a.detail&&t.getMsgReturnData("msg",a)})},openInfokafka:function(){var t=this;t.subscribeInfoObject=t.stompClient.subscribe("/user/rmsg/commInfoMsg",function(e){for(var a=JSON.parse(e.body),n=0;n<t.multipleSelection.length;n++)a.cid==t.multipleSelection[n].ID32&&t.multipleSelection[n].msgOn&&a.detail&&t.getMsgReturnData("info",a)})},getMsgReturnData:function(t,e){var a="",n="",r=e.detail.indexOf("["),l=e.detail.substring(0,r),s=e.detail.substring(r);"msg"==t?(a=document.getElementById("msgArea").innerHTML,n='<p class="margin-top-md"><span style="color: red">'+l+"</span><span>"+s+"</span></p>",document.getElementById("msgArea").innerHTML=a+n):(a=document.getElementById("infoArea").innerHTML,n='<p class="margin-top-md"><span style="color: red">'+l+"</span><span>"+s+"</span></p>",document.getElementById("infoArea").innerHTML=a+n)},headercellstyle:function(){return"background:#E4E7EB;font-weight: bold;color: #101010;"},getTableData:function(){var t=this,e=t.getTableModel("SCADA_Channel"),a=t.getTableModel("SCADA_TUnit");s.a.all([e,a]).then(function(e){t.refreshData(),setInterval(function(){t.refreshData()},3e3)})},refreshData:function(){var t=this,e=t.getDetailData("SCADA_Channel"),a=t.getDetailData("SCADA_TUnit");s.a.all([e,a]).then(function(e){if(e[0])for(var a=0;a<e[0].length;a++)e[0][a].flag=e[1][a].flag,e[0][a].msgOn=e[1][a].msgOn;if(t.tableDataPrint=e[0],t.$refs.table.clearSelection(),0!=t.multipleSelection.length)for(var n=0;n<t.multipleSelection.length;n++)for(var r=0;r<t.tableDataPrint.length;r++)if(t.multipleSelection[n].ID32==t.tableDataPrint[r].ID32){t.$refs.table.toggleRowSelection(t.tableDataPrint[r],!0);break}})},selectAllCheckbox:function(t){this.multipleSelection=t},selectCheckbox:function(t){this.multipleSelection=t},getTableModel:function(t){var e=this,a={tbname:t};return new s.a(function(n,r){e.$http.post(e.BASE_INFO.BASE_CURRENT_URL+"/getTableModel",a).then(function(a){if(a&&a.data&&a.data.result&&a.data.result.fields){var r=a.data.result.fields;if("SCADA_Channel"==t)for(var l=0;l<r.length;l++)"strName"!=a.data.result.fields[l].Name?"iStatus"==a.data.result.fields[l].Name&&(e.channelArr.push(l),setTimeout(n(e.channelArr),1e3)):e.channelArr.push(l);else for(var s=0;s<r.length;s++)"iEnabled"!=a.data.result.fields[s].Name?"iRecordFlag"==a.data.result.fields[s].Name&&(e.tunitArr.push(s),setTimeout(n(e.tunitArr),1e3)):e.tunitArr.push(s)}else console.log("获取表结构失败！")})})},getDetailData:function(t){var e=this,a=[],n={tbname:t,begin:0,count:0};return new s.a(function(t,r){e.$http.post(e.BASE_INFO.BASE_CURRENT_URL+"/getDetailedRecordByIndex",n).then(function(n){if(n&&n.data&&n.data.result&&n.data.result.data){var r=n.data.result.data;if("SCADA_Channel"==n.data.result.tbname){for(var l=0;l<r.length;l++){var s=r[l].record.split(","),i={};i.ID32=s[0],i.name=s[e.channelArr[0]],0==s[e.channelArr[1]]?i.runStatus="断开":i.runStatus="运行",a.push(i)}setTimeout(t(a),1e3)}else{for(var o=0;o<r.length;o++){var c=r[o].record.split(","),u={};0==c[e.tunitArr[0]]?u.flag="关闭":u.flag="启用",0==c[e.tunitArr[1]]?u.msgOn=!1:u.msgOn=!0,a.push(u)}setTimeout(t(a),1e3)}}})})},changeSwitch:function(t){var e="";e=t.msgOn?"1":"0";var a={tbname:"SCADA_TUnit",records:[{id:t.ID32,field:["iRecordFlag"],value:[e]}]};this.$http.post(this.BASE_INFO.BASE_CURRENT_URL+"/updateRecordData",a).then(function(t){t&&t.data&&t.data.replyCode&&"0"==t.data.replyCode.code?console.log("更新表中报文显示字段数据成功！"):console.log("更新表中报文显示字段数据失败！")})},pauseMsg:function(){"暂停"==this.pauseButton?(this.pauseButton="继续",this.subscribeMsgObject.unsubscribe(),this.subscribeInfoObject.unsubscribe()):(this.pauseButton="暂停",this.openMsgkafka(this))},saveMsg:function(){var t=document.getElementById("msgArea").innerText,e=new Blob([r()(t)]),a=window.URL||window.webkitURL||window,n=a.createObjectURL(e),l=document.createElement("a");l.href=n;var s=new Date,i="log"+(s.getFullYear().toString()+(s.getMonth()+1).toString()+s.getDate().toString())+"_"+(s.getHours().toString()+s.getMinutes().toString()+s.getSeconds().toString())+".txt";l.download=i,l.click(),a.revokeObjectURL(n)},clearMsg:function(){document.getElementById("msgArea").innerHTML="",document.getElementById("infoArea").innerHTML=""}},components:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:10}},[a("el-row",{staticStyle:{"margin-bottom":"10px"}},[a("span",[t._v("控制信息源打印")])]),t._v(" "),a("el-row",{staticStyle:{height:"450px",width:"496px","overflow-y":"auto"}},[a("el-table",{ref:"table",staticClass:"text-black",staticStyle:{width:"100%"},attrs:{data:t.tableDataPrint,"header-cell-style":t.headercellstyle,"row-class-name":t.tableRowClassName,border:""},on:{select:t.selectCheckbox,"select-all":t.selectAllCheckbox}},[a("el-table-column",{attrs:{type:"selection","reserve-selection":!0,selectable:t.checkboxInit,width:"35"}}),t._v(" "),t._l(t.tableTitles,function(t,e){return a("el-table-column",{key:e,attrs:{label:t.label,prop:t.prop,width:t.width,"min-width":"180"}})}),t._v(" "),a("el-table-column",{attrs:{label:"报文显示",align:"center",width:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"on-value":!0,"off-value":!1,disabled:t.switchDisable(e.row)},on:{change:function(a){t.changeSwitch(e.row)}},model:{value:e.row.msgOn,callback:function(a){t.$set(e.row,"msgOn",a)},expression:"scope.row.msgOn"}})]}}])})],2)],1)],1),t._v(" "),a("el-col",{attrs:{span:14}},[a("el-row",[a("el-col",{attrs:{span:15}},[a("span",[t._v("报文消息")])]),t._v(" "),a("el-col",{attrs:{span:9}},[a("el-button",{attrs:{type:"primary"},on:{click:t.pauseMsg}},[t._v(t._s(t.pauseButton))]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.saveMsg}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearMsg}},[t._v("清空")])],1)],1),t._v(" "),a("el-row",[a("div",{staticClass:"margin-top-lg padding-left-mx messageBgColor text-sm",staticStyle:{height:"270px","overflow-y":"auto"},attrs:{id:"msgArea"}})]),t._v(" "),a("el-row",{staticClass:"margin-top-lg"},[a("span",[t._v("信息提示")]),t._v(" "),a("div",{staticClass:"margin-top-lg padding-left-mx messageBgColor text-sm",staticStyle:{height:"150px","overflow-y":"auto"},attrs:{id:"infoArea"}})])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(i,o,!1,function(t){a("lu1s")},null,null).exports,u=a("BO1k"),d=a.n(u),g={data:function(){return{currentTreeData:[],tableTitles:[{prop:"index",label:"序号",width:"50"},{prop:"ID32",label:"内部ID32",width:"100"},{prop:"strName",label:"标识名",width:"150"},{prop:"strName",label:"名称",width:"200"},{prop:"originValue",label:"原始值",width:"150"},{prop:"tSnapTime",label:"上送时标",width:"200"},{prop:"iQuality",label:"质量",width:"135"}],tableData:[],currentPage:1,pageSize:50,totalRecords:0,analogArr:[],digitArr:[],selectNode:[],name:"",type:"",inputText:""}},mounted:function(){this.getCurrentTreeData(),this.getTableModel("SCADA_Analog"),this.getTableModel("SCADA_Digit")},methods:{headercellstyle:function(t){t.row,t.column,t.rowIndex,t.columnIndex;return"background:#E4E7EB;font-weight: bold;color: #101010;"},getTableModel:function(t){var e=this,a={tbname:t};e.$http.post(e.BASE_INFO.BASE_CURRENT_URL+"/getTableModel",a).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.fields){var a=t.data.result.fields;if("遥测"==t.data.result.Alias){for(var n=0;n<a.length;n++)if("ID32"==a[n].Name||"strTag"==a[n].Name||"strName"==a[n].Name||"fRaw"==a[n].Name||"tSnapTime"==a[n].Name||"iQuality"==a[n].Name){var r={index:+n,name:a[n].Name};e.analogArr.push(r)}}else for(var l=0;l<a.length;l++)if("ID32"==a[l].Name||"strTag"==a[l].Name||"strName"==a[l].Name||"iRaw"==a[l].Name||"tSnapTime"==a[l].Name||"iQuality"==a[l].Name){var s={index:+l,name:a[l].Name};e.digitArr.push(s)}}else console.log("获取表结构失败！")})},handleNodeClick:function(t){this.selectNode=t,t.unit&&(this.name='"'+t.unit+'"',this.type=t.label,this.getUnitData(t,0))},getCurrentTreeData:function(){var t=this;t.treeData=[];t.$http.post(t.BASE_INFO.BASE_CURRENT_URL+"/getDetailedRecordByIndex",{tbname:"SCADA_TUnit",begin:0,count:0}).then(function(e){if(e&&e.data&&e.data.result&&e.data.result.data){var a=e.data.result.data;t.currentTreeData.push(t.setTreeData(a))}})},getUnitData:function(t,e){var a=this;a.tableData=[];var n=a.analogArr,r=a.digitArr,l=t.id,s=t.label,i="",o=e,c=[{name:"iTuID",method:"==",value:l}],u={tbname:i="遥测"==s?"SCADA_Analog":"SCADA_Digit",begin:(this.currentPage-1)*this.pageSize,count:e,filter:c};a.$http.post(a.BASE_INFO.BASE_CURRENT_URL+"/getRecordByIndexfilter",u).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.data){var e=[];e="SCADA_Analog"==i?n:r;var l=[],s=t.data.result.count,c=t.data.result.data,u=0;u=a.pageSize<s?a.pageSize:s;for(var d=0;d<u;d++){var g=c[d].record.split(","),p={};p.index=d+1;for(var h=0;h<e.length;h++){if("iQuality"==e[h].name)switch(g[e[h].index]){case"0":p[e[h].name]="好";break;case"1":p[e[h].name]="坏";break;case"2":p[e[h].name]="可疑"}else p[e[h].name]=g[e[h].index];"fRaw"!=e[h].name&&"iRaw"!=e[h].name||(p.originValue=g[e[h].index])}l.push(p)}a.tableData=l,0==o&&(a.totalRecords=s)}else console.log("获取表格数据失败！")})},searchFilterTree:function(){var t=this.inputText,e=[],a={name:"strName"};a.value=t,a.method="contains",e.push(a),this.currentTreeData=[],this.tableData=[],""!=t?this.getRecordByIndexfilter(0,0,e):this.getCurrentTreeData()},getRecordByIndexfilter:function(t,e,a){var n=this,r={tbname:"SCADA_TUnit",begin:t,count:e,filter:a};n.$http.post(n.BASE_INFO.BASE_CURRENT_URL+"/getRecordByIndexfilter",r).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.data){var e=t.data.result.data;n.currentTreeData.push(n.setTreeData(e))}})},setTreeData:function(t){var e={label:"采集单元列表",children:[]},a=["遥测","遥信"],n=!0,r=!1,l=void 0;try{for(var s,i=d()(t);!(n=(s=i.next()).done);n=!0){var o=s.value.record.split(","),c={};c.id=o[0],c.label=o[2],c.children=[];var u=!0,g=!1,p=void 0;try{for(var h,m=d()(a);!(u=(h=m.next()).done);u=!0){var f=h.value,v={};v.label=f,v.id=o[0],v.unit=c.label,c.children.push(v)}}catch(t){g=!0,p=t}finally{try{!u&&m.return&&m.return()}finally{if(g)throw p}}e.children.push(c)}}catch(t){r=!0,l=t}finally{try{!n&&i.return&&i.return()}finally{if(r)throw l}}return e},handleSizeChange:function(t){this.pageSize=t,this.getUnitData(this.selectNode,this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,1==this.currentPage?this.getUnitData(this.selectNode,0):this.getUnitData(this.selectNode,this.pageSize)}},components:{}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:60}},[a("el-col",{staticClass:"messageBgColor",attrs:{span:5}},[a("div",{staticClass:"margin-bottom-lg padding-left-lg"},[a("el-input",{staticClass:"input-with-select margin-top-md",attrs:{placeholder:"请输入内容"},model:{value:t.inputText,callback:function(e){t.inputText=e},expression:"inputText"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchFilterTree},slot:"append"})],1)],1),t._v(" "),a("el-card",{staticClass:"messageBgColor",staticStyle:{height:"480px","overflow-y":"auto"},attrs:{shadow:"hover"}},[a("el-tree",{staticClass:"messageBgColor",attrs:{data:t.currentTreeData,"default-expand-all":"","highlight-current":""},on:{"node-click":t.handleNodeClick}})],1)],1),t._v(" "),a("el-col",{attrs:{span:19}},[a("span",[t._v(t._s(t.name))]),a("span",[t._v("采集单元")]),a("span",[t._v(t._s(t.type))]),a("span",[t._v("数据")]),t._v(" "),a("el-table",{staticClass:"margin-top-lg",attrs:{data:t.tableData,"header-cell-style":t.headercellstyle,height:"520px",border:""}},t._l(t.tableTitles,function(t,e){return a("el-table-column",{key:e,attrs:{label:t.label,prop:t.prop,width:t.width,"min-width":"180"}})})),t._v(" "),a("div",{staticClass:"block margin-top-lg",staticStyle:{float:"right"}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[50,100,200,500],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalRecords},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)],1)},staticRenderFns:[]};var h=a("VU/8")(g,p,!1,function(t){a("T5+U")},null,null).exports,m=(Number,String,Number,Number,Number,Number,Object,Number,Object,Number,Object,Number,Object,Number,Object,{data:function(){return{remoteKongVisible:!1,remoteTiaoVisible:!1,currentTreeData:[],tableTitles:[{prop:"index",label:"序号",width:"100"},{prop:"ID32",label:"内部ID32",width:"160"},{prop:"strTag",label:"标识名",width:"160"},{prop:"strName",label:"名称",width:"200"},{prop:"engineVal",label:"工程值",width:"200"}],tableData:[],currentPage:1,pageSize:20,totalRecords:0,remoteType:"",radio:"1",relayArr:[],pointArr:[],templateDatas:[],engineVal:[],name:"",type:"",remoteName:"",remoteId:"",remoteTiao:"",remoteIdTiao:"",currentStatus:"",targetStatus:"",current:"",target:"",form:{val:""},startFlag:"",startFlag1:"",endFlag:"",endFlag1:"",percentageK:0,resultK:"",percentageT:0,resultT:"",ButtonNameK:"遥控执行",ButtonNameT:"遥调执行",inputText:"",interval:"",selectName:""}},mounted:function(){this.getRemoteTreeData(),this.getTableModel("SCADA_Relay"),this.getTableModel("SCADA_SetPoint")},methods:{headercellstyle:function(t){t.row,t.column,t.rowIndex,t.columnIndex;return"background:#E4E7EB;font-weight: bold;color: #101010;"},handleNodeClick:function(t){this.selectNode=t,t.unit&&(this.name='"'+t.unit+'"',this.type=t.label,this.tableData=[],this.templateDatas=[],this.engineVal=[],this.totalRecords=0,this.getRemoteData(t,0))},getRemoteTreeData:function(){var t=this;t.treeData=[];t.$http.post(t.BASE_INFO.BASE_CURRENT_URL+"/getDetailedRecordByIndex",{tbname:"SCADA_TUnit",begin:0,count:0}).then(function(e){if(e&&e.data&&e.data.result&&e.data.result.data){var a=e.data.result.data;t.currentTreeData.push(t.setTreeData(a))}})},searchFilterTree:function(){var t=this.inputText,e=[],a={name:"strName"};a.value=t,a.method="contains",e.push(a),clearInterval(this.interval),this.currentTreeData=[],this.tableData=[],""!=t?this.getRecordByIndexfilter(0,0,e):this.getRemoteTreeData()},getRecordByIndexfilter:function(t,e,a){var n=this,r={tbname:"SCADA_TUnit",begin:t,count:e,filter:a};n.$http.post(n.BASE_INFO.BASE_CURRENT_URL+"/getRecordByIndexfilter",r).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.data){var e=t.data.result.data;n.currentTreeData.push(n.setTreeData(e))}})},setTreeData:function(t){var e={label:"采集单元列表",children:[]},a=["遥控","遥调"],n=!0,r=!1,l=void 0;try{for(var s,i=d()(t);!(n=(s=i.next()).done);n=!0){var o=s.value.record.split(","),c={};c.id=o[0],c.label=o[2],c.children=[];var u=!0,g=!1,p=void 0;try{for(var h,m=d()(a);!(u=(h=m.next()).done);u=!0){var f=h.value,v={};v.label=f,v.id=o[0],v.unit=c.label,c.children.push(v)}}catch(t){g=!0,p=t}finally{try{!u&&m.return&&m.return()}finally{if(g)throw p}}e.children.push(c)}}catch(t){r=!0,l=t}finally{try{!n&&i.return&&i.return()}finally{if(r)throw l}}return e},getTableModel:function(t){var e=this,a={tbname:t};e.$http.post(e.BASE_INFO.BASE_CURRENT_URL+"/getTableModel",a).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.fields){var a=t.data.result.fields;if("遥控"==t.data.result.Alias){for(var n=0;n<a.length;n++)if("ID32"==a[n].Name||"strTag"==a[n].Name||"strName"==a[n].Name||"iYXID32"==a[n].Name){var r={index:+n,name:a[n].Name};e.relayArr.push(r)}}else for(var l=0;l<a.length;l++)if("ID32"==a[l].Name||"strTag"==a[l].Name||"strName"==a[l].Name||"iYCID32"==a[l].Name){var s={index:+l,name:a[l].Name};e.pointArr.push(s)}}else console.log("获取表结构失败！")})},getRemoteData:function(t,e){var a=this,n=a.relayArr,r=a.pointArr,l=t.id,s=t.label;a.selectName=t.label;var i="",o=e;"遥控"==s?(i="SCADA_Relay",this.remoteType="遥控"):(i="SCADA_SetPoint",this.remoteType="遥调");var c=[{name:"iTuID",method:"==",value:l}],u={tbname:i,begin:(this.currentPage-1)*this.pageSize,count:e,filter:c};a.$http.post(a.BASE_INFO.BASE_CURRENT_URL+"/getRecordByIndexfilter",u).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.data){var e=[];e="SCADA_Relay"==i?n:r;var l=t.data.result.count,s=t.data.result.data,c=0;c=a.pageSize<l?a.pageSize:l,a.templateDatas=[],a.engineVal=[];for(var u=0;u<c;u++){var d=s[u].record.split(","),g={};g.index=u+1;for(var p=0;p<e.length;p++)g[e[p].name]=d[e[p].index],"iYXID32"!=e[p].name&&"iYCID32"!=e[p].name||(g.engineVal="",a.engineVal.push(parseInt(d[e[3].index])));a.templateDatas.push(g)}0==o&&(a.totalRecords=l),a.getEngineVal(a.selectName),a.interval=setInterval(function(){a.getEngineVal(a.selectName)},2e3)}else console.log("获取表格数据失败！")})},getEngineVal:function(t){var e=this,a=e.templateDatas,n={tbname:"遥控"==t?"SCADA_Digit":"SCADA_Analog",id:e.engineVal};e.$http.post(e.BASE_INFO.BASE_CURRENT_URL+"/getvalues",n).then(function(t){if(t&&t.data&&t.data.result&&t.data.result.value){for(var n=t.data.result.value,r=0;r<a.length;r++)a[r].engineVal=n[r];e.tableData=a}else console.log("获取工程值数据失败！")})},remoteBtnClick:function(t,e){"遥控"==e?(this.remoteKongVisible=!0,this.remoteName=t.strName,this.remoteId=t.ID32,this.percentageK=0,this.resultK="","0"==t.engineVal?(this.currentStatus=0,this.current="开",this.targetStatus=1,this.target="关",this.startFlag=!0,this.startFlag1=!1,this.endFlag=!1,this.endFlag1=!0):(this.currentStatus=1,this.current="关",this.targetStatus=0,this.target="开",this.startFlag=!1,this.startFlag1=!0,this.endFlag=!0,this.endFlag1=!1)):(this.remoteTiaoVisible=!0,this.remoteTiao=t.strName,this.remoteIdTiao=t.ID32,this.percentageT=0,this.resultT="",this.form.val="")},confirmUpdate:function(t){var e="",a="",n="";"遥控"==t?(e="SCADA_Relay",a=this.remoteId,n=this.targetStatus):(e="SCADA_SetPoint",a=this.remoteIdTiao,n=this.form.val),this.sendControlCommand(e,a,n)},sendControlCommand:function(t,e,a){var n=this,r={cid:Date.parse(new Date).toString(),username:"王大民",userid:"123",tbname:t,rid:e,val:a};n.$http.post(n.BASE_INFO.KAFKA_URL+"/send_control_commmd",r).then(function(a){a&&a.data&&null==a.data.err?n.getExecuteStatus(t,e):console.log("发送遥控、设置命令失败！")})},getExecuteStatus:function(t,e){var a=this,n={cid:Date.parse(new Date).toString(),username:"王大民",userid:"123",tbname:t,rid:parseInt(e)};a.$http.post(a.BASE_INFO.KAFKA_URL+"/get_execute_status",n).then(function(e){e&&e.data&&null==e.data.err?"SCADA_Relay"==t?(a.percentageK=100,a.resultK="执行成功"):(a.percentageT=100,a.resultT="执行成功"):"SCADA_Relay"==a.tbName?(a.resultK="执行失败",a.ButtonNameK="重新执行"):(a.resultT="执行失败",a.ButtonNameT="重新执行")})},handleSizeChange:function(t){this.pageSize=t,this.getRemoteData(this.selectNode,this.pageSize)},handleCurrentChange:function(t){this.currentPage=t,1==this.currentPage?this.getRemoteData(this.selectNode,0):this.getRemoteData(this.selectNode,this.pageSize)}},components:{}}),f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{attrs:{gutter:60}},[n("el-col",{staticClass:"messageBgColor",attrs:{span:5}},[n("div",{staticClass:"margin-bottom-lg padding-left-lg"},[n("el-input",{staticClass:"input-with-select margin-top-md",attrs:{placeholder:"请输入内容"},model:{value:t.inputText,callback:function(e){t.inputText=e},expression:"inputText"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchFilterTree},slot:"append"})],1)],1),t._v(" "),n("el-card",{staticClass:"messageBgColor",attrs:{shadow:"hover"}},[n("el-tree",{staticClass:"messageBgColor",attrs:{data:t.currentTreeData,"default-expand-all":"","highlight-current":""},on:{"node-click":t.handleNodeClick}})],1)],1),t._v(" "),n("el-col",{attrs:{span:19}},[n("span",{attrs:{id:"nodeName"}},[t._v(t._s(t.name))]),n("span",[t._v("采集单元")]),n("span",{attrs:{id:"selectType"}},[t._v(t._s(t.type))]),n("span",[t._v("数据")]),t._v(" "),n("el-table",{staticClass:"margin-top-lg",attrs:{data:t.tableData,"header-cell-style":t.headercellstyle,height:"520px",border:""}},[t._l(t.tableTitles,function(t,e){return n("el-table-column",{key:e,attrs:{label:t.label,prop:t.prop,width:t.width,"min-width":"180"}})}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"info",plain:""},on:{click:function(a){t.remoteBtnClick(e.row,t.remoteType)}}},[t._v(t._s(t.remoteType))])]}}])})],2),t._v(" "),n("div",{staticClass:"block margin-top-lg",staticStyle:{float:"right"}},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[50,100,200,500],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalRecords},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"遥控操作",visible:t.remoteKongVisible,width:"35%"},on:{"update:visible":function(e){t.remoteKongVisible=e}}},[n("el-row",[n("el-col",{attrs:{span:4}},[n("span",[t._v("遥控点名：")])]),t._v(" "),n("el-col",{attrs:{span:20}},[n("span",[t._v(t._s(t.remoteName))])])],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:4}},[n("span",[t._v("遥控ID：")])]),t._v(" "),n("el-col",{attrs:{span:20}},[n("span",[t._v(t._s(t.remoteId))])])],1),t._v(" "),n("el-row",{staticClass:"margin-top-lg"},[n("div",{staticClass:"margin-top-lg messageBgColor text-sm text-center",staticStyle:{height:"130px"}},[n("el-row",{staticClass:"margin-top-lg",staticStyle:{top:"30%"}},[n("el-col",{attrs:{span:8}},[n("el-row",[t.startFlag?n("el-button",{attrs:{type:"success",circle:""}},[t._v(t._s(t.current))]):t._e(),t._v(" "),t.startFlag1?n("el-button",{attrs:{type:"danger",circle:""}},[t._v(t._s(t.current))]):t._e()],1),t._v(" "),n("el-row",[n("span",[t._v("当前状态("+t._s(t.currentStatus)+")")])])],1),t._v(" "),n("el-col",{staticClass:"margin-top-lg",attrs:{span:8}},[n("img",{attrs:{src:a("qNF3")}})]),t._v(" "),n("el-col",{attrs:{span:8}},[n("el-row",[t.endFlag?n("el-button",{attrs:{type:"success",circle:""}},[t._v(t._s(t.target))]):t._e(),t._v(" "),t.endFlag1?n("el-button",{attrs:{type:"danger",circle:""}},[t._v(t._s(t.target))]):t._e()],1),t._v(" "),n("el-row",[n("span",[t._v("目标状态("+t._s(t.targetStatus)+")")])])],1)],1)],1)]),t._v(" "),n("el-row",{staticClass:"margin-top-lg"},[n("el-col",{attrs:{span:6}},[n("span",[t._v("遥控")]),t._v("执行状态：\n            ")]),t._v(" "),n("el-col",{staticStyle:{"margin-left":"-10px","margin-top":"4px"},attrs:{span:15}},[n("el-progress",{attrs:{percentage:t.percentageK}})],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("span",{attrs:{id:"runResult"}},[t._v(t._s(t.resultK))])])],1),t._v(" "),n("div",{staticClass:"dialog-footer text-center",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.confirmUpdate("遥控")}}},[t._v(t._s(t.ButtonNameK))])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"遥调操作",visible:t.remoteTiaoVisible,width:"35%"},on:{"update:visible":function(e){t.remoteTiaoVisible=e}}},[n("el-row",[n("el-col",{attrs:{span:4}},[n("span",[t._v("遥调点名：")])]),t._v(" "),n("el-col",{attrs:{span:20}},[n("span",[t._v(t._s(t.remoteTiao))])])],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:4}},[n("span",[t._v("遥调ID：")])]),t._v(" "),n("el-col",{attrs:{span:20}},[n("span",[t._v(t._s(t.remoteIdTiao))])])],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:4}},[n("span",[t._v("新值：")])]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"",type:"number",min:0},model:{value:t.form.val,callback:function(e){t.$set(t.form,"val",e)},expression:"form.val"}})],1)],1),t._v(" "),n("el-row",{staticClass:"margin-top-lg"},[n("el-col",{attrs:{span:6}},[n("span",[t._v("遥调")]),t._v("执行状态：\n            ")]),t._v(" "),n("el-col",{staticStyle:{"margin-left":"-10px","margin-top":"4px"},attrs:{span:15}},[n("el-progress",{attrs:{percentage:t.percentageT}})],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("span",{attrs:{id:"result"}},[t._v(t._s(t.resultT))])])],1),t._v(" "),n("div",{staticClass:"dialog-footer text-center",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.confirmUpdate("遥调")}}},[t._v(t._s(t.ButtonNameT))])],1)],1)],1)},staticRenderFns:[]};var v={data:function(){return{activeName:"message"}},methods:{},components:{Message:c,Current:h,Remote:a("VU/8")(m,f,!1,function(t){a("569y")},null,null).exports}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"通讯报文",name:"message"},on:{click:function(e){t.routerPush("communication","")}}},[a("Message")],1),t._v(" "),a("el-tab-pane",{attrs:{label:"实时数据",name:"currentData"}},[a("Current")],1),t._v(" "),a("el-tab-pane",{attrs:{label:"遥控遥调",name:"Remote"}},[a("Remote")],1)],1)},staticRenderFns:[]};var _=a("VU/8")(v,b,!1,function(t){a("JBtd")},null,null);e.default=_.exports},JBtd:function(t,e){},"T5+U":function(t,e){},lu1s:function(t,e){},mvHQ:function(t,e,a){t.exports={default:a("qkKv"),__esModule:!0}},qNF3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAOCAYAAADe46U4AAAABHNCSVQICAgIfAhkiAAAALBJREFUaIHt1qENAkEQBdD5BEmCxKAxNICjAxxN0AuNUAMCSQgt7B9/9vwO5i4hBFDsbcL9J2dGfPGTXTORH4oIkDzWziEj0xUvSJ4iYvrpbjJkKBmVvbufm6aZvVuqeFLStm3bK8nF60LFk6IArCPinlJaPc9VPCkOwNLMbu6+6WcqngwCwDznfCG5MzND7UDyXyIC7p6/nQA4gGQMlkqko6dWRESkKP3xpAr98aSKB+PKQHkB3AQBAAAAAElFTkSuQmCC"},qkKv:function(t,e,a){var n=a("FeBl"),r=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}}});