	var defaults = {

			//xd
			snapServiceURL : "http://39.107.67.255:7099/api/snap",   //实时数据服务
			archServiceURL : "http://39.107.67.255:9198/api/arch",    //历史数据服务
			
			//view
			//viewStartDate:"y",
			//viewEndDate:"*",
			//viewFrequency:5,   //单位：秒 刷新频率
			//viewInterval:60,   //单位：分钟  时间间隔
			
			//xj
			//modelServiceURL : "http://localhost:8080/THPModelService/index.html?key=",
			//xjResURL : 'http://localhost:8080/THPModelService/xuji/res/',
			//initScript:false,
			//timerEvent:true,
			//dataService:true,				
			//isCacheData:true,
			//updateCacheTimer:5000,
			//userTimeInterval:30000,	
			//isScriptCacheData:false,
			//scriptUpdateCacheTimer:5000,
			//scriptUserTimeInterval:30000,
			

			
	};
	

	//added by wuguanhui
	//at 2018.8.20
	//database->localstorage->variable
	
	function setParameters(){
		
		//localStorage
		var jsonParameter = localStorage.getItem("thpcloud.parameters");
		var objPara = JSON.parse(jsonParameter);   
		
		defaults.snapServiceURL = objPara.snapServiceURL;    
		defaults.archServiceURL = objPara.archServiceURL;   
		
		//defaults.viewStartDate = objPara.viewStartDate;    
		//defaults.viewEndDate = objPara.viewEndDate;    
		//defaults.viewFrequency = objPara.viewFrequency;    
		//defaults.viewInterval = objPara.viewInterval;    
		
		//defaults.modelServiceURL = objPara.modelServiceURL;    
		//defaults.xjResURL = objPara.xjResURL;    
		//defaults.initScript = objPara.initScript;    
		//defaults.timerEvent = objPara.timerEvent;    
		//defaults.dataService = objPara.dataService;    
		//defaults.isCacheData = objPara.isCacheData;    
		//defaults.updateCacheTimer = objPara.updateCacheTimer;    
		//defaults.userTimeInterval = objPara.userTimeInterval;    
		//defaults.isScriptCacheData = objPara.isScriptCacheData;    
		//defaults.scriptUpdateCacheTimer = objPara.scriptUpdateCacheTimer;    
		//defaults.scriptUserTimeInterval = objPara.scriptUserTimeInterval;   
		
		
	}
	
	setParameters();
	
	var settings = defaults;
	
	
	var setOption=function(option){
		
		settings = Object.assign(defaults,option);
	};