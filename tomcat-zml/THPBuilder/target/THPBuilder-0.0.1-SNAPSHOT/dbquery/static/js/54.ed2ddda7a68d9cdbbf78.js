webpackJsonp([54],{AQyO:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{form:{energyMType:"",energySType:""},tableData:[{energyMType:"1",energySType:"A相电流",unit:"V",price:"电",value:"A相电流",mark:"A相电流",priceMean:"A相电流"},{energyMType:"1",energySType:"A相电流",unit:"V",price:"电",value:"A相电流",mark:"A相电流",priceMean:"A相电流"},{energyMType:"1",energySType:"A相电流",unit:"V",price:"电",value:"A相电流",mark:"A相电流",priceMean:"A相电流"},{energyMType:"1",energySType:"A相电流",unit:"V",price:"电",value:"A相电流",mark:"A相电流",priceMean:"A相电流"},{energyMType:"1",energySType:"A相电流",unit:"V",price:"电",value:"A相电流",mark:"A相电流",priceMean:"A相电流"}]}},mounted:function(){},methods:{childByType:function(e){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)}},updated:function(){},components:{TreeOrg:r("9qQU").a}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"form-list"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"能源类型"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.energyMType,callback:function(t){e.$set(e.form,"energyMType",t)},expression:"form.energyMType"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"能源种类"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.energySType,callback:function(t){e.$set(e.form,"energySType",t)},expression:"form.energySType"}})],1),e._v(" "),r("el-form-item",{staticClass:"btn-confirm btn-confirm-small",attrs:{label:""}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{icon:"el-icon-plus"}},[e._v("新增")])],1)],1),e._v(" "),r("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{stripe:"",height:"800",data:e.tableData}},[r("el-table-column",{attrs:{type:"index",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{property:"energyMType",label:"能源类型"}}),e._v(" "),r("el-table-column",{attrs:{property:"energySType",label:"能源种类"}}),e._v(" "),r("el-table-column",{attrs:{property:"unit",label:"常用计量单位"}}),e._v(" "),r("el-table-column",{attrs:{property:"price",label:"价格"}}),e._v(" "),r("el-table-column",{attrs:{property:"value",label:"能量值"}}),e._v(" "),r("el-table-column",{attrs:{property:"mark",label:"备注(取值说明)"}}),e._v(" "),r("el-table-column",{attrs:{property:"priceMean",label:"价格说明"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){e.handleEdit(t.$index,t.row)}}},[e._v("修改")]),e._v(" "),r("el-button",{attrs:{size:"mini"},on:{click:function(r){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)])},staticRenderFns:[]};var a=r("VU/8")(l,n,!1,function(e){r("wFEx")},"data-v-247535ba",null);t.default=a.exports},wFEx:function(e,t){}});
//# sourceMappingURL=54.ed2ddda7a68d9cdbbf78.js.map