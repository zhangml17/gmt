package com.thpower.scada.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thpower.scada.mapper.THPUPRelationMapper;
import com.thpower.scada.model.THPPara;
import com.thpower.scada.model.THPUPRelation;
import com.thpower.scada.util.MapUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
* @author admin
* @version 创建时间：2018年8月28日 上午11:27:06
* 类说明
*/

@Controller
public class THPUPRelationController {
	

	@Autowired
	private THPUPRelationMapper _relMapper;
	

	@RequestMapping("/getRelationsByProId")
	public void getRelationsByProId(@RequestParam("proId") long proId,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
        //System.out.println(loginstatus + ", " + userid);

        
        List<THPUPRelation> rels = _relMapper.getRelationsByProId(proId);        

        Map<String,Object> map = new HashMap<String,Object>();
        
        if (rels !=null)
        {
        	//rows
			List<Map<String,Object>> listp=new ArrayList<Map<String,Object>>();  
		       
	        for(THPUPRelation rel : rels)
	        {	        	
				Map<String,Object> mapff = MapUtil.objectToMap(rel);	

		        listp.add(mapff);  	
	        }
	        
	        map.put("rows", listp);	             
        }      
		
        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
       
		//System.out.println(jsonlist);
		
        //向前台的页面输出结果
        PrintWriter out = response.getWriter();
         
        out.write(jsonlist);
        out.flush();
        out.close();         
	}
		


	@RequestMapping("/saveRelationsByProId")
	public void saveRelationsByProId(HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");

        Map<String,Object> map = new HashMap<String,Object>();
                
        long proId = Long.parseLong(request.getParameter("proId"));   
        String objectStr = request.getParameter("sharedusers");
                
        //JSONObject jsonObject=JSONObject.fromObject(objectStr);
        
        JSONArray jsonArray=JSONArray.fromObject(objectStr);
       
        //System.out.println(proId + ", " + jsonArray);
        
        
        //del        
         _relMapper.delRelationsByProId(proId);
        
        int nrows =0;
        
        //add
        for(int i=0; i<jsonArray.size(); i++)
        {
        	JSONObject jsonObj = jsonArray.getJSONObject(i);
        	//System.out.println(jsonObj);
        	
        	THPUPRelation rel = new THPUPRelation();
        	long userId = Long.parseLong(jsonObj.get("userId").toString());
        	//long proId = jsonObj.get("proId");
        	
        	//rel.setRelId(jsonObj.get("relId"));
        	rel.setUserId(userId);
        	rel.setProId(proId);
        	
        	//System.out.println(rel);
        	
        	_relMapper.insert(rel);
        	
        	nrows +=1;
        	
        } 

        map.put("rows", nrows);
        
        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
       
		//System.out.println(jsonlist);
		
        //向前台的页面输出结果
        PrintWriter out = response.getWriter();
         
        out.write(jsonlist);
        out.flush();
        out.close();         
	}	

}
