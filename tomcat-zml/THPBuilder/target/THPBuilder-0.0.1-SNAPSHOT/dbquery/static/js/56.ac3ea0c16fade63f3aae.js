webpackJsonp([56],{bafS:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{form:{energyTypeValue:"",energyType:[],devNum:"",devName:""},tableData:[{quotaNum:"1",quotaName:"A相电流",quotaUnit:"V",mainType:"电",subType:"电力指标",sumMode:"平均",dataSource:"采集"},{quotaNum:"1",quotaName:"A相电流",quotaUnit:"V",mainType:"电",subType:"电力指标",sumMode:"平均",dataSource:"采集"},{quotaNum:"1",quotaName:"A相电流",quotaUnit:"V",mainType:"电",subType:"电力指标",sumMode:"平均",dataSource:"采集"},{quotaNum:"1",quotaName:"A相电流",quotaUnit:"V",mainType:"电",subType:"电力指标",sumMode:"平均",dataSource:"采集"},{quotaNum:"1",quotaName:"A相电流",quotaUnit:"V",mainType:"电",subType:"电力指标",sumMode:"平均",dataSource:"采集"}]}},mounted:function(){},methods:{childByType:function(e){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)}},updated:function(){},components:{TreeOrg:a("9qQU").a}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"form-list"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"大类"}},[a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.form.energyTypeValue,callback:function(t){e.$set(e.form,"energyTypeValue",t)},expression:"form.energyTypeValue"}},e._l(e.form.energyType,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.devNum,callback:function(t){e.$set(e.form,"devNum",t)},expression:"form.devNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.devName,callback:function(t){e.$set(e.form,"devName",t)},expression:"form.devName"}})],1),e._v(" "),a("el-form-item",{staticClass:"btn-confirm btn-confirm-small",attrs:{label:""}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus"}},[e._v("新增")])],1)],1),e._v(" "),a("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{stripe:"",height:"800",data:e.tableData}},[a("el-table-column",{attrs:{property:"quotaNum",label:"指标编号"}}),e._v(" "),a("el-table-column",{attrs:{property:"quotaName",label:"指标名称"}}),e._v(" "),a("el-table-column",{attrs:{property:"quotaUnit",label:"指标单位"}}),e._v(" "),a("el-table-column",{attrs:{property:"mainType",label:"指标大类"}}),e._v(" "),a("el-table-column",{attrs:{property:"subType",label:"指标小类"}}),e._v(" "),a("el-table-column",{attrs:{property:"sumMode",label:"汇总方式"}}),e._v(" "),a("el-table-column",{attrs:{property:"dataSource",label:"数据来源"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)])},staticRenderFns:[]};var n=a("VU/8")(l,o,!1,function(e){a("fgYF")},"data-v-1b0c8d41",null);t.default=n.exports},fgYF:function(e,t){}});
//# sourceMappingURL=56.ac3ea0c16fade63f3aae.js.map