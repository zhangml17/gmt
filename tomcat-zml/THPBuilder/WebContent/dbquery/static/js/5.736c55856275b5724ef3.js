webpackJsonp([5],{SZRf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("BO1k"),r=a.n(i),n=["上海","北京","广州","深圳"],c={data:function(){return{valuetime:"",startTime:"",endTime:"",typeData:[{type_id:"1",type_name:"遥测",ischecked:!1,viewchecked:!1,children:[{type_id:"1.1",type_name:"遥测越限",ischecked:!1,viewchecked:!1},{type_id:"1.2",type_name:"遥测越限2",ischecked:!1,viewchecked:!1}]},{type_id:"2",type_name:"SOE",ischecked:!1,viewchecked:!1,children:[{type_id:"2.1",type_name:"越限",ischecked:!1,viewchecked:!1},{type_id:"2.2",type_name:"越限2",ischecked:!1,viewchecked:!1}]}],prioritData:[{priority_id:"1",name:"一级",ischecked:!1,viewchecked:!1},{priority_id:"2",name:"二级",ischecked:!1,viewchecked:!1},{priority_id:"3",name:"三级",ischecked:!1,viewchecked:!1}],tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],prioritychecked:{ischecked:!1,viewchecked:!1},checkedType:[],input_object_name:"",input_cobject_name:"",input_content:"",more:!1,pagesizes:[50,100,200,500],pagesize:50,totalcount:0,currentpage:1,testData:{code:0,data:[{id32:25,floor:1,name:"一层消防通道",rm_type:3},{id32:24,floor:1,name:"一层洗手间",rm_type:3},{id32:23,floor:1,name:"展厅",rm_type:3},{id32:22,floor:1,name:"环幕",rm_type:3},{id32:21,floor:1,name:"机房",rm_type:3},{id32:20,floor:1,name:"前台",rm_type:3},{id32:2,floor:2,name:"小会议室",rm_type:2},{id32:32,floor:2,name:"二层过道与会谈区",rm_type:3},{id32:31,floor:2,name:"二层茶水间",rm_type:3},{id32:28,floor:2,name:"二层资料室",rm_type:3},{id32:1,floor:2,name:"大会议室",rm_type:2},{id32:3,floor:2,name:"创新发展部",rm_type:1},{id32:4,floor:2,name:"能源传感实验室",rm_type:1},{id32:5,floor:2,name:"二层大厅",rm_type:3},{id32:8,floor:3,name:"圆桌会议室",rm_type:2},{id32:30,floor:3,name:"三层西茶水间",rm_type:3},{id32:29,floor:3,name:"三层东茶水间",rm_type:3},{id32:27,floor:3,name:"三层资料室",rm_type:3},{id32:26,floor:3,name:"三层文印室",rm_type:3},{id32:6,floor:3,name:"行政部门",rm_type:1},{id32:7,floor:3,name:"院长办公室",rm_type:1},{id32:11,floor:3,name:"人力部门",rm_type:1},{id32:9,floor:3,name:"创新发展部南",rm_type:1},{id32:10,floor:3,name:"能源传感团队",rm_type:1},{id32:19,floor:3,name:"三层大厅",rm_type:3},{id32:18,floor:3,name:"飞轮储能团队",rm_type:1},{id32:17,floor:3,name:"物联网团队",rm_type:1},{id32:16,floor:3,name:"洽谈室",rm_type:2},{id32:15,floor:3,name:"科研管理部",rm_type:1},{id32:14,floor:3,name:"知识产权部",rm_type:1},{id32:13,floor:3,name:"创新发展部北",rm_type:1},{id32:12,floor:3,name:"财务部门",rm_type:1}]}}},mounted:function(){var e=new Date(new Date((new Date).toLocaleDateString()).getTime()),t=new Date(new Date((new Date).toLocaleDateString()).getTime()+864e5-1);this.startTime=e,this.endTime=t,this.get_alarm_priority(),this.get_alarm_type()},methods:{headercellstyle:function(e){e.row,e.column,e.rowIndex,e.columnIndex;return"background:#F7F8FA;font-weight: bold;color: #101010;"},handleCheckAllChange:function(e){this.checkedCities=e?n:[],this.isIndeterminate=!1},handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=t===this.cities.length,this.isIndeterminate=t>0&&t<this.cities.length},selected:function(){var e,t=this.getcheckedPriority(),a=this.getcheckedTypes(),i=Date.parse(this.startTime)/1e3,r=Date.parse(this.endTime)/1e3,n=[],c=this.input_object_name,l=this.input_cobject_name,s=this.input_content;c&&((e={name:"object_name"}).value=c,n.push(e));l&&((e={name:"cobject_name"}).value=l,n.push(e));s&&((e={name:"content"}).value=s,n.push(e));this.get_data_func(i,r,t,a,n)},selectedPriority:function(e){if(0==e){if(this.prioritychecked.ischecked=!this.prioritychecked.ischecked,this.prioritychecked.viewchecked=!this.prioritychecked.viewchecked,this.prioritychecked.ischecked)for(var t in this.prioritData)this.prioritData[t].viewchecked=!1,this.prioritData[t].ischecked=!0}else{var a=0;for(var i in this.prioritData)e==this.prioritData[i].priority_id&&(this.prioritData[i].viewchecked=!this.prioritData[i].viewchecked),this.prioritData[i].viewchecked&&(this.prioritData[i].ischecked=!0,this.prioritychecked.viewchecked=!1,a++);if(a==this.prioritData.length)for(var t in this.prioritychecked.ischecked=!0,this.prioritychecked.viewchecked=!0,this.prioritData)this.prioritData[t].viewchecked=!1}},selectedType:function(e,t){for(var a in this.typeData)if(this.typeData[a].type_id==e.type_id)if(t){var i=0;for(var r in this.typeData[a].children)t.type_id==this.typeData[a].children[r].type_id&&(this.typeData[a].children[r].viewchecked=!this.typeData[a].children[r].viewchecked),this.typeData[a].children[r].viewchecked&&(this.typeData[a].children[r].ischecked=!0,i++);if(i==this.typeData[a].children.length)for(var r in this.typeData[a].ischecked=!0,this.typeData[a].viewchecked=!0,this.typeData[a].children)this.typeData[a].children[r].viewchecked=!1}else if(this.typeData[a].ischecked=!this.typeData[a].ischecked,this.typeData[a].viewchecked=!this.typeData[a].viewchecked,this.typeData[a].ischecked)for(var r in this.typeData[a].children)this.typeData[a].children[r].ischecked=!0,this.typeData[a].children[r].viewchecked=!1},get_alarm_priority:function(){var e=this;e.$http.post(e.BASE_INFO.ALARM_URL,{type:"get_alarm_priority"}).then(function(t){if(t&&t.data&&t.data.data){var a=t.data.data,i=[],n=!0,c=!1,l=void 0;try{for(var s,o=r()(a);!(n=(s=o.next()).done);n=!0){var d={};(d=s.value).ischecked=!1,d.viewchecked=!1,i.push(d)}}catch(e){c=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(c)throw l}}e.prioritData=i,e.selectedPriority(0)}})},get_alarm_type:function(){var e=this;e.$http.post(e.BASE_INFO.ALARM_URL,{type:"get_alarm_type"}).then(function(t){if(t&&t.data&&t.data.data){var a=t.data.data,i=e.toTree(a,0),n=[],c=!0,l=!1,s=void 0;try{for(var o,d=r()(i);!(c=(o=d.next()).done);c=!0){var p={};(p=o.value).ischecked=!1,p.viewchecked=!1;var h=[],_=!0,m=!1,v=void 0;try{for(var y,u=r()(p.children);!(_=(y=u.next()).done);_=!0){var f=x=y.value;f.ischecked=!1,f.viewchecked=!1,h.push(f)}}catch(e){m=!0,v=e}finally{try{!_&&u.return&&u.return()}finally{if(m)throw v}}n.push(p)}}catch(e){l=!0,s=e}finally{try{!c&&d.return&&d.return()}finally{if(l)throw s}}if(e.typeData=n,n){var k=!0,g=!1,b=void 0;try{for(var w,D=r()(n);!(k=(w=D.next()).done);k=!0){var x=w.value;e.selectedType(x,null)}}catch(e){g=!0,b=e}finally{try{!k&&D.return&&D.return()}finally{if(g)throw b}}}}})},getcheckedPriority:function(){var e=[],t=!0,a=!1,i=void 0;try{for(var n,c=r()(this.prioritData);!(t=(n=c.next()).done);t=!0){var l=n.value;l.ischecked&&e.push({priority_id:l.priority_id})}}catch(e){a=!0,i=e}finally{try{!t&&c.return&&c.return()}finally{if(a)throw i}}return e},getcheckedTypes:function(){var e=[],t=!0,a=!1,i=void 0;try{for(var n,c=r()(this.typeData);!(t=(n=c.next()).done);t=!0){var l=n.value;if(l.children){var s=!0,o=!1,d=void 0;try{for(var p,h=r()(l.children);!(s=(p=h.next()).done);s=!0){var _=p.value;_.ischecked&&e.push({type_id:_.type_id})}}catch(e){o=!0,d=e}finally{try{!s&&h.return&&h.return()}finally{if(o)throw d}}}}}catch(e){a=!0,i=e}finally{try{!t&&c.return&&c.return()}finally{if(a)throw i}}return e},get_data_func:function(e,t,a,i,r){var n=this,c={type:"get_data_func",begin_time:e+"",end_time:t+"",priority:a,alarm_type:i,filter:r};n.$http.post(n.BASE_INFO.ALARM_URL,c).then(function(e){if(e&&e.result&&e.result.data){var t=e.result.data;n.tableData=t}})},toTree:function(e,t){for(var a,i=[],r=0;r<e.length;r++)if(e[r].parent_type_id==t){var n=e[r];(a=this.toTree(e,e[r].type_id)).length>0&&(n.children=a),i.push(n)}return i},toTree1:function(e,t){for(var a=[],i=0;i<e.length;i++){var r=e[i],n=!1;for(var c in a)a[c].floor==r.floor&&(n=!0);if(n)a[c].children.push(r);else{var l={};l.floor=r.floor,l.children=[],l.children.push(r),a.push(l)}}return a},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pagesize=e},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentpage=e}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"divcontent"},[e._m(0),e._v(" "),a("div",{staticClass:"sl-v-list"},[a("span",{staticClass:"sapn-margin-left left title",staticStyle:{"margin-top":"4px"}},[e._v("开始时间：")]),e._v(" "),a("el-date-picker",{staticClass:"left  text-width",staticStyle:{"margin-left":"3px"},attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),a("span",{staticClass:"sapn-margin-left  left title",staticStyle:{"margin-top":"4px"}},[e._v("结束时间：")]),e._v(" "),a("el-date-picker",{staticClass:"left  text-width",attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}}),e._v(" "),a("el-button",{staticClass:"left",staticStyle:{"margin-left":"8px"},attrs:{type:"primary"},on:{click:e.selected}},[e._v("查询")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.more,expression:"!more"}],staticClass:"more left",staticStyle:{"margin-left":"8px","margin-top":"4px",color:"#4066F7"},on:{click:function(t){e.more=!0}}},[e._v("更多")])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.more,expression:"more"}],staticClass:"sl-v-list"},[a("span",{staticClass:"title"},[e._v("主对象名称：")]),e._v(" "),a("el-input",{staticClass:"text-width",attrs:{placeholder:"请输入内容"},model:{value:e.input_object_name,callback:function(t){e.input_object_name=t},expression:"input_object_name"}}),e._v(" "),a("span",{staticClass:"title",staticStyle:{"margin-left":"8px"}},[e._v("告警区域：")]),e._v(" "),a("el-input",{staticClass:"text-width",attrs:{placeholder:"请输入内容"},model:{value:e.input_cobject_name,callback:function(t){e.input_cobject_name=t},expression:"input_cobject_name"}}),e._v(" "),a("span",{staticClass:"title",staticStyle:{"margin-left":"8px"}},[e._v("告警内容：")]),e._v(" "),a("el-input",{staticClass:"text-width",attrs:{placeholder:"请输入内容"},model:{value:e.input_content,callback:function(t){e.input_content=t},expression:"input_content"}}),e._v(" "),a("span",{staticClass:"more",staticStyle:{"margin-left":"10px","margin-top":"4px",color:"#4066F7"},on:{click:function(t){e.more=!1}}},[e._v("收起")])],1),e._v(" "),a("div",{staticClass:"sl-v-list"},[a("span",{staticClass:"left title"},[e._v("告警级别：")]),e._v(" "),a("ul",{staticClass:"left ul_nav"},[a("li",{class:e.prioritychecked.viewchecked?"class-a":"class-b",on:{click:function(t){e.selectedPriority(0)}}},[e._v("全部")]),e._v(" "),e._l(e.prioritData,function(t,i){return a("li",{key:i,class:t.viewchecked?"class-a":"class-b",on:{click:function(a){e.selectedPriority(t.priority_id)}}},[e._v(e._s(t.name))])})],2)]),e._v(" "),e._l(e.typeData,function(t,i){return a("div",{key:i,staticClass:"sl-v-list"},[a("span",{staticClass:"left title"},[e._v(e._s(t.type_name)+"：")]),e._v(" "),a("ul",{staticClass:"left ul_nav"},[a("li",{class:t.viewchecked?"class-a":"class-b",on:{click:function(a){e.selectedType(t,null)}}},[e._v("全部")]),e._v(" "),e._l(t.children,function(i,r){return a("li",{key:r,class:i.viewchecked?"class-a":"class-b",on:{click:function(a){e.selectedType(t,i)}}},[e._v(e._s(i.type_name))])})],2)])}),e._v(" "),a("div",{staticStyle:{float:"right","margin-right":"20px","margin-top":"20px"}},[a("el-button",{attrs:{type:"info",plain:""}},[e._v("导出数据")])],1),e._v(" "),a("div",{staticClass:"div-table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headercellstyle}},[a("el-table-column",{attrs:{prop:"alarm_id",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"object_id",label:"主对象编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"category_name",label:"告警大类"}}),e._v(" "),a("el-table-column",{attrs:{prop:"type_name",label:"告警类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reason_name",label:"告警原因"}}),e._v(" "),a("el-table-column",{attrs:{prop:"timestamp",label:"告警时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"object_name",label:"主对象名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cobject_name",label:"告警区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"alarm_value",label:"告警值"}}),e._v(" "),a("el-table-column",{attrs:{prop:"content",label:"告警内容"}}),e._v(" "),a("el-table-column",{attrs:{prop:"note",label:"注释内容"}}),e._v(" "),a("el-table-column",{attrs:{prop:"confirm_user",label:"确认人员"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ack_time",label:"确认时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"delete_user",label:"删除人员"}}),e._v(" "),a("el-table-column",{attrs:{prop:"del_time",label:"删除时间"}})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right","margin-top":"20px","margin-bottom":"20px"}},[a("span",{staticClass:"demonstration"}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentpage,"page-sizes":e.pagesizes,"page-size":e.pagesize,layout:"total,sizes, prev, pager, next, jumper",total:e.totalcount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],2)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",[this._v("查询历史告警")])])}]};var s=a("VU/8")(c,l,!1,function(e){a("eaAc")},"data-v-6389268a",null);t.default=s.exports},eaAc:function(e,t){}});