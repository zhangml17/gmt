/**
 * Created by wly on 2018/5/11
 */
$(function () {
    var date = new Date(); //获取当前时间
    var preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    var time = GetDate(date.toString());
    var pretime = GetDate(preDate.toString());
    $('#date_start').val(pretime);
    $('#date_end').val(time);

    //点击播放
    $(".play").on("click", function () {
    	//先停止五秒自动刷新
    	if(isStart){
     		timerUpdate();
     	}
    	
    	  var startDate = Date.parse(new Date(pretime));
    	  var endDate = Date.parse(new Date(time));
    	  var recordids="";
    	  if(updateids){
    		  for(var index in updateids){
    			  if(recordids){
    				  recordids +=","+updateids[index];
    			  }else{
    				  recordids +=updateids[index];
    			  }
    		  }
    	  }
    	  
    	if(toolbar.isStart){
    		toolbar.timerUpdate(mygraph,updateCells,updarchiveCells);
    	}
    	else{     
        	toolbar.playData(startDate,endDate,recordids,mygraph,updateCells,updarchiveCells);
        	
    	}


    	
    });

    //点击设置
    $("#btn_option").on("click", function () {
    	$('#optionModal').modal('show');
    });
    
    //点击设置
    $("#btn_ok").on("click", function () {
    	
    	var startDate = Date.parse(new Date( $('#date_start').val()));
    	var endDate = Date.parse(new Date($('#date_end').val()));
    	var frequency=$('#txt_frequency').val();
    	var interval= $('#txt_interval').val();
    	
    	toolbar.refreshFrequency=frequency;
    	toolbar.refreshInterval=interval;
    	
    	$('#optionModal').modal('hide');
    	
    });
    
    //还原
   $("#btn_restore").on("click", function () {
	   
     	if(toolbar.isStart){
   		toolbar.timerUpdate(mygraph,updateCells,updarchiveCells);
    	}
     	//开启5秒自动刷新
     	if(!isStart){
     		timerUpdate();
     	}
    	
    });
    
    //加载自动刷新
     timerUpdate();
   
});



var mygraph;
var updateCells=[];  //要更改的对象
var updateids=[];    //要更改的测点ids
var isStart=false;   //是否开始定时刷新
var updarchiveCells=[];  //要更改的历史测点对象

function main(container)
{
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported())
    {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
        // Fixes possible clipping issues in Chrome
        mxClient.NO_FO = true;
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        if(xmlBaseContent==''){
            return;
        }
        var xmlDocument = mxUtils.parseXml(xmlBaseContent);

        // if (xmlDocument.documentElement != null && xmlDocument.documentElement.nodeName == 'mxGraphModel')
        if (xmlDocument.documentElement != null
            &&( xmlDocument.documentElement.nodeName == 'mxfile' || xmlDocument.documentElement.nodeName == 'mxGraphModel'))
        {
            var decoder = new mxCodec(xmlDocument);
            var node = xmlDocument.documentElement;
            //获得mxGraphModel节点
			if(node.nodeName=='mxfile')node=node.firstChild;
            container.innerHTML = '';
            var RESOURCES_PATH = 'static/resources';
            var RESOURCE_BASE = RESOURCES_PATH + '/grapheditor';
            mxResources.loadDefaultBundle = false;
            var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, 'zh') ||
                mxResources.getSpecialBundle(RESOURCE_BASE, 'zh');
            mxUtils.getAll([bundle, 'static/editor/default.xml'], function(xhr) {
                // Adds bundle text to resources
                mxResources.parse(xhr[0].getText());
                // Configures the default graph theme
                var themes = new Object();
                themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();
                var graph = new Graph(container,null,null,null,themes);
                var state = graph.view.getState(node);
                GModel.init(graph);
                
                
                
                
                // graph.currentEdgeStyle = mxUtils.clone(graph.defaultEdgeStyle);
                // graph.currentVertexStyle = mxUtils.clone(graph.defaultVertexStyle);
                // graph.addListener('styleChanged', mxUtils.bind(this, function(sender, evt)
                // {
                //     // Checks if edges and/or vertices were modified
                //     var cells = evt.getProperty('cells');
                //     var vertex = false;
                //     var edge = false;
                //
                //     if (cells.length > 0)
                //     {
                //         for (var i = 0; i < cells.length; i++)
                //         {
                //             vertex = graph.getModel().isVertex(cells[i]) || vertex;
                //             edge = graph.getModel().isEdge(cells[i]) || edge;
                //
                //             if (edge && vertex)
                //             {
                //                 break;
                //             }
                //         }
                //     }
                //     else
                //     {
                //         vertex = true;
                //         edge = true;
                //     }
                //
                //     var keys = evt.getProperty('keys');
                //     var values = evt.getProperty('values');
                //
                //     for (var i = 0; i < keys.length; i++)
                //     {
                //         var common = mxUtils.indexOf(valueStyles, keys[i]) >= 0;
                //
                //         // Ignores transparent stroke colors
                //         if (keys[i] != 'strokeColor' || (values[i] != null && values[i] != 'none'))
                //         {
                //             // Special case: Edge style and shape
                //             if (mxUtils.indexOf(connectStyles, keys[i]) >= 0)
                //             {
                //                 if (edge || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0)
                //                 {
                //                     if (values[i] == null)
                //                     {
                //                         delete graph.currentEdgeStyle[keys[i]];
                //                     }
                //                     else
                //                     {
                //                         graph.currentEdgeStyle[keys[i]] = values[i];
                //                     }
                //                 }
                //                 // Uses style for vertex if defined in styles
                //                 else if (vertex && mxUtils.indexOf(styles, keys[i]) >= 0)
                //                 {
                //                     if (values[i] == null)
                //                     {
                //                         delete graph.currentVertexStyle[keys[i]];
                //                     }
                //                     else
                //                     {
                //                         graph.currentVertexStyle[keys[i]] = values[i];
                //                     }
                //                 }
                //             }
                //             else if (mxUtils.indexOf(styles, keys[i]) >= 0)
                //             {
                //                 if (vertex || common)
                //                 {
                //                     if (values[i] == null)
                //                     {
                //                         delete graph.currentVertexStyle[keys[i]];
                //                     }
                //                     else
                //                     {
                //                         graph.currentVertexStyle[keys[i]] = values[i];
                //                     }
                //                 }
                //
                //                 if (edge || common || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0)
                //                 {
                //                     if (values[i] == null)
                //                     {
                //                         delete graph.currentEdgeStyle[keys[i]];
                //                     }
                //                     else
                //                     {
                //                         graph.currentEdgeStyle[keys[i]] = values[i];
                //                     }
                //                 }
                //             }
                //         }
                //     }
                //
                //     if (this.toolbar != null)
                //     {
                //         this.toolbar.setFontName(graph.currentVertexStyle['fontFamily'] || Menus.prototype.defaultFont);
                //         this.toolbar.setFontSize(graph.currentVertexStyle['fontSize'] || Menus.prototype.defaultFontSize);
                //
                //         if (this.toolbar.edgeStyleMenu != null)
                //         {
                //             // Updates toolbar icon for edge style
                //             var edgeStyleDiv = this.toolbar.edgeStyleMenu.getElementsByTagName('div')[0];
                //
                //             if (graph.currentEdgeStyle['edgeStyle'] == 'orthogonalEdgeStyle' && graph.currentEdgeStyle['curved'] == '1')
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-curved';
                //             }
                //             else if (graph.currentEdgeStyle['edgeStyle'] == 'straight' || graph.currentEdgeStyle['edgeStyle'] == 'none' ||
                //                 graph.currentEdgeStyle['edgeStyle'] == null)
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-straight';
                //             }
                //             else if (graph.currentEdgeStyle['edgeStyle'] == 'entityRelationEdgeStyle')
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-entity';
                //             }
                //             else if (graph.currentEdgeStyle['edgeStyle'] == 'elbowEdgeStyle')
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-' + ((graph.currentEdgeStyle['elbow'] == 'vertical') ?
                //                     'verticalelbow' : 'horizontalelbow');
                //             }
                //             else if (graph.currentEdgeStyle['edgeStyle'] == 'isometricEdgeStyle')
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-' + ((graph.currentEdgeStyle['elbow'] == 'vertical') ?
                //                     'verticalisometric' : 'horizontalisometric');
                //             }
                //             else
                //             {
                //                 edgeStyleDiv.className = 'geSprite geSprite-orthogonal';
                //             }
                //         }
                //
                //         if (this.toolbar.edgeShapeMenu != null)
                //         {
                //             // Updates icon for edge shape
                //             var edgeShapeDiv = this.toolbar.edgeShapeMenu.getElementsByTagName('div')[0];
                //
                //             if (graph.currentEdgeStyle['shape'] == 'link')
                //             {
                //                 edgeShapeDiv.className = 'geSprite geSprite-linkedge';
                //             }
                //             else if (graph.currentEdgeStyle['shape'] == 'flexArrow')
                //             {
                //                 edgeShapeDiv.className = 'geSprite geSprite-arrow';
                //             }
                //             else if (graph.currentEdgeStyle['shape'] == 'arrow')
                //             {
                //                 edgeShapeDiv.className = 'geSprite geSprite-simplearrow';
                //             }
                //             else
                //             {
                //                 edgeShapeDiv.className = 'geSprite geSprite-connection';
                //             }
                //         }
                //
                //         // Updates icon for optinal line start shape
                //         if (this.toolbar.lineStartMenu != null)
                //         {
                //             var lineStartDiv = this.toolbar.lineStartMenu.getElementsByTagName('div')[0];
                //
                //             lineStartDiv.className = this.getCssClassForMarker('start',
                //                 graph.currentEdgeStyle['shape'], graph.currentEdgeStyle[mxConstants.STYLE_STARTARROW],
                //                 mxUtils.getValue(graph.currentEdgeStyle, 'startFill', '1'));
                //         }
                //
                //         // Updates icon for optinal line end shape
                //         if (this.toolbar.lineEndMenu != null)
                //         {
                //             var lineEndDiv = this.toolbar.lineEndMenu.getElementsByTagName('div')[0];
                //
                //             lineEndDiv.className = this.getCssClassForMarker('end',
                //                 graph.currentEdgeStyle['shape'], graph.currentEdgeStyle[mxConstants.STYLE_ENDARROW],
                //                 mxUtils.getValue(graph.currentEdgeStyle, 'endFill', '1'));
                //         }
                //     }
                // }));
                decoder.decode(node, graph.getModel());
                var cellBox=graph.getChildVertices(graph.getDefaultParent());
                for(var key in cellBox){
                	var cel=cellBox[key];
                	var arr=[];
                	if(cel.showhide==='btn_on'){
                		arr.push(cel);
                		console.log(arr)
                		graph.removeCells(arr);//这个方法的第一个参数必须是数组
                	}
                }
//                graph.getModel().beginUpdate();
//                try {
//                    decoder.decode(node, graph.getModel());
//                }
//                finally {
//                    // Updates the display
//                    graph.getModel().endUpdate();
//                }
                var cells=graph.getModel().cells;
				for(var index in cells){
				    var cell=cells[index];
				    var state = graph.view.getState(cell);
				    if(cell.edge && cell.className){
                        state.shape.node.getElementsByTagName('path')[1].setAttribute('stroke-dasharray', '8');
                        state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
                        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width','10');
                        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', cell.stroke);
                        state.shape.node.getElementsByTagName('path')[1].setAttribute('class', cell.className);
				    };
				   
				}
                //画面运行或编辑状态切换
                //graph.setEnabled(false)--运行态
                //graph.setEnabled(true)--编辑态
                graph.setEnabled(false);
				graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
				{
				    if(cell && cell.value instanceof GModel.GDataTag){
                        return createPopupMenu(graph, menu, cell, evt);
                    }
				};
                viewcontinue(graph);
                
            });
            
        }
    }
}
function createPopupMenu(graph, menu, cell, evt)
{
    menu.addItem('详细信息', null, function()
    {
        GEvent.Scada_Display_Content(cell,evt.pageX,evt.pageY);
    });
    menu.addItem('趋势曲线', null, function()
    {
        GEvent.Scada_Display_Trend(cell,evt.pageX,evt.pageY);
    });
    menu.addSeparator();
    menu.addItem('跳转到趋势页', null, function()
    {
        GEvent.Scada_Redirect_TrendPage(cell);
    });
}
function viewcontinue(graph)
{
    mygraph=graph;
    updateCells=[];  //需要更改的对象（对象id和测点id）
    updateids=[];
    updarchiveCells=[];  //需要修改的历史数据对象
    var cells= graph.getModel().cells;
    for(var index in cells){
        var mxcell=cells[index];
        if(mxcell.value){
            if(mxcell.value.measId){ //关联的测点id不为空
                var updatecell={};
                updatecell.id=mxcell.id;
                updatecell.measId= mxcell.value.measId;
                updatecell.dataFormat=mxcell.value.dataFormat;
                updatecell.dataIds= [mxcell.value.measId];
                updatecell.pointIds=[{"pointId":mxcell.value.measId}];
                if(updateids.indexOf(mxcell.value.measId)==-1 && mxcell.value.measId){
                    updateids.push(mxcell.value.measId);
                }
                //多态数据
                if(mxcell.value.multiStatus){
                	 updatecell.multiStatus=true;
                	 var point={};
                     point.pointId=mxcell.value.multiStatus.msMeasId;
                     point.status="1";  //表示为多态
                	 updatecell.pointIds.push(point);
                	 if(updateids.indexOf(point.pointId)==-1 && point.pointId){
                           updateids.push(point.pointId);
                       }
                }
                updateCells.push(updatecell);
             
                
               
            }
            if(mxcell.value.dataIds){
                if(typeof mxcell.value.startTime == "undefined" || typeof mxcell.value.endTime == "undefined"){  //单个测点刷新
                	if(mxcell.value.gobjType=="GChart"){
                		continue;
                	}

                    var updatecell={};
                    updatecell.id=mxcell.id;
                    updatecell.dataFormat=mxcell.value.dataFormat;
                        //不是数组，只有一个测点数据
                        if(mxcell.value.dataIds instanceof Array){
                            updatecell.dataIds= mxcell.value.dataIds;
                        }
                        else {
                            updatecell.dataIds= [mxcell.value.dataIds];
                        }

                        updatecell.pointIds=[];
                        for(var i in updatecell.dataIds){
                            var point={};
                            point.pointId=updatecell.dataIds[i];
                            updatecell.pointIds.push(point);
                            if(updateids.indexOf(updatecell.dataIds[i])==-1 && point.pointId){
                                updateids.push(point.pointId);
                            }
                        }
                        updateCells.push(updatecell);
                }
                else {
                    //存在起始时间的
                    var updatecell={};
                    updatecell.id=mxcell.id;
                    var dataids=[];
                    if(mxcell.value.dataIds){
                        for(var d in mxcell.value.dataIds){
                            if(mxcell.value.dataIds[d]!=""){
                                dataids.push(parseInt(mxcell.value.dataIds[d]));
                            }
                        }
                    }
                    updatecell.dataIds=dataids;
                    // updatecell.dataIds= mxcell.value.dataIds;
                    updatecell.startTime= mxcell.value.startTime;
                    updatecell.endTime= mxcell.value.endTime;
                    updatecell.pointIds=[];
                    for(var i in updatecell.dataIds){
                        var point={};
                        point.pointId=updatecell.dataIds[i];
                        updatecell.pointIds.push(point);
                    }
                    updarchiveCells.push(updatecell);
                }
            }

        }
    }        
}

//定时更新
function timerUpdate() {
    isStart=!isStart;
    
    isStart?$('#btnTimer').val('停止'):$('#btnTimer').val('刷新');

    if(isStart){
        int= setInterval(function () {
					refresh();
        },1000*5);
    }
    else {
        int=clearInterval(int);
    }

}

function updateValue(ids,graph){
    var updatePoint=[];   //修改的数据
    var  recordids=ids;
    var param = {
        "tbname":"SCADA_Analog" ,
        "id":ids
        // "datatype":1
    };
    var contentStr = JSON.stringify(param);
    mxUtils.post(settings.snapServiceURL+"/getvalues", contentStr, function(req){
    	if(req.request && req.request.responseText ){	
    		if(req.request.responseText =="readValues failed"){
    			return;
    		}
    	    var data = JSON.parse(req.request.responseText);
            if(data && data.replyCode.code=="0" && data.result){
                var da=data.result;
                var result=[];
                for(var index in da.value){
                   var item={};
                    item.id=recordids[index];
                    item.time=da.time[index];
                    item.value=da.value[index];
                    item.QTY=da.QTY[index];
                    result.push(item);
                }
                for(var index in result){
                if(updateCells){
                    for(var cell in updateCells) {
                        var mycell = updateCells[cell];
                        if(mycell.dataIds.indexOf(result[index].id)>-1){
                            //存在
                            for(var i in mycell.pointIds){
                                if(mycell.pointIds[i].pointId==result[index].id){
                                    mycell.pointIds[i].timestamp=result[index].time;
                                    //20180513,wugh, format value
                                    var dataFormat=mycell.dataFormat;
                                    if(!dataFormat){
                                        dataFormat="0.00";
                                    }
                                    mycell.pointIds[i].value=numeral(result[index].value).format(dataFormat);
                                    mycell.pointIds[i].iQuality=result[index].QTY;
                                }
                            }
                        }
                    }
                 }
                }
                //更新值
                setData(graph,updateCells);
            }
    	}
    
    });
}


//往model中添加更新数据
function  setData(graph,updateCells) {
    graph.getModel().beginUpdate();
    try{
        var cells=  graph.getModel().cells;
        for(var index in cells){
            var mxcell=cells[index];
            if(mxcell.value && updateCells){
                for(var i in updateCells){
                    if(mxcell.id==updateCells[i].id){
                        if(mxcell.value.measId){
                        	var value=updateCells[i].pointIds[0].value;
                        	var time='';
                        	if(updateCells[i].pointIds[0].timestamp==-1){
                        		time=formatDate(new Date());
                        	}else{
                        		time=formatDate(new Date(updateCells[i].pointIds[0].timestamp*1000));
                        	}
                        	 
                        	
                        	//存在多态数据
                        	if(updateCells[i].multiStatus){
                        		var multiobj={};
                        		if(updateCells[i].pointIds.length>1){
                        			multiobj.value=updateCells[i].pointIds[1].value;
                        			multiobj.iQuality=updateCells[i].pointIds[1].iQuality;
                        		}
                        		 mxcell.value.setData(value,time,multiobj);
                        	}
                        	else{
                        		 mxcell.value.setData(value,time);
                        	}
                        	
                        	
                           
                        }
                        else if(mxcell.value.dataIds){
                            if(typeof mxcell.value.startTime == "undefined" || typeof mxcell.value.endTime == "undefined") {  //单个测点刷新
                                if(updateCells[i].pointIds.length==1){
//											mxcell.value.setData(updateCells[i].pointIds[0].value);
                                   var value=updateCells[i].pointIds[0].value;
                                    mxcell.value.setData([{"value":value, "name":'测点'+updateCells[i].pointIds[0].pointId}]);
                                }
                                else {
                                    var data=[];
                                    for(var j in updateCells[i].pointIds){
                                        var item=updateCells[i].pointIds[j];
//                                        var value=numeral(item.value).format(dataFormat);
                                        var value=item.value+"";
                                        var da={};
                                        da.name="测点"+item.pointId;
                                        da.value=value;
                                        data.push(da);
                                    }
                                    mxcell.value.setData(data);
                                }
                            }
                        }

                    }
                }
            }
        }
    }
    finally
    {
        graph.getModel().endUpdate();
    }
}

//更新历史数据
function updatearchvieValue(ids,startdate,enddate) {
    var  recordids=ids;
    var param = {
        "tbname":"hdr_analog",
        "id":recordids,
        "begintime": startdate,
        "endtime": enddate,
        "interval":"5m",
        "mode":2
    };
    var contentStr = JSON.stringify(param);
    mxUtils.post(settings.archServiceURL+"/valuesbytmrange", contentStr, function(req) {
    	if(req && req.request && req.request.responseText ){
        var da = JSON.parse(req.request.responseText);
            if(da && da.replyCode.code=="0" && da.result ){
                var data=da.result;
                if(data){
                    for(var index in data) {
                        var item = data[index];
                        if (updarchiveCells) {
                            for (var cell in updarchiveCells) {
                                var mycell = updarchiveCells[cell];
                                if (mycell.dataIds.indexOf(item.id) > -1) {
                                    var dataFormat=mycell.dataFormat;
                                    if(!dataFormat){
                                        dataFormat="0.00";
                                    }
                                    //存在
                                    for(var i in mycell.pointIds){
                                        if(mycell.pointIds[i].pointId==item.id.toString()){
                                            mycell.pointIds[i].data=formatpointsData(item.data,dataFormat);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //更新
                setArchvieData(mygraph,updarchiveCells);


            }


        // if(data){
        //     for(var index in data) {
        //         var item = data[index];
        //         if (updarchiveCells) {
        //             for (var cell in updarchiveCells) {
        //                 var mycell = updarchiveCells[cell];
        //                 if (mycell.dataIds.indexOf(item.recordid+"") > -1) {
        //                 	 var dataFormat=mycell.dataFormat;
        //                      if(!dataFormat){
        //                   	     dataFormat="0.00";
        //                      }
        //                     //存在
        //                     for(var i in mycell.pointIds){
        //                         if(mycell.pointIds[i].pointId==item.recordid.toString()){
        //                             mycell.pointIds[i].data=formatpointsData(item.data,dataFormat);
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //
        //     }
        // }



    	}
    });
}

//往model中添加更新数据
function  setArchvieData(graph,updateCells) {
    graph.getModel().beginUpdate();
    try{
        var cells=  graph.getModel().cells;
        for(var index in cells){
            var mxcell=cells[index];
            if(mxcell.value && updateCells){
                for(var i in updateCells){
                    if(mxcell.id==updateCells[i].id){
                        if(mxcell.value.dataIds){
                            var data=[];
                            for(var j in updateCells[i].pointIds){
                                var item=updateCells[i].pointIds[j];
                                var da={};
                                da.name="测点"+item.pointId;
                                da.data=item.data;
                                data.push(da);
                            }

//                            var startTime=Date.parse(new Date(Time.getDate(mxcell.value.startTime)));
//                            var endTime=Date.parse(new Date(Time.getDate(mxcell.value.endTime)));
//                            var ninterval=60;
//                            var echart=mxcell.value.chart;
//                           var option= charts.setTimeDataOption(startTime,endTime,ninterval,data,echart);
//                            mxcell.value.chart.setOption(option);
                            if(mxcell.value.gobjType=="GChartScatter"){
                                //散点图
//                            	var option={
//                            			xAxis: {
//                            	            type: 'category'
//                            	        }
//                            	};

                                var curindex=0;
                                var xData=[];
                                var xyData=[];
                                for(var index in data){
                                    var item=[];
                                    for(var n in data[index].data){
                                        var yData=[];
                                        if(curindex==index){
                                            xData.push(data[index].data[n][1]);
                                        }
                                        else{
                                            if(xData){
                                                yData.push(xData[n],data[index].data[n][1]);
                                                item.push(yData);
                                            }
                                        }
                                    }
                                    if(item.length>0){
                                        var it={};
                                        it.data=item;
                                        it.name=data[index].name;
                                        xyData.push(it);
                                    }

                                }

                                mxcell.value.setData(xyData);
//                            	 var echart=mxcell.value.chart;
//                            	 var option= charts.setScatterDataOption(xyData,echart);
//                            	 mxcell.value.chart.setOption(option);
                            }
                            else{
                                mxcell.value.setData(data);
                            }

//                            mxcell.value.setData(data);
                        }

                    }
                }
            }
        }
    }
    finally
    {
        graph.getModel().endUpdate();
    }
}

//格式化测点数据
function formatpointsData(data,dataFormat) {
    var result=[];
    for(var index in data.time){
        var da=[];
        var time=formatDate(new Date(data.time[index]*1000));
        var value =numeral(data.val[index]).format(dataFormat);

        da.push(time);
        da.push(value);
        result.push(da);
    }

    return result;
}


//刷新更改数值
function refresh() {
    if(updateCells){
        updateValue(updateids,mygraph);
    }
    if(updarchiveCells){
        for(var index in updarchiveCells){
            var cells=updarchiveCells[index];
            // var pointids="";
            // if(cells.dataIds){
            //     for(var i in cells.dataIds){
            //         if(pointids){
            //             pointids +=",";
            //         }
            //         pointids +=""+cells.dataIds[i];
            //     }
            // }
            // var ids= pointids;
            // var startTime=Date.parse(new Date(Time.getDate(cells.startTime)));
            // var endTime=Date.parse(new Date(Time.getDate(cells.endTime)));
            var ids= cells.dataIds;
            var startTime=Time.getDate(cells.startTime);
            var endTime=Time.getDate(cells.endTime);
            updatearchvieValue(ids,startTime,endTime);
        }
    }
}

function run()
{
	mygraph.setEnabled(false);
	refresh();	
}

function edit()
{
	mygraph.setEnabled(true);
}

function ViewXML()
{
	var encoder = new mxCodec();
	var node = encoder.encode(mygraph.getModel());
	mxUtils.popup(mxUtils.getPrettyXml(node), true);
}


//创建补0函数
function p(s) {
    return s < 10 ? '0' + s : s;
}
//时间格式化
function formatDate(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + p(date.getHours()) + ":" + p(date.getMinutes()) + ":" + p(date.getSeconds());
}
//时间格式
function GetDate(Ntime) {
    var str = Ntime;
    str = str.replace(/ GMT.+$/, '');// Or str = str.substring(0, 24)
    var d = new Date(str);
    var a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
            a[i] = '0' + a[i];
        }
    }
    return str = a[0] + '-' + a[1] + '-' + a[2] + " " + a[3] + ":" + a[4] + ":" + a[5];
}
