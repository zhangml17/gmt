/**
 * Created by admin on 2018/8/13.
 */

//基于Handsontable的报表工具
//吴观辉
// 2018.08.01
//北京

//project
var proid;

//report data
var rtdatas;

// 列出全局变量
var hot;
var Crow, Ccol, Ccell, valT;
var selectRange, selectRangeArr = [];
var settingArr=[];
var rowSizeArr=[];
var colSizeArr=[];

//初始化最小行和最小列
var minRows=1, minCols=1;
var startRows=40, startCols=26;

//类型列表
var rttypes=["日报表", "月报表", "年报表"];

//统计列表
var rtstats=["最大值", "最小值", "平均值", "累计和"];

//模板列表
var rttemplates;

//报表列表
var rtspreadsheets;

//报表列表
var rtsheets;


//内容
var handscontent;

//报表类型
var reporttype;
//报表时间
var reportdate;
//报表统计项
var reportstats;

var arcData_init;  //database;
var arcData_final; // time and value
var arcData_stats; // max min avg sum of value

var arcData_format = "0.00";

var arcData_interval = ["1h", "24h", "1mo"]; // day month year


//= JSON.parse(localStorage.getItem('rttemplates'));
//= JSON.parse(localStorage.getItem('rtspreadsheets'));
//= JSON.parse(localStorage.getItem('rtsheets'));

//KEY ID
var selecttemplateId;
var selectspreadsheetId;
var selectsheetId;

//localstorage variable
const rtinfor={
    rtsize: '',      //[rows, columns]
    rtdata: '',      //data
    rtmcell: '',     //mergecells
    rtsetting: '',   //settings include font \ color \ align
    rtrowsize: '',   //rowsize :  max, 500
    rtcolsize: ''    //rolsize :  max, 500
}

var saveastype;

//init mock
$(function () {
	/*
    Mock.mock('http://thp.cn/gettemplates',[
            {"key": "day-1", "value": "日报表"},
            {"key": "month-2", "value": "月报表"}
        ]);

    Mock.mock('http://thp.cn/getspreadsheets',[
        {"key": "day-123", "value": "长隆集团电力日报表"},
        {"key": "month-123", "value": "横琴能源公司供冷月报表"}
    ]);
    */
});

$(function () {

    $("#tabs").tabs();  

    //Template
    $("#myTypes").selectpicker({width: "100px"});
    $("#myTemplates").selectpicker({width: "200px"});
    $("#mySheets").selectpicker({width: "200px"});
    
    //init Types
    for (var i = 0; i < 3; i++) {
    	$("#myTypes").append("<option value='" + i + "'>" + rttypes[i] + "</option>");
    }
    $("#myTypes").selectpicker('refresh');
    
    //add click event
    $('#myTypes').on('hidden.bs.select', function (e) {
        
    	//Template list
    	refreshTemplate();
    	
    	//Spreadsheet list
    	refreshSpreadsheet();    	

    	//Sheet list
    	refreshSheet();
    	
    });  
    
    //init Types
    for (var i = 0; i < 3; i++) {
    	$("#report_types").append("<option value='" + i + "'>" + rttypes[i] + "</option>");
    }
    $("#report_types").selectpicker('refresh');
    
    //init Templates List
    refreshTemplate();
    
    //init Spreadsheet List
    refreshSpreadsheet();
    
    //init Sheets List    
    refreshSheet();    

    //$('#mySheets').on('hidden.bs.select', function (e) {        
    //	//Types list
    //	refreshType();    	
    //	
    //});
    
    //////////////////////////////////////////////////////////////////////////
    //toolbar
    $("#myRow").val(startRows);
    
    $("#myCol").val(startCols);
    
    //init selectpicker
    for (var i = 8; i < 100; i++) {
        $("#mySize").append("<option value='" + i + "'>" + i + "</option>");
    }
    $("#mySize").selectpicker({width: "60px"});

    $(".colorStyle input").each(function () {
        $(this).colorpicker();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // the event of handsontable

    container = document.getElementById('dataTable');

    var customRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        // Optionally include `BaseRenderer` which is responsible for adding/removing CSS classes to
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        // ...your custom logic of the renderer
        // $(td).css("text-align", cel[k].align);
        //$(td).css("vertical-align", cel[k].valign);
        //td.style.backgroundColor = 'green';

        for(var i = 0;i < settingArr.length;i++){
            if(settingArr[i].row==row && settingArr[i].col==col){
                $(td)[0].className = settingArr[i].className;
                $(td)[0].style.cssText = settingArr[i].cssText;
                break;
            }
        }
    };

    // Register an alias
    //Handsontable.renderers.registerRenderer('my.customsettings', customRenderer);

    settings={
        //Minimum number of rows. At least that number of rows will be created during initialization.
        minRows: minRows,
        minCols: minCols,
        //This option only has effect in Handsontable constructor and only if data option is not provided
        startRows: startRows,
        startCols: startCols,
        language:'zh-CN',
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        mergeCells: true,
        manualRowResize: true,
        manualRowMove: true,
        manualColumnResize: true,
        manualColumnMove: true,
        //manualColumnFreeze: true,
        comments:false,
        dropdownMenu: true,
        useFormula: true,
        cells: function (row, col, prop) {
            var cellProperties = {};
            cellProperties.renderer = customRenderer;
            return cellProperties;
        },
        rowHeights: function(index) {
            if(rowSizeArr != null) {
                for (var i = 0; i < rowSizeArr.length; i++) {
                    if (rowSizeArr[i].index == index) {
                        return rowSizeArr[i].newSize;
                    }
                }
            }
            //return index * 10;
        },
        colWidths: function(index) {
            if(colSizeArr != null) {
                for (var i = 0; i < colSizeArr.length; i++) {
                    if (colSizeArr[i].index == index) {
                        return colSizeArr[i].newSize;
                    }
                }
            }

            //return index * 10;
        }

        /*
         onChange: function (data, source) {
         if (source === 'loadData') {
         return; //don't show this change in console
         }
         $("#myconsole").text(JSON.stringify(data));
         }
        */

    };

    hot =new Handsontable(container, settings);

    ///////////////////////////////Plugins
//        AutoColumnSize
//        AutoRowSize
//        Autofill
//        ColumnSorting
//        Comments
//        ContextMenu
//        CopyPaste
//        DragToScroll
//        ManualColumnFreeze
//        ManualColumnMove
//        ManualColumnResize
//        ManualRowMove
//        ManualRowResize
//        MergeCells
//        ObserveChanges
//        Search
//        UndoRedo

    ///////////////////////////////Hooks
//        Change: afterChange
//        Render: afterRender, afterRenderer

    //获取所选区域单元格数组
    hot.addHook('afterSelectionEnd', function (r, c, r2, c2, preventScrolling, selectionLayerLevel) {
        // setting if prevent scrolling after selection
        //preventScrolling.value = true;

        selectRangeArr = []; // 所选区域所有单元格数组
        selectRange = hot.getSelected()[0]; // 获取所选区域范围
        //console.log(selectRange);

        var rangeRowArr = []; // 所选区域行数组
        var rangeColArr = []; // 所选区域列数组
        for( var i=selectRange[0];i<selectRange[2]+1;i++ ){
            rangeRowArr.push(i);
        }
        for( var i=selectRange[1];i<selectRange[3]+1;i++ ){
            rangeColArr.push(i);
        }
        for( var i=0;i<rangeRowArr.length;i++ ){
            for( var n=0;n<rangeColArr.length;n++ ){
                var selectRangeCell = { row:rangeRowArr[i],col:rangeColArr[n] };
                selectRangeArr.push(selectRangeCell);
            }
        }

        //R + C
        $('#myInfor').val(hot.getColHeader(c)+hot.getRowHeader(r));

        // 添加表格失去焦点时的当前单元格类
        //$("td").removeClass("currentTd");
        //for( var i=0;i<selectRangeArr.length;i++ ){
        //    var rangeCell = hot.getCell(selectRangeArr[i].row, selectRangeArr[i].col);
        // $(rangeCell).addClass("currentTd");
        //    hot.render();
        //}
    });

    // 获取鼠标点击单元格 当前高亮
    hot.addHook('afterOnCellMouseDown', function (event, cellCoords) {
        Crow = cellCoords.row;
        Ccol = cellCoords.col;
        Ccell = hot.getCell(Crow, Ccol);

        valT = hot.getDataAtCell(Crow,Ccol); // 获取所点单元格值

        $("#myInput").val(valT);

        // 单击任意单元格取消编辑状态
        $(".handsontableInputHolder").css({
            "display":"none"
        });
    });

    //Size
    hot.addHook('afterRowResize', function(currentRow, newSize, isDoubleClick){
        //console.log("RowResize: " + currentRow+ ": " +newSize);
        //save rowSize
        var setCell;
        var x = ifArrSize(rowSizeArr, currentRow);
        if(x>=0)rowSizeArr.splice(x, 1);
        setCell= {  index: currentRow, newSize: newSize};
        rowSizeArr.push(setCell);
    });

    hot.addHook('afterColumnResize', function(currentColumn, newSize, isDoubleClick){
        //console.log("ColumnResize: " + currentColumn+ ": " + newSize);
        //save rowSize
        var setCell;
        var x = ifArrSize(colSizeArr, currentColumn);
        if(x>=0)colSizeArr.splice(x, 1);
        setCell= {  index: currentColumn, newSize: newSize};
        colSizeArr.push(setCell);
    });

    //afterSetCellMeta
    hot.addHook('afterSetCellMeta', function (row, col, key, value) {
        //console.log(key +": " +value + "-" + );
        if(key!="className"){
            return;
        }

        //save className
        var setCell;
        var x = ifArrVal(settingArr, row, col);
        if(x>=0)
        {
            setCell = settingArr[x];
            setCell.className = value;

            settingArr.splice(x, 1);
        }else
        {
            setCell = {  row: row, col: col, className: value, cssText: ''};
        }
        settingArr.push(setCell);
    });

    //多维数组判断是否存在某值
    function ifArrSize(arr, index){
        for(var i = 0;i < arr.length;i++){
            if(arr[i].index==index){
                return i; //存在
            }
        }
        return -1;//不存在
    }

    //多维数组判断是否存在某值
    function ifArrVal(arr, row, col){
        for(var i = 0;i < arr.length;i++){
            if(arr[i].row==row && arr[i].col==col){
                return i; //存在
            }
        }
        return -1;//不存在
    }

    //同步input 与 cell
    $("#myInput").keyup(function(){
        valT = $(this).val();
        if(selectRangeArr.length>0){
            for( var i=0;i<selectRangeArr.length;i++ ){
                hot.setDataAtCell(selectRangeArr[i].row, selectRangeArr[i].col, valT)
            }
        }
    });

    $("#myRow").blur(function(){
        var newRows = parseInt($(this).val());
        var currentRows = hot.countRows();

        if(newRows<minRows)
        {
            $(this).val(minRows);
            newRows = minRows;
        }

        if(newRows ==currentRows )return;

        //See grid.alter for possible values: "insert_row", "insert_col", "remove_row", "remove_col"
        //alter(action, index, amount, source, keepEmptyRows)
        if(newRows>currentRows)
        {
            hot.alter('insert_row', null, newRows-currentRows);
        }else
        {
            hot.alter('remove_row', null, currentRows-newRows);
        }
    });

    $("#myCol").blur(function(){
        var newCols = parseInt($(this).val());
        var currentCols = hot.countCols();

        if(newCols<minCols) {
            $(this).val(minCols);
            newCols = minCols;
        }

        if(newCols ==currentCols )return;

        if(newCols>currentCols)
        {
            hot.alter('insert_col', null, newCols-currentCols);
        }else
        {
            hot.alter('remove_col', null, currentCols-newCols);
        }


    });

    // 修改单元格样式
    //setCellMeta
    //key: cellClass, bkColor, ftColor, bdColor
    // 修改所选区域所有单元格样式并赋予属性
    function setCellStyle(key, val)
    {
        var toggleSwitch = true;

        var changeCellStyle = function(){

            //bold italic decoration: need normal
            if(key=="font-weight" && $(rangeCell).css("font-weight")=="700") val="400";
            if(key=="font-style" && $(rangeCell).css("font-style")=="italic") val="normal";
            if(key=="text-decoration" && $(rangeCell).css("text-decoration").indexOf("underline")>=0) val="none";

            switch(key) {
                case "font-size":
                    $(rangeCell).css({"font-size": val});
                    break;
                case "font-weight":
                    $(rangeCell).css({"font-weight": val});
                    break;
                case "font-style":
                    $(rangeCell).css({"font-style": val});
                    break;
                case "text-decoration":
                    $(rangeCell).css({"text-decoration": val});
                    break;
                case "background":
                    $(rangeCell).css({"background": val});
                    break;
                case "color":
                    $(rangeCell).css({"color": val});
                    break;
                case "border":
                    $(rangeCell).css({"border": val});
                    break;
                default :
                    break;
            }

        };

        for( var i=0;i<selectRangeArr.length;i++ ){
            var rangeRow = selectRangeArr[i].row;
            var rangeCol = selectRangeArr[i].col;
            var rangeCell = hot.getCell(rangeRow, rangeCol);
            var checkMergeCell = $(rangeCell).attr("rowspan");

            if( checkMergeCell != undefined ){
                if( toggleSwitch ){
                    changeCellStyle();
                    toggleSwitch = false;
                }else{
                    continue;
                }
            }else{
                changeCellStyle();
            }

            //save cssText
            var setCell;
            var rangeSet = $(rangeCell)[0].style.cssText;
            //console.log($(rangeCell)[0].style.cssText);

            var x = ifArrVal(settingArr, rangeRow, rangeCol);
            if(x>=0)
            {
                setCell=settingArr[x];
                setCell.cssText = rangeSet;

                settingArr.splice(x, 1);

            }else {
                setCell= {  row: rangeRow, col: rangeCol, className: '', cssText: rangeSet };
            }

            settingArr.push(setCell);
        }
    }

    //Font Size
    $('#mySize').on('hidden.bs.select', function (e) {
        // 修改单元格文本大小
        var val = $(this).val();
        setCellStyle("font-size", val+"pt");
    });

    $("#myBold").click(function(e){
        //normal bold bolder lighter 100-200...800-900 inherit
        //400==normal 700=bold
        setCellStyle("font-weight", "700");
    });

    $("#myItalic").click(function(e){
        //normal italic oblique
        setCellStyle("font-style", "italic");
    });

    $("#myUnderline").click(function(e){
        //none underline overline line-through blink inherit
        setCellStyle("text-decoration", "underline");
    });

    //Color blur
    $(".colorStyle input").blur(function(){
        var val = $(this).val();
        var _index = $(this).index();

        $(this).css("cssText", "background:"+val+"!important;color:"+val+"!important;");

        if( _index == 1 ){
            setCellStyle("background", val);
        }
        if( _index == 3 ){
            setCellStyle("color", val);
        }
        if( _index == 5 ){
            setCellStyle("border", "solid 1px "+val);
        }
    });

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the event of buttons  for Template editor

//refresh template list
function refreshTemplate()
{
    $("#myTemplates").empty();    
    
    var val = $("#myTypes").val();

    $.ajax({
        type:"post",
        url:"/THPBuilder/getAllTemplates",
        async:true,
        success:function(data){

            //console.log(data);
        	
        	datajson = $.parseJSON(data);
            
            rttemplates=datajson.rows;
            
            $("#myTemplates").append("<option value='-1'>请选择...</option>"); 
            
            //init templates list
            rttemplates.forEach(function(value, index, array){
                //第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
                //code something
            	if (parseInt(val)== value.templateType)
        		{
                    $("#myTemplates").append("<option value='"+ index +"'>"+ value.templateName+"</option>");        		
        		}
            });

            $("#myTemplates").selectpicker('refresh');
            
            //console.log(idata);
        }
    });
}


//load template
function importTemplate()
{
	selecttemplateId = $('#myTemplates').val();

	if(selecttemplateId==undefined ||selecttemplateId==null ||selecttemplateId == -1)
	{
		alert("请选择报表模板！");
		return;	
	}
	
    //load data
    //var data1 = JSON.parse(localStorage.getItem('rtinfor'));
    var localtemplate = rttemplates[selecttemplateId];
	handscontent = JSON.parse(localtemplate.templateContent);

    if (handscontent!=null)
    {
        //data
        rtdatas = handscontent.rtdata;
        
        LoadData();

        /*
        var sRows = rtdatas.length;
        var sCols = rtdatas[0].length;
        $("#myRow").val(sRows);
        $("#myCol").val(sCols);

        //set mergecells
        var inst_mergeCells = hot.getPlugin("mergeCells");
        data1.rtmcell.forEach(function (value, index, array) {
            inst_mergeCells.merge(value.row, value.col, value.row + value.rowspan - 1, value.col + value.colspan - 1);
        });

        //Setting
        settingArr = data1.rtsetting;

        //Size
        rowSizeArr =  data1.rtrowsize?data1.rtrowsize:[];
        colSizeArr = data1.rtcolsize?data1.rtcolsize:[];        

        hot.loadData(rtdatas);
        */
        
        //stats
        var val = localtemplate.templateStats;
        
        setstats(val);
        
        $("#myStarttime").val(localtemplate.templateStartTime);
        $("#myEndtime").val(localtemplate.templateEndTime);

		$("#txt_name").val(localtemplate.templateName+"new");
        
    }

    /*
     hot.updateSettings({
     cells: [ {
     renderer: 'my.customsettings'
     }]
     });
     */

    // Access to the Comments plugin instance:
    //const commentsPlugin = hot.getPlugin('comments');

    // Manage comments programmatically:
    //commentsPlugin.setCommentAtCell(1, 6, 'Comment contents');
    //commentsPlugin.showAtCell(3, 1);
    //commentsPlugin.removeCommentAtCell(1, 6);

    //cells: function (row, col, prop) {
    //var cellProperties = {};
    //var visualRowIndex = this.instance.toVisualRow(row);
    //var visualColIndex = this.instance.toVisualColumn(col);
    //cellProperties.readOnly = true;
    //cellProperties.className = "htCenter";
    //return cellProperties;
    //}

//        //delete key
//        localStorage.removeItem('key');
//        //delete all
//        localStorage.clear();
//        //listener
//        window.addEventListener('storage', function (e) {
//            console.log('key', e.key);
//            console.log('oldValue', e.oldValue);
//            console.log('newValue', e.newValue);
//            console.log('url', e.url);
//        });

}

//save template
function saveTemplate()
{
	if(selecttemplateId==undefined ||selecttemplateId==null ||selecttemplateId == -1)
	{
		alert("请选择报表模板！");
		return;	
	}
	
	if(window.confirm('确定更新当前报表模板吗？'))
	{	    
		saveInfor();
	    
		saveastype = "template";		
        
        saveToSQL();        
	}
    
}

function deleteTemplate()
{	
	if(selecttemplateId==undefined ||selecttemplateId==null ||selecttemplateId == -1)
	{
		alert("请选择报表模板！");
		return;	
	}
	
	if(window.confirm('确定删除当前报表模板吗？'))
	{
	    $.ajax({
	        type:"post",
	        url:"/THPBuilder/deleteTemplate",
	        data: {templateid: rttemplates[selecttemplateId].templateId},
			dataType : 'json',
	        async:true,
	        success:function(data){	
	        	
	            //console.log(data); 

	        	refreshTemplate();  
	            
	            hot.clear();
	        	
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	            
	        }
	    });
	
	}
	
}

//print template
function printTemplate()
{
    var mode = 'iframe';
    var close = false;
    var extraCss = "";
    var print = "";
    var keepAttr = [];
    var headElements = "";

    var options = {
        mode : mode,
        popClose : close,
        extraCss : extraCss,
        retainAttr : keepAttr,
        extraHead : headElements
    };

//            hot.updateSettings({
//                rowHeaders: false,
//                colHeaders: false
//            });

    $("#dataTable").printArea(options);

    //pro
    //var hiddenRowsPlugin = hot.getPlugin('hiddenRows');
    //hiddenRowsPlugin.hideRows(9);
    //hot.render();

//            hot.updateSettings({
//                rowHeaders: true,
//                colHeaders: true
//            });

}



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the event of buttons for Spreadsheet editor

// refresh Spreadsheet list
function refreshSpreadsheet() {
	$("#mySpreadsheets").empty();
	
	var val = $("#myTypes").val();

	$.ajax({
		type : "post",
		url : "/THPBuilder/getAllSheets",
		async : true,
		success : function(data) {

			// console.log(data);

			datajson = $.parseJSON(data);

			rtspreadsheets = datajson.rows;

			$("#mySpreadsheets").append("<option value='-1'>请选择...</option>");

			// init templates list
			rtspreadsheets.forEach(function(value, index, array) {
				// 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
				// code something
				if (parseInt(val) == value.sheetType) {
					$("#mySpreadsheets").append(
							"<option value='" + index + "'>"
									+ value.sheetName + "</option>");
				}
			});

			$("#mySpreadsheets").selectpicker('refresh');

			// console.log(idata);
		}
	});
}

// load Spreadsheet
function importSpreadsheet() {
	selectspreadsheetId = $('#mySpreadsheets').val();

	if (selectspreadsheetId == undefined || selectspreadsheetId == null
			|| selectspreadsheetId == -1) {
		alert("请选择报表模板！");
		return;
	}

	// load data
	// var data1 = JSON.parse(localStorage.getItem('rtinfor'));
	var localspreadsheet = rtspreadsheets[selectspreadsheetId];
	handscontent = JSON.parse(localspreadsheet.sheetContent);

	if (handscontent != null) {
		
		// data
		rtdatas = handscontent.rtdata;
		
		LoadData();
		
		/*
		var sRows = rtdatas.length;
		var sCols = rtdatas[0].length;
		$("#myRow").val(sRows);
		$("#myCol").val(sCols);

		// set mergecells
		var inst_mergeCells = hot.getPlugin("mergeCells");
		data1.rtmcell.forEach(function(value, index, array) {
			inst_mergeCells.merge(value.row, value.col, value.row
					+ value.rowspan - 1, value.col + value.colspan - 1);
		});

		// Setting
		settingArr = data1.rtsetting;

		// Size
		rowSizeArr = data1.rtrowsize ? data1.rtrowsize : [];
		colSizeArr = data1.rtcolsize ? data1.rtcolsize : [];

		hot.loadData(rtdatas);
		*/
		

		// stats
		var val = localspreadsheet.sheetStats;
		
		setstats(val);

		$("#myStarttime").val(localspreadsheet.sheetStartTime);
		$("#myEndtime").val(localspreadsheet.sheetEndTime);
		
		$("#txt_name").val(localspreadsheet.sheetName+"new");

	}

	/*
	 * hot.updateSettings({ cells: [ { renderer: 'my.customsettings' }] });
	 */

	// Access to the Comments plugin instance:
	// const commentsPlugin = hot.getPlugin('comments');
	// Manage comments programmatically:
	// commentsPlugin.setCommentAtCell(1, 6, 'Comment contents');
	// commentsPlugin.showAtCell(3, 1);
	// commentsPlugin.removeCommentAtCell(1, 6);
	// cells: function (row, col, prop) {
	// var cellProperties = {};
	// var visualRowIndex = this.instance.toVisualRow(row);
	// var visualColIndex = this.instance.toVisualColumn(col);
	// cellProperties.readOnly = true;
	// cellProperties.className = "htCenter";
	// return cellProperties;
	// }
	// //delete key
	// localStorage.removeItem('key');
	// //delete all
	// localStorage.clear();
	// //listener
	// window.addEventListener('storage', function (e) {
	// console.log('key', e.key);
	// console.log('oldValue', e.oldValue);
	// console.log('newValue', e.newValue);
	// console.log('url', e.url);
	// });
}


// save Spreadsheet
function saveSpreadsheet() {
	if (selectspreadsheetId == undefined || selectspreadsheetId == null
			|| selectspreadsheetId == -1) {
		alert("请选择报表！");
		return;
	}

	if (window.confirm('确定更新当前报表模板吗？')) {
		saveInfor();

		saveastype = "spreadsheet";

		saveToSQL();
	}

}

//delete Spreadsheet
function deleteSpreadsheet() {
	if (selectspreadsheetId == undefined || selectspreadsheetId == null
			|| selectspreadsheetId == -1) {
		alert("请选择报表！");
		return;
	}

	if (window.confirm('确定删除当前报表模板吗？')) {
		$.ajax({
			type : "post",
			url : "/THPBuilder/deleteSheet",
			data : {
				sheetid : rtspreadsheets[selectspreadsheetId].sheetId
			},
			dataType : 'json',
			async : true,
			success : function(data) {

				//console.log(data);

				refreshSpreadsheet();

				hot.clear();

				$("#myOKLabel").text("系统提示");
				$('#myOK').modal();
			}
		});

	}

}

// print Spreadsheet
function printSpreadsheet() {
	var mode = 'iframe';
	var close = false;
	var extraCss = "";
	var print = "";
	var keepAttr = [];
	var headElements = "";

	var options = {
		mode : mode,
		popClose : close,
		extraCss : extraCss,
		retainAttr : keepAttr,
		extraHead : headElements
	};

	// hot.updateSettings({
	//rowHeaders: false,
	//colHeaders: false
	//});

	$("#dataTable").printArea(options);

	//pro
	//var hiddenRowsPlugin = hot.getPlugin('hiddenRows');
	//hiddenRowsPlugin.hideRows(9);
	//hot.render();

	//hot.updateSettings({
	//rowHeaders: true,
	//colHeaders: true
	//});

}

function saveAsSheet()
{
	saveastype = "sheet";
	
	saveInfor();

    $("#myModalLabel").text("输入信息：");

    $('#myModal').modal();   
}


///////////////////////////////////////////////////////////////////////////////////////////
// public function for template and spreadsheet shared

//clear content
function clearContent()
{
    if(window.confirm('你确定清空吗？')){
    	
    	selecttemplateId = -1;   
    	
    	selectspreadsheetId = -1;    	
    	
        //alert("确定");
        classArr = [];
        settingArr = [];

        hot.clear();
    }
}

//save template
function saveAsTemplate()
{
	saveastype = "newtemplate";	

	saveInfor();

    $("#myModalLabel").text("输入信息：");
    $('#myModal').modal();

}

function saveAsSpreadsheet()
{
	saveastype = "newspreadsheet";
	
	saveInfor();

    $("#myModalLabel").text("输入信息：");

    $('#myModal').modal();   

}

function saveInfor()
{
	//size
    rtinfor.rtsize = [hot.countRows(), hot.countCols()];

    //data
    rtinfor.rtdata=hot.getData();

    //get mergeCells
    var inst_mergeCells = hot.getPlugin("mergeCells");
    var arr_mergeCells = inst_mergeCells.mergedCellsCollection.mergedCells;
    rtinfor.rtmcell = arr_mergeCells;

    //settings
    rtinfor.rtsetting = settingArr;

    //size
    rtinfor.rtrowsize = rowSizeArr;
    rtinfor.rtcolsize = colSizeArr;    

    //localStorage.setItem('rtinfor', JSON.stringify(rtinfor)); 

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the event of buttons for modal dialog

function saveToSQL()
{	
	if (saveastype=="template")
	{	
		//Template  ----> Template 
	    rttemplates[selecttemplateId].templateContent = JSON.stringify(rtinfor);		  
        
        rttemplates[selecttemplateId].templateStats = getstats();
        rttemplates[selecttemplateId].templateStartTime =$("#myStarttime").val()
        rttemplates[selecttemplateId].templateEndTime =$("#myEndtime").val();	
        
	    $.ajax({
	        type:"post",
	        url:"/THPBuilder/updateTemplate",
	        data: rttemplates[selecttemplateId],
			dataType : 'json',
	        async:true,
	        success:function(data){	
	            //console.log(data); 
	        	
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	            
	        }
	    });	 
		
	}else if (saveastype=="newtemplate")
	{
		//Template  ----> new Template 
		var newname =$("#txt_name").val().trim();
		if(newname==undefined ||newname==null || newname=="" )
		{
			alert("请输入名称！");	
			return;
		}		
		
		var newtemplate = rttemplates[selecttemplateId];

		//newtemplate.proId; 
		
		newtemplate.templateKey = NewGuid();
		
		newtemplate.templateType = $("#report_types").val();
		
		newtemplate.templateName = newname;
		
		newtemplate.templateContent = JSON.stringify(rtinfor);
		          
        newtemplate.templateStats = getstats();
        newtemplate.templateStartTime =$("#myStarttime").val()
        newtemplate.templateEndTime =$("#myEndtime").val();  
        newtemplate.templateCreateTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        
        //
        $.ajax({
	        type:"post",
	        url:"/THPBuilder/insertTemplate",
	        data: newtemplate,
			dataType : 'json',
	        async:true,
	        success:function(data){	
	            //console.log(data);   

	        	refreshTemplate();  
	            
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	 
	        }
	    });	 
        
	
	}else if (saveastype=="spreadsheet")
	{
		//Spreadsheet  ----> Spreadsheet 
		rtspreadsheets[selectspreadsheetId].sheetContent = JSON.stringify(rtinfor);
		
        rtspreadsheets[selectspreadsheetId].sheetStats = getstats();
        rtspreadsheets[selectspreadsheetId].sheetStartTime =$("#myStarttime").val()
        rtspreadsheets[selectspreadsheetId].sheetEndTime =$("#myEndtime").val(); 
        
        //
        $.ajax({
	        type:"post",
	        url:"/THPBuilder/updateSheet",
	        data: rtspreadsheets[selectspreadsheetId],
			dataType : 'json',
	        async:true,
	        success:function(data){	
	            //console.log(data);   

	        	refreshSpreadsheet();  
	            
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	 
	        }
	    });	
        
	}else if (saveastype=="newspreadsheet")
	{
		//Template  ----> new Spreadsheet 
		var newname =$("#txt_name").val().trim();
		if(newname==undefined ||newname==null || newname=="" )
		{
			alert("请输入名称！");	
			return;
		}		
		
		var newtemplate = rttemplates[selecttemplateId];
		
		//json data
		var newspreadsheet={};
		
		//newspreadsheet.sheetId = "1";
		newspreadsheet.proId = newtemplate.proId;
		newspreadsheet.sheetKey = NewGuid();
		newspreadsheet.sheetType = $("#report_types").val();
		newspreadsheet.sheetName = newname;
		newspreadsheet.sheetContent = JSON.stringify(rtinfor);		
        
        newspreadsheet.sheetStats = getstats();
        newspreadsheet.sheetStartTime =$("#myStarttime").val()
        newspreadsheet.sheetEndTime =$("#myEndtime").val();  
        newspreadsheet.sheetCreateTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        
        //
        $.ajax({
	        type:"post",
	        url:"/THPBuilder/insertSheet",
	        data: newspreadsheet,
			dataType : 'json',
	        async:true,
	        success:function(data){	
	            //console.log(data);   

	        	//refreshSpreadsheet(); 
	            
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	 
	        }
	    });	  		
		
	}else if (saveastype=="sheet")
	{
		//Spreadsheet  ----> new Spreadsheet 
		var newname =$("#txt_name").val().trim();
		if(newname==undefined ||newname==null || newname=="" )
		{
			alert("请输入名称！");	
			return;
		}		
		
		var newsheet = rtspreadsheets[selectspreadsheetId];
		
		//newsheet.sheetId = "1";
		//newsheet.proId;
		newsheet.sheetKey = NewGuid();
		newsheet.sheetType = $("#report_types").val();
		newsheet.sheetName = newname;
		newsheet.sheetContent = JSON.stringify(rtinfor);		
        
		newsheet.sheetStats = getstats();
		newsheet.sheetStartTime =$("#myStarttime").val()
        newsheet.sheetEndTime =$("#myEndtime").val();  
		newsheet.sheetCreateTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        
        //
        $.ajax({
	        type:"post",
	        url:"/THPBuilder/insertSheet",
	        data: newsheet,
			dataType : 'json',
	        async:true,
	        success:function(data){	
	            //console.log(data);   

	        	refreshSpreadsheet(); 
	            
	    	    $("#myOKLabel").text("系统提示");
	    	    $('#myOK').modal();	 
	        }
	    });	  
		
	}else 
	{
	
	
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public function


function setstats(val)
{
    val = (val+"0000").substr(0,4);
    $("#myMax").prop("checked", val.substr(0,1)=="1"? true: false);
    $("#myMin").prop("checked", val.substr(1,1)=="1"? true: false);
    $("#myAvg").prop("checked", val.substr(2,1)=="1"? true: false);
    $("#mySum").prop("checked", val.substr(3,1)=="1"? true: false);
}

function getstats()
{
    var valmax = $("#myMax").prop("checked")==true?"1":"0";
    var	valmin = $("#myMin").prop("checked")==true?"1":"0";
    var	valavg = $("#myAvg").prop("checked")==true?"1":"0";
    var	valsum = $("#mySum").prop("checked")==true?"1":"0"; 
    return valmax.toString() + valmin.toString() + valavg.toString()+ valsum.toString();

}

//guid
function S4() 
{   
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
} 

function NewGuid() 
{   
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());   
}


//Date
//author: meizz
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
//let time1 = new Date().Format("yyyy-MM-dd");
//let time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
Date.prototype.Format = function (fmt) { 
	let o = {
     "M+": this.getMonth() + 1, //月份
     "d+": this.getDate(), //日
     "h+": this.getHours(), //小时
     "m+": this.getMinutes(), //分
     "s+": this.getSeconds(), //秒
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
     "S": this.getMilliseconds() //毫秒
     };
	if (/(y+)/.test(fmt)) 
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) 
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	
	return fmt;
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the event of buttons for Viewer Sheet

// refresh Sheet list
function refreshSheet()
{
	$("#mySheets").empty();
	
	var val = $("#myTypes").val();
	
	refreshDatepicker(val);
	
	$.ajax({
		type : "post",
		url : "/THPBuilder/getAllSheets",
		async : true,
		success : function(data) {

			// console.log(data);
			datajson = $.parseJSON(data);

			rtsheets = datajson.rows;

			$("#mySheets").append("<option value='-1'>请选择...</option>");

			// init spreadsheet list
			rtsheets.forEach(function(value, index, array) {
				// 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
				// code something
				if (parseInt(val) == value.sheetType) {
					$("#mySheets").append(
							"<option value='" + index + "'>" + value.sheetName
									+ "</option>");
				}
			});

			$("#mySheets").selectpicker('refresh');
		}
	});
}


//refresh datepicker
function refreshDatepicker(type) {	
	if(type ==0 )
	{		
		$(".selectdate").show();
		$(".selectmonth").hide();
		$(".selectyear").hide();		
	}else if(type == 1)
	{		
		$(".selectdate").hide();
		$(".selectmonth").show();
		$(".selectyear").hide();	
	
	}else if(type == 2)
	{		
		$(".selectdate").hide();
		$(".selectmonth").hide();
		$(".selectyear").show();		
	}else
	{
	
	}

}

//refresh Types list
function refreshType() {	
	
	/*
	var val = $("#mySheets").val();
	
	console.log(val);
	
	var localtype = rtspreadsheets[val].sheetType;

	$("#myTypes").val(localtype);
	$("#myTypes").selectpicker('refresh');	
	*/
}

// display Sheet
// 加载报表模板
// 获取数据
// 修改rtdata
// 显示报表
function viewSheet() {
	
	selectsheetId = $('#mySheets').val();

	if (selectsheetId == undefined || selectsheetId == null
			|| selectsheetId == -1) {
		alert("请选择报表！");
		return;
	}
	
	reporttype = $('#myTypes').val();
	
	getDatepicker();

	// load data
	// var data1 = JSON.parse(localStorage.getItem('rtinfor'));

	var localsheet = rtsheets[selectsheetId];
	handscontent = JSON.parse(localsheet.sheetContent);

	if (handscontent != null) {
		
		// data
		rtdatas = handscontent.rtdata;
		
		/////////////////////////////////////////////////////////////////
		//get tags
		var tags = viewGetTags(rtdatas);
		
		//console.log(tags);
		
		/////////////////////////////////////////////////////////////////
		//get times
		var times = viewGetTimes(reportdate, localsheet.sheetType, localsheet.sheetStartTime, localsheet.sheetEndTime);
		
		//console.log(times);
		
		////////////////////////////////////////////////////////////////
		//get stat
		reportstats= localsheet.sheetStats;
		
		////////////////////////////////////////////////////////////////
		//get archive data
		var interval ="1h";
		if(reporttype!=null) interval=arcData_interval[reporttype];
		
		viewGetArchiveData(tags, times, interval);
		
	}
	
}
	
	
function viewUpdateSheet(arcData)
{
	/////////////////////////////////////////////////////////////////
	//get matrix data
	
	arcData_final = viewGetMatrixData(); // time and value
	arcData_stats = viewGetStatsData(); // max min avg sum of value

	// console.log(arcData_final);
	// console.log(arcData_stats);	
	
	//////////////////////////////////////////////////////////////////////////
	//update rtdatas
	
	var lines = arcData[0].data.length;
	viewUpateRTData(lines);	
	
	///////////////////////////////////////////////////////////////////////
	//load data
	
	LoadData();
	
	
}

// print Sheet
function printSheet() {
	var mode = 'iframe';
	var close = false;
	var extraCss = "";
	var print = "";
	var keepAttr = [];
	var headElements = "";

	var options = {
		mode : mode,
		popClose : close,
		extraCss : extraCss,
		retainAttr : keepAttr,
		extraHead : headElements
	};

	// hot.updateSettings({
	// rowHeaders: false,
	// colHeaders: false
	// });

	$("#dataTable").printArea(options);

	// pro
	// var hiddenRowsPlugin = hot.getPlugin('hiddenRows');
	// hiddenRowsPlugin.hideRows(9);
	// hot.render();

	// hot.updateSettings({
	// rowHeaders: true,
	// colHeaders: true
	// });

}

// export Sheet
function exportSheet() {
	// JSONToCSVConvertor(hot.getData(), hot.getSettings().colHeaders)
	// function JSONToCSVConvertor(JSONData, colHeaders) {
	// }
	var JSONData = hot.getData();
	var colHeaders = hot.getSettings().colHeaders;

	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData, CSV = '', row = "", fileName = "handsontable.csv";

	// Put the header (based on the colHeaders of my table in my example)
	/*
	 * for (var index in colHeaders) { row += colHeaders[index] + ';'; } row =
	 * row.slice(0, -1); CSV += row + '\r\n';
	 */

	// Adding each rows of the table
	for (var i = 0; i < arrData.length; i++) {
		var row = "";
		for ( var index in arrData[i]) {
			if (arrData[i][index] != null) {
				row += arrData[i][index] + ',';
			}
		}
		row = row.slice(0, -1);
		CSV += row + '\r\n';
	}

	if (CSV == '') {
		alert("Invalid data");
		return;
	}

	// Downloading the new generated csv.
	// For IE >= 9
	if (window.navigator.msSaveOrOpenBlob) {
		var fileData = [ CSV ];
		blobObject = new Blob(fileData);
		window.navigator.msSaveOrOpenBlob(blobObject, fileName);
	} else {
		// For Chome/Firefox/Opera
		//ascii、ansi(gb2312/big5/...)、unicode(utf8/16/32/...)
		//var uri = 'data:text/csv;charset=utf-8,' + CSV;   //escape(CSV)
		//\ufeff  解决中文乱码显示的问题
		var uri = 'data:text/csv;charset=utf-8,\ufeff'
				+ encodeURIComponent(CSV); //encodeURI

		var link = document.createElement("a");
		link.href = uri;

		link.style = "visibility:hidden";
		link.download = fileName;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}


//get datapicker result
function gotoDate(ev) {	
	//reportdate = ev.date;	
	//console.log(ev.date);	
} 

//get datepicker value
function getDatepicker()
{
	reporttype = $('#myTypes').val();
	
	if(reporttype ==0 )
	{
		reportdate = $(".selectdate").val();
	}else if(reporttype == 1)
	{		
		reportdate = $(".selectmonth").val();	
	}else if(reporttype == 2)
	{		
		reportdate = $(".selectyear").val();		
	}
}


///////////////////////////////////////////////////////////////////////////////////////////
//big data restful 
// 1525943820

//创建补0函数
function p(s) {
    return s < 10 ? '0' + s : s;
}

//时间格式化
function formatDate(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + p(date.getHours()) + ":" + p(date.getMinutes()) + ":" + p(date.getSeconds());
}

//获取1970.1.1开始的毫秒数
//Date.parse("2018-8-14");  ---> 1534176000000
//Date.parse("2018-8-15");  ---> 1534262400000
//Date.parse(new Date());

//获取当前月份的总天数
function getDaysOfMonth(date){
	
	date = new Date(date);
	
    //将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth()+1);
    
    //将当前的日期置为0，
    date.setDate(0);
    
    //再获取天数即取上个月的最后一天的天数
    var days=date.getDate();
    
    return days;
    
    // month 取自然值，从 1-12 而不是从 0 开始
    //return new Date(year, month, 0).getDate()

    // 如果 month 按 javascript 的定义从 0 开始的话就是
    // return new Date(year, month + 1, 0).getDate()
    
}

//获取上一年或下一年
function getYear(date, n)
{
	var now = new Date(date); 
	
	now.setFullYear(now.getFullYear()+1*n);	
	
	return now;
}

//获取当前日期及计算当前日期\月是今年的第多少天
function getDays(year, month) {
	
	var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var result = 0;
	for ( var i = 0; i < month; i++) {
		result += dateArr[i];
	}
	
	//result += day;
	
	//判断是否闰年
	if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
		result += 1;
	}

	return result;
}

//时间格式化
function formatRTTime(dt)
{
	var dt_final;
	
	if(reporttype==0)dt_final=new Date(dt).Format("hh 时") ;
	if(reporttype==1)dt_final=new Date(dt).Format("dd 日") ;
	if(reporttype==2)dt_final=new Date(dt).Format("MM 月") ;
	
	return dt_final;
}

//数据格式化
function formatRTValue(value, dataFormat)
{
	if(dataFormat==null) dataFormat="0.000";
	
    //format value by numeral.mim.js
    return numeral(value).format(dataFormat);
    
}

//判断是否是数字
function isRealNum(val){
	
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}           


function viewGetTags()
{
	var tags = new Array();
	
	rtdatas.forEach(function(value, index, array) {
		// 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
		// code something
		// console.log(index, value);

		if (value[0] == 'tag') {
			// tag
			value.forEach(function(cvalue, cindex, carray) {
				tags[cindex] = carray[cindex];
			});					
		}
	});
	
	return tags;	
}

function viewGetTimes(selecttime, type, starttime, endtime)
{
	//startime, endtime
	var times= [];	
	
	//闭半开区间, 包括开始时间，不包括结束时间
	starttime = parseInt(starttime);
	endtime = parseInt(endtime);
	
	/////////////////////////////////////
	//2018-8-14
	if(type == 0)
	{
		//selecttime: yyyy-mm-dd
		selecttime = selecttime + " 0:0:0";
		
		if(starttime==0 && endtime==0)
		{
			//0-0
			//starttime
			times.push(new Date(Date.parse(selecttime) ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + 24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );		
		}else if(starttime<endtime)
		{
			//0-1, 0-8,8-16,16-23, 1-23, 3-20
			//starttime
			times.push(new Date(Date.parse(selecttime) + starttime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + endtime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );	
			
		}else if(starttime>=endtime)
		{
			if ( endtime>=16)
			{
				//16-16, 20-20, 20-16
				//starttime
				times.push(new Date(Date.parse(selecttime) - 24*60*60*1000 + starttime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
				//endtime
				times.push(new Date(Date.parse(selecttime) + endtime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			
			} else if(endtime<16)
			{
				//16-0, 8-8, 10-8, 
				//10-10.... special
				//starttime
				times.push(new Date(Date.parse(selecttime) + starttime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
				//endtime
				times.push(new Date(Date.parse(selecttime) + 24*60*60*1000 + endtime*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			
			}
		}
	}

	/////////////////////////////////////
	//2018-8
	if(type == 1)
	{
		//selecttime: yyyy-mm
		selecttime = selecttime + "-1 0:0:0";
		
		if( starttime==1 && endtime==1 )
		{
			//7.1-8.1
			//starttime
			times.push(new Date(Date.parse(selecttime)).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + getDaysOfMonth(Date.parse(selecttime))*24*60*60*1000).Format("yyyy-MM-dd hh:mm:ss") );			
		
		}else if(starttime<endtime)
		{
			//7.1-7.20, 7.10- 7.20
			//starttime
			times.push(new Date(Date.parse(selecttime) + starttime*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + (endtime-starttime+1)*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
		
		}else if(starttime>=endtime)
		{
			//7.20-8.19,7.10-8.9
			//starttime
			times.push(new Date(Date.parse(selecttime) + starttime*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + getDaysOfMonth(Date.parse(selecttime))*24*60*60*1000 + endtime*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );		
		}
	}
	

	/////////////////////////////////////
	//2018
	if(type == 2)
	{		
		//selecttime: yyyy
		selecttime = selecttime + "-1-1 0:0:0";
		
		if(starttime==1 && endtime==1)
		{
			//1-1
			//starttime
			times.push(new Date(Date.parse(selecttime)).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(getYear(Date.parse(selecttime),1)).Format("yyyy-MM-dd hh:mm:ss") );
		
		}else if(starttime < endtime)
		{
			//1-12, 2-6
			//starttime
			times.push(new Date(Date.parse(selecttime) + getDays(new Date(Date.parse(selecttime)).getFullYear(), starttime-1)*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			times.push(new Date(Date.parse(selecttime) + getDays(new Date(Date.parse(selecttime)).getFullYear(), endtime-1)*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );	
			
		}else if(starttime >= endtime)
		{
			//9-8, 6-5, 12-1
			//starttime
			times.push(new Date(Date.parse(selecttime) + getDays(new Date(Date.parse(selecttime)).getFullYear(), starttime-1)*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );
			//endtime
			var nextyear =getYear(Date.parse(selecttime), 1);
			times.push(new Date(Date.parse(nextyear) + getDays(nextyear.getFullYear(), endtime-1)*24*60*60*1000 ).Format("yyyy-MM-dd hh:mm:ss") );		
		}
	}
	
	return times;

}

function viewGetArchiveData(tags, times, interval)
{	
    //var recordids=[63,67,71,75];
	var recordids=[];
    
	//tags ===>> recordids
	for(var index in tags){
		if(isRealNum(tags[index])) recordids.push(parseInt(tags[index]));
		//if(!isNaN(tags[index])) recordids.push(parseInt(tags[index]));
	}
	
	if(recordids.length ==0)
	{
		alert("无有效的数据测点绑定,请配置报表测点！！！");
		return;
	}
	
    
    var param = {
    		"begintime": times[0],
    		"endtime": times[1],
    		"id": recordids,
    		"interval": interval,
    		"mode":2,
    		"tbname":"hdr_analog"
    	};
    
    var contentStr = JSON.stringify(param);
    
    $('#myProgressbar').modal('show');
    
    //mxUtils.post(defaults.archServerURL, contentStr, function(req) {
    //success：ajax调用成功调用的函数，error：失败调用的函数，complete：不管成功还是失败都会调用的函数。 
    var url = defaults.archServiceURL+"/valuesbytmrange";
    $.ajax({
		type : "post",
		url : url,
        data: contentStr,
		dataType : 'json',
		async : true,
		success : function(req) {    

		    $('#myProgressbar').modal('hide');
		    
	    	if(req && req.replyCode.code ==0 )
	    	{
	    		arcData_init=[];
	    		
		        var result = req.result;
	            for(var index in result) 
	            {
	            	var arcitem ={};
	            	
	                var item = result[index];
	                
	                arcitem.count = item.count;
	                arcitem.recordid = item.id;	 
	                
                	var data=[];
                	
                    for (var j=0; j< item.count; j++) 
                    {
                    	var dataitem ={};
                    	
                    	dataitem.time = formatRTTime(item.data.time[j]*1000) ;
                    	dataitem.value = item.data.val[j];
                    	dataitem.quality = item.data.QTY[j];
                    	dataitem.state = item.data.stat[j];
                        
                        //formatpointsData
                        data.push(dataitem);
                    }
                    
                    arcitem.data = data;
                    
                    arcData_init.push(arcitem);
	            }
	
		        viewUpdateSheet(arcData_init);	        
		    }else
		    {
		    	alert("访问错误，错误代码：" + req.replyCode.code);
		    }
	    	
		},
		error: function(req) {
			alert("无法访问,请联系系统管理员!");
		},
		complete: function(req) {

		    $('#myProgressbar').modal('hide');		    
		}
    
    });

 

}


function viewGetMatrixData()
{

	var arcfinal = new Array(); // time and value
	
	$.each(arcData_init, function(i, item) {

		// console.log(i, item);
		localdata = item.data;

		localdata.forEach(function(value, index, array) {
			if (parseInt(i) == 0) {
				arcfinal[index] = new Array();
				arcfinal[index][i] = value.time;
				arcfinal[index][i + 1] = value.quality==0?formatRTValue(value.value, arcData_format):"-";
			} else {
				arcfinal[index][i + 1] = value.quality==0?formatRTValue(value.value, arcData_format):"-";
			}
		});
	});
	
	return arcfinal;
	
}


function viewGetStatsData()
{
	var arcstats = new Array(); // max min avg sum of value
	
	$.each(arcData_init, function(i, item) {

		// console.log(i, item);
		localdata = item.data;

		if (parseInt(i) == 0) {

			arcstats[0] = new Array();
			arcstats[1] = new Array();
			arcstats[2] = new Array();
			arcstats[3] = new Array();
			
			arcstats[0][i] = rtstats[0];
			arcstats[1][i] = rtstats[1];
			arcstats[2][i] = rtstats[2];
			arcstats[3][i] = rtstats[3];

			/*
			arcstats[0][i] = "max";
			arcstats[1][i] = "min";
			arcstats[2][i] = "avg";
			arcstats[3][i] = "sum";
			*/			
		}			

		var arr = new Array();
		localdata.forEach(function(value, index, array) {
			if(value.quality==0)arr.push(value.value);
		});
		
		arcstats[0][i + 1] =  formatRTValue(Math.max.apply(null, arr), arcData_format);
		arcstats[1][i + 1] =  formatRTValue(Math.min.apply(null, arr), arcData_format);
		var sum = eval(arr.join("+"));
		arcstats[2][i + 1] =  formatRTValue(~~(sum / arr.length * 100) / 100, arcData_format);
		arcstats[3][i + 1] =  formatRTValue(sum, arcData_format);

		// console.log(arr);


	});
	
	return arcstats;	
}


function viewUpateRTData(lines)
{	
	var hday = lines;
	var hcurrent = 0;
	var hstat = 0;

	//console.log(reportstats);

	rtdatas.forEach(function(value, index, array) {
		// 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
		// code something
		// console.log(index, value);

		if (value[0] == null || value[0] == '' || value[0] == 'tag') {
			
			if (parseInt(hcurrent) < parseInt(hday)) {
				// value
				value.forEach(function(cvalue, cindex, carray) {
					carray[cindex] = arcData_final[hcurrent][cindex];
				});
				hcurrent = hcurrent + 1;
				
			} else if (parseInt(hstat) < 4) {
				//找到显示的为止
				for(var i=parseInt(hstat); i<4; i++)
				{
					if(reportstats.substr(hstat,1)=="0")
					{
						hstat = hstat + 1;
					}else
					{
						break;
					}
				}
				
				if(parseInt(hstat) < 4)
				{
					// stats
					value.forEach(function(cvalue, cindex, carray) {
						carray[cindex] = arcData_stats[hstat][cindex];
					});
					
					hstat = hstat + 1;	
				}
				
			}
		}
	});
}


function LoadData()
{
	var sRows = rtdatas.length;
	var sCols = rtdatas[0].length;
	
	$("#myRow").val(sRows);
	$("#myCol").val(sCols);

	// set mergecells
	var inst_mergeCells = hot.getPlugin("mergeCells");
	handscontent.rtmcell.forEach(function(value, index, array) {
		inst_mergeCells.merge(value.row, value.col, value.row
				+ value.rowspan - 1, value.col + value.colspan - 1);
	});

	// Setting
	settingArr = handscontent.rtsetting;

	// Size
	rowSizeArr = handscontent.rtrowsize ? handscontent.rtrowsize : [];
	colSizeArr = handscontent.rtcolsize ? handscontent.rtcolsize : [];	

	hot.loadData(rtdatas);

	/*
	 * hot.updateSettings({ cells: [ { renderer: 'my.customsettings' }] });
	*/
	
	
	// hot.updateSettings({
	// rowHeaders: true,
	// colHeaders: true
	// });

}
