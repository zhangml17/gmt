webpackJsonp([6],{UJMj:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("BO1k"),i=n.n(a),l={data:function(){return{tableheight:500,columnwidth:55,timeName:"刷新",isrefresh:!1,refreshInterval:{},isSCADA_Analog:!1,checkvalue:[],addtabs:!1,tableName:"",treeData:[],columns:["A","B","C"],tableData:[[1,2,3],[4,5,6]],viewcolumns:[],viewtableData:[],multipleSelection:[],editableTabsValue:"0",editableTabs:[],tabIndex:0,checkList:[],columnnameoptions:[],columnname:"",symboloptions:[],symbol:"",inputvalue:"",condition:"",isString:!1,conditionIndex:0,conditionList:[],selcetCount:"30",pagesizes:[50,100,200,500],pagesize:50,totalcount:0,currentpage:1,tabList:[],tagname:"SCADA_Analog"}},mounted:function(){this.getTreeData()},methods:{openPointSelector:function(e){that.tagname=e,this.getTreeData()},getPoints:function(){var e=[];if(this.multipleSelection.length>0){var t=!0,n=!1,a=void 0;try{for(var l,o=i()(this.multipleSelection);!(t=(l=o.next()).done);t=!0){var s=l.value;e.push(s.ID32)}}catch(e){n=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw a}}}else this.$message({message:"请至少选择一个测点！",type:"warning"});return e},headercellstyle:function(e){e.row,e.column,e.rowIndex,e.columnIndex;return"background:#E4E7EB;font-weight: bold;color: #101010;"},handleNodeClick:function(e){if(!e.children){this.tableName=e.path,this.addtabs=!0,this.clearInput();var t=[],n=[];for(var a in e.fields){t.push(e.fields[a].Desc),e.fields[a].key=e.fields[a].Name,e.fields[a].label=e.fields[a].Desc,e.fields[a].value=e.fields[a].Name;var i=e.fields[a].Desc.replace(/[^\x00-\xff]/g,"01").length;e.fields[a].minwidth=10*i,n.push(e.fields[a])}this.columns=n,this.columnnameoptions=e.fields,this.columnnameoptions.length>0&&(this.columnname=this.columnnameoptions[0].Name,this.changeColumnName(this.columnname)),this.checkvalue=[],this.initoptions(!1),this.getTableCount();this.getTableData(e.path,this.pagesize,[])}},getTreeData:function(){var e=this,t={tbname:e.tagname};e.$http.post(e.BASE_INFO.BASE_DATA_URL+"/getTableModel",t).then(function(t){if(t&&t.data&&t.data.result){var n=t.data.result;if(n){var a=n;a.label=n.Alias,a.id=n.ID32,e.handleNodeClick(a)}}})},getTableData:function(e,t,n){var a=this,i=n,l={tbname:e,begin:(a.currentpage-1)*a.pagesize,count:t,filter:n};a.$http.post(a.BASE_INFO.BASE_DATA_URL+"/getRecordByIndexfilter",l).then(function(e){if(e&&e.data&&e.data.result&&e.data.result.data){var t=[],n=e.data.result.data;for(var l in n){var o={},s=n[l].record.split(",");for(var r in s){var c=a.columns[r].value,u=s[r];a.$set(o,c,u)}t.push(o)}a.tableData=t;var h=0,m=a.pagesize;if(i.length>0){a.totalcount=a.tableData.length;var v=a.currentpage;h=(v-1)*a.pagesize,m=(v-1)*a.pagesize+a.pagesize}a.viewCloumns(h,m)}else a.tableData=[],a.viewtableData=[]})},getTableCount:function(){var e=this,t={tbname:e.tableName};e.$http.post(e.BASE_INFO.BASE_DATA_URL+"/query_count",t).then(function(t){if(t&&t.data&&t.data.result){var n=parseInt(t.data.result.count);e.totalcount=n,e.currentpage=1}})},initoptions:function(e){var t=[];return e?(t.push({value:"==",label:"等于"}),t.push({value:"contains",label:"包含"}),t.push({value:"not_contains",label:"不包含"}),t.push({value:"begin_with",label:"以…为开头"}),t.push({value:"end_with",label:"以…结束"})):(t.push({value:"==",label:"等于"}),t.push({value:"<>",label:"不等于"}),t.push({value:">",label:"大于"}),t.push({value:"<",label:"小于"}),t.push({value:">=",label:"大于等于"}),t.push({value:"<=",label:"小于等于"})),t},clearInput:function(){this.clearcondition()},changeColumnName:function(e){var t=!1;if(this.columnnameoptions){var n=!0,a=!1,l=void 0;try{for(var o,s=i()(this.columnnameoptions);!(n=(o=s.next()).done);n=!0){var r=o.value;r.Name==e&&"STRING"===r.DataType&&(t=!0)}}catch(e){a=!0,l=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw l}}}this.symboloptions=this.initoptions(t),this.symboloptions&&(this.symbol=this.symboloptions[0].value)},changeItemColumnName:function(e,t){if(this.conditionList){var n=this.conditionList[t],a=!1;if(n.columnnameoptions){var l=!0,o=!1,s=void 0;try{for(var r,c=i()(n.columnnameoptions);!(l=(r=c.next()).done);l=!0){var u=r.value;u.Name==e&&"STRING"===u.DataType&&(a=!0)}}catch(e){o=!0,s=e}finally{try{!l&&c.return&&c.return()}finally{if(o)throw s}}}this.conditionList[t].symboloptions=[],this.conditionList[t].symboloptions=this.initoptions(a),this.conditionList[t].symboloptions&&(this.conditionList[t].symbol=this.conditionList[t].symboloptions[0].value)}},onselectclick:function(){var e=[],t=this.columnname,n=this.symbol,a=this.inputvalue;if(""!=t||""!=a){var l={};l.name=t,l.value=a,l.method=n,a&&e.push(l)}if(this.conditionList){var o=!0,s=!1,r=void 0;try{for(var c,u=i()(this.conditionList);!(o=(c=u.next()).done);o=!0){var h=c.value;if(""!=t||""!=a){var m={};m.name=h.columnname,m.value=h.inputvalue,m.method=h.symbol,m.value&&e.push(m)}}}catch(e){s=!0,r=e}finally{try{!o&&u.return&&u.return()}finally{if(s)throw r}}}var v=0;0==e.length&&(v=this.pagesize,this.getTableCount()),this.getTableData(this.tableName,v,e)},addcondition:function(){var e=++this.conditionIndex+"",t={};t.id=e,t.columnname="",t.columnnameoptions=this.columnnameoptions,t.symboloptions=this.symboloptions,t.symbol="",t.inputvalue="",t.condition="",this.conditionList.push(t)},clearcondition:function(){this.columnname="",this.symbol="",this.inputvalue="",this.conditionList&&(this.conditionList=[])},deletecondition:function(e){this.conditionList&&this.conditionList.splice(e,1)},confirmCloumns:function(){var e=this.currentpage,t=(e-1)*this.pagesize,n=(e-1)*this.pagesize+this.pagesize;this.viewCloumns(t,n),this.dialogFormVisible=!1},viewCloumns:function(e,t){var n=this.checkvalue,a=this.columns,l=this.tableData;if(n.length>0){var o=[],s=!0,r=!1,c=void 0;try{for(var u,h=i()(a);!(s=(u=h.next()).done);s=!0){var m=u.value,v=!0,d=!1,p=void 0;try{for(var f,b=i()(n);!(v=(f=b.next()).done);v=!0){var g=f.value;m.value==g&&o.push(m)}}catch(e){d=!0,p=e}finally{try{!v&&b.return&&b.return()}finally{if(d)throw p}}}}catch(e){r=!0,c=e}finally{try{!s&&h.return&&h.return()}finally{if(r)throw c}}var y=[];l.length<t&&(t=l.length);for(var w=e;w<t;w++){var _={},x=!0,D=!1,k=void 0;try{for(var C,N=i()(n);!(x=(C=N.next()).done);x=!0){g=C.value;if(l[w].hasOwnProperty(g)){this.$set(_,g,l[w][g]);var S=10*l[w][g].length.replace(/[^\x00-\xff]/g,"01").length;for(var I in o)o[I].value==g&&S>o[I].minwidth&&(o[I].minwidth=S)}}}catch(e){D=!0,k=e}finally{try{!x&&N.return&&N.return()}finally{if(D)throw k}}y.push(_)}this.viewcolumns=o,this.viewtableData=y}else{var T=[];l.length<t&&(t=l.length);for(w=e;w<t;w++){_=l[w];for(var I in a){(S=10*_[a[I].value].replace(/[^\x00-\xff]/g,"01").length)>a[I].minwidth&&(a[I].minwidth=S)}T.push(_)}this.viewcolumns=a,this.viewtableData=T}},handleSelectionChange:function(e){this.multipleSelection=e},changeformColumnName:function(e){if(this.form.columnnameoptions){var t=!0,n=!1,a=void 0;try{for(var l,o=i()(this.form.columnnameoptions);!(t=(l=o.next()).done);t=!0){var s=l.value;s.Name==e&&(this.form.label=s.Desc,"INT"==s.DataType||"FLOAT"==s.DataType?this.isString=!1:this.isString=!0)}}catch(e){n=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw a}}}},updateTablemodel:function(e,t){var n=this,a={tbname:e,records:t};n.$http.post(n.BASE_INFO.BASE_DATA_URL+"/updateRecordData",a).then(function(e){e&&e.data&&e.data.replyCode&&0==e.data.replyCode.code&&n.onselectclick()})},refresh:function(){var e=this;e.isrefresh=!e.isrefresh;var t=1e3*e.inputTime;e.isrefresh?(e.refreshInterval=setInterval(function(){e.onselectclick()},t),e.timeName="停止"):(e.refreshInterval=clearInterval(e.refreshInterval),e.timeName="刷新")},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pagesize=e,this.onselectclick()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentpage=e,this.onselectclick()}},components:{}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("el-card",{attrs:{shadow:"hover"}},[n("el-card",{directives:[{name:"show",rawName:"v-show",value:e.addtabs,expression:"addtabs"}],staticStyle:{"margin-bottom":"10px"},attrs:{shadow:"hover"}},[n("el-row",{staticStyle:{"margin-bottom":"10px"}}),e._v(" "),n("el-row",{staticStyle:{"margin-bottom":"10px"}},[n("el-select",{attrs:{placeholder:"请选择列"},on:{change:e.changeColumnName},model:{value:e.columnname,callback:function(t){e.columnname=t},expression:"columnname"}},e._l(e.columnnameoptions,function(e,t){return n("el-option",{key:t,attrs:{label:e.Desc,value:e.Name}})})),e._v(" "),n("el-select",{attrs:{placeholder:""},model:{value:e.symbol,callback:function(t){e.symbol=t},expression:"symbol"}},e._l(e.symboloptions,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:""},model:{value:e.inputvalue,callback:function(t){e.inputvalue=t},expression:"inputvalue"}}),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.onselectclick}},[e._v("查询")]),e._v(" "),n("el-button",{attrs:{type:"info",plain:""},on:{click:e.addcondition}},[e._v("增加条件")]),e._v(" "),n("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearcondition}},[e._v("清空条件")])],1),e._v(" "),e._l(e.conditionList,function(t,a){return n("el-row",{key:a,staticStyle:{"margin-bottom":"10px"}},[n("el-select",{attrs:{placeholder:"请选择列"},on:{change:function(t){e.changeItemColumnName(t,a)}},model:{value:t.columnname,callback:function(n){e.$set(t,"columnname",n)},expression:"con.columnname"}},e._l(t.columnnameoptions,function(e,t){return n("el-option",{key:t,attrs:{label:e.Desc,value:e.Name}})})),e._v(" "),n("el-select",{attrs:{placeholder:"等于"},model:{value:t.symbol,callback:function(n){e.$set(t,"symbol",n)},expression:"con.symbol"}},e._l(t.symboloptions,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:""},model:{value:t.inputvalue,callback:function(n){e.$set(t,"inputvalue",n)},expression:"con.inputvalue"}}),e._v(" "),n("i",{staticClass:"el-icon-close",on:{click:e.deletecondition}})],1)})],2),e._v(" "),n("el-table",{attrs:{data:e.viewtableData,"header-cell-style":e.headercellstyle,"max-height":e.tableheight,border:""},on:{"selection-change":e.handleSelectionChange}},[e.addtabs?n("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),e._l(e.viewcolumns,function(e,t){return n("el-table-column",{key:t,attrs:{label:e.label,prop:e.value,"min-width":e.minwidth}})})],2),e._v(" "),n("div",{staticClass:"block",staticStyle:{float:"right","margin-top":"20px","margin-bottom":"20px"}},[n("span",{staticClass:"demonstration"}),e._v(" "),n("el-pagination",{attrs:{"current-page":e.currentpage,"page-sizes":e.pagesizes,"page-size":e.pagesize,layout:"total,sizes, prev, pager, next, jumper",total:e.totalcount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)])},staticRenderFns:[]};var s=n("VU/8")(l,o,!1,function(e){n("odPI")},"data-v-c51a8e24",null);t.default=s.exports},odPI:function(e,t){}});