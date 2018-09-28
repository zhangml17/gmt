package com.thpower.scada.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thpower.scada.mapper.THPDatasourceMapper;
import com.thpower.scada.model.THPDatasource;
import com.thpower.scada.model.THPPara;
import com.thpower.scada.util.MapUtil;

/**
* @author admin
* @version 创建时间：2017年12月5日 上午10:42:59
* 类说明
*/
@Controller
public class THPDatasourceController {
	

	@Autowired
	THPDatasourceMapper _dsMapper;		


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
	@RequestMapping("/getAllDatasources")
	public void getAllDatasources(@RequestParam(value="dsType") String dsType,
	HttpServletRequest request, HttpServletResponse response, 
	Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");	

		Map<String, Object> map=new HashMap<String, Object>();
		
		try
		{
			//datatable
			List<THPDatasource> dss = new ArrayList<THPDatasource>();
			
			if ( "ALL".equals(dsType))
			{
				dss = _dsMapper.getAllDatasources();	
			}else
			{
				dss = _dsMapper.getDatasourcesByType(dsType);
			}			
			
			//System.out.println(paras); 
			
			//total
			map.put("total", dss.size());
			
			//rows
			List<Map<String,Object>> listp=new ArrayList<Map<String,Object>>();  
		       
	        for(THPDatasource ds : dss)
	        {	        	
				Map<String,Object> mapff = MapUtil.objectToMap(ds);	

		        listp.add(mapff);  	
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
	@RequestMapping("/getDatasourceUrlById")
	public void getDatasourceUrlById(@RequestParam(value="dsId") String dsId,
	HttpServletRequest request, HttpServletResponse response, 
	Model model	) throws IOException
	{			
		//System.out.println(paracode);
	
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");	

		Map<String, Object> map=new HashMap<String, Object>();
		
		try
		{
			String dsUrl = _dsMapper.getDatasourceUrlById(dsId);

			map.put("paracode", dsId );
			map.put("paravalue", dsUrl );			     
			
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
	@RequestMapping("/getDatasourceUrlByCode")
	public void getDatasourceUrlByCode(@RequestParam(value="dsCode") String dsCode,
	HttpServletRequest request, HttpServletResponse response, 
	Model model	) throws IOException
	{			
		//System.out.println(paracode);
	
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");	

		Map<String, Object> map=new HashMap<String, Object>();
		
		try
		{
			String dsUrl = _dsMapper.getDatasourceUrlByCode(dsCode);

			map.put("paracode", dsCode );
			map.put("paravalue", dsUrl );			     
			
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
	

	/**
	 * 返回参数的类别List
	 * @author admin
	 * Last_update 2018年5月4日下午3:11:15
	 * @param request
	 * @param response
	 * @param model
	 * @throws IOException
	 */
	@RequestMapping("/getDatasourceTypes")
	public void getDatasourceTypes(HttpServletRequest request, HttpServletResponse response, 
	Model model	) throws IOException
	{        
        //System.out.println("coming...");        
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");	

		List<String> types = _dsMapper.getDatasourceTypes();			
		
		types.add("ALL"); 		

        //System.out.println(types);       
        

        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(types);
        
        //System.out.println(jsonlist);
        
		 //向前台的页面输出结果
        PrintWriter out = response.getWriter();
		
        out.write(jsonlist);
        out.flush();
        out.close(); 		
	}

	
	@RequestMapping("/insertDatasource")
	public void insertDatasource(THPDatasource datasource, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");
        
		Map<String, Object> map=new HashMap<String, Object>();		
		
		try
		{
			//System.out.println(para);
			
			int nrow = _dsMapper.insert(datasource);

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
	
	
	@RequestMapping("/updateDatasource")
	public void updateDatasource(THPDatasource datasource, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	
        
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			System.out.println(datasource);
			
			int nrow = _dsMapper.update(datasource);

			map.put("rows", nrow);
			
		}catch(Exception e){
			
			e.printStackTrace();

			System.out.println(e.getMessage());
			
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
	
	
	@RequestMapping("/deleteDatasource")
	public void deleteDatasource(@RequestParam("dsId") long dsId,
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
			
			int nrow = _dsMapper.delete(dsId);
			
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
