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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thpower.scada.mapper.THPParaMapper;
import com.thpower.scada.mapper.THPStatusMapper;
import com.thpower.scada.model.THPPara;
import com.thpower.scada.model.THPStatus;
import com.thpower.scada.util.MapUtil;

/**
* @author admin
* @version 创建时间：2018年5月3日 下午6:34:43
* 类说明
*/
@Controller
public class THPStatusController {
	
	@Autowired
	THPStatusMapper _statusMapper;		

	/**
	 * 返回所有参数
	 * @author admin
	 * Last_update 2018年5月4日下午3:11:49
	 * @param paratype
	 * @param request
	 * @param response
	 * @param model
	 * @throws IOException
	 */
	@RequestMapping("/getAllStatus")
	public void getAllStatus(HttpServletRequest request, HttpServletResponse response, 
	Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");	

		Map<String, Object> map=new HashMap<String, Object>();
		
		try
		{
			//datatable
			List<Map<String, Object>> status = _statusMapper.getAllStatus();
			
			//total
			map.put("total", status.size());			

	        //System.out.println(status);
			
			//rows
			List<Map<String,Object>> listp=new ArrayList<Map<String,Object>>();  
		       
	        for(Map<String, Object> stat : status)
	        {	        	
				//Map<String,Object> mapff = MapUtil.objectToMap(stat);	

		        listp.add(stat);  	
	        }
	        
	        map.put("rows", listp);	        
			
		}catch(Exception e){
			
			e.printStackTrace();
		}	

        //map.put("success", "1");  
        
        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
        
        //System.out.println(jsonlist);
        
		 //向前台的页面输出结果
        PrintWriter out = response.getWriter();
		
        out.write(jsonlist);
        out.flush();
        out.close();    
		
	}

	
	@RequestMapping("/insertStatus")
	public void insertStatus(THPStatus statu, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");
        
		Map<String, Object> map=new HashMap<String, Object>();		
		
		try
		{
			//System.out.println(para);
			
			int nrow = _statusMapper.insert(statu);

			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();
			map.put("errorMsg", e.getMessage());
		}	
		
		//map.put("success", "1");  
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonlist = mapper.writeValueAsString(map);
		
		//System.out.println(jsonlist);
		
		//向前台的页面输出结果
		PrintWriter out = response.getWriter();
		
		out.write(jsonlist);
		out.flush();
		out.close();    
		
	}
	
	@RequestMapping("/updateOnline")
	public void updateOnline(THPStatus statu, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	
        
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			//System.out.println(para);
			
			int nrow = _statusMapper.update(statu);

			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();
			map.put("errorMsg", e.getMessage());
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
	
	@RequestMapping("/updateOffline")
	public void updateOffline(long userId, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	
        
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			//System.out.println(para);
			
			int nrow = _statusMapper.updateOffline(userId);

			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();
			map.put("errorMsg", e.getMessage());
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
	
	@RequestMapping("/updateStatus")
	public void updateStatus(THPStatus statu, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	
        
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			//System.out.println(para);
			
			int nrow = _statusMapper.update(statu);

			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();
			map.put("errorMsg", e.getMessage());
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
	
	
	@RequestMapping("/deleteStatus")
	public void deleteStatus(@RequestParam("userId") long userId,
			HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");
				
		//String paraId = request.getParameter("paraId");   
		
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{
			//System.out.println(para);
			
			int nrow = _statusMapper.delete(userId);
			
			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();
			map.put("errorMsg", e.getMessage());
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
	
}
