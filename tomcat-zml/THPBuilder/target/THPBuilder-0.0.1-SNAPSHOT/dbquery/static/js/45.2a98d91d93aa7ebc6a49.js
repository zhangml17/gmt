webpackJsonp([45],{"3k4x":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{form:{timeTypeValue:"",poleTypeValue:"",timeType:[],poleType:[],quotaName:""},tableData:[{unitID:"14231",unitName:"华隆集团",area:"V",nature:"电",userPowerType:"电力指标",trade:"平均",amount:"平均"},{unitID:"14231",unitName:"华隆集团",area:"V",nature:"电",userPowerType:"电力指标",trade:"平均",amount:"平均"},{unitID:"14231",unitName:"华隆集团",area:"V",nature:"电",userPowerType:"电力指标",trade:"平均",amount:"平均"},{unitID:"14231",unitName:"华隆集团",area:"V",nature:"电",userPowerType:"电力指标",trade:"平均",amount:"平均"},{unitID:"14231",unitName:"华隆集团",area:"V",nature:"电",userPowerType:"电力指标",trade:"平均",amount:"平均"}]}},mounted:function(){},methods:{childByType:function(e){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)}},updated:function(){},components:{TreeOrg:a("9qQU").a}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"form-list"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"企业ID"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.unitID,callback:function(t){e.$set(e.form,"unitID",t)},expression:"form.unitID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司名称"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.unitName,callback:function(t){e.$set(e.form,"unitName",t)},expression:"form.unitName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属行业"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.trade,callback:function(t){e.$set(e.form,"trade",t)},expression:"form.trade"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用电类型"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.userPowerType,callback:function(t){e.$set(e.form,"userPowerType",t)},expression:"form.userPowerType"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"认证状态"}},[a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.form.authStatusValue,callback:function(t){e.$set(e.form,"authStatusValue",t)},expression:"form.authStatusValue"}},e._l(e.form.authStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"企业报装量"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.amount,callback:function(t){e.$set(e.form,"amount",t)},expression:"form.amount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"企业性质"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.nature,callback:function(t){e.$set(e.form,"nature",t)},expression:"form.nature"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属区域"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.area,callback:function(t){e.$set(e.form,"area",t)},expression:"form.area"}})],1),e._v(" "),a("el-form-item",{staticClass:"btn-confirm btn-confirm-small",attrs:{label:""}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus"}},[e._v("新增")])],1)],1),e._v(" "),a("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{stripe:"",height:"800",data:e.tableData}},[a("el-table-column",{attrs:{property:"unitID",label:"企业ID"}}),e._v(" "),a("el-table-column",{attrs:{property:"unitName",label:"公司名称"}}),e._v(" "),a("el-table-column",{attrs:{property:"area",label:"所属区域"}}),e._v(" "),a("el-table-column",{attrs:{property:"nature",label:"企业性质"}}),e._v(" "),a("el-table-column",{attrs:{property:"userPowerType",label:"用电类型"}}),e._v(" "),a("el-table-column",{attrs:{property:"trade",label:"所属行业"}}),e._v(" "),a("el-table-column",{attrs:{property:"amount",label:"企业报装"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(l,r,!1,function(e){a("BPXi")},"data-v-579be3d8",null);t.default=o.exports},BPXi:function(e,t){}});
//# sourceMappingURL=45.2a98d91d93aa7ebc6a49.js.map