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
import com.thpower.scada.mapper.THPParaMapper;
import com.thpower.scada.mapper.THPProjectMapper;
import com.thpower.scada.mapper.THPStatusMapper;
import com.thpower.scada.mapper.THPUPRelationMapper;
import com.thpower.scada.mapper.THPUserMapper;
import com.thpower.scada.model.THPDatasource;
import com.thpower.scada.model.THPPara;
import com.thpower.scada.model.THPProject;
import com.thpower.scada.model.THPStatus;
import com.thpower.scada.model.THPUPRelation;
import com.thpower.scada.model.THPUser;
import com.thpower.scada.util.COMUtil;
import com.thpower.scada.util.MapUtil;
import com.thpower.scada.util.MemoryDataUtil;
import com.thpower.scada.util.PropertyUtil;

/**
* @author admin
* @version 创建时间：2017年11月14日 下午4:33:39
* 类说明
*/

@Controller
public class THPUserController {
	
	@Autowired
	private THPUserMapper _userMapper;

	@Autowired
	private THPProjectMapper _proMapper;	

	@Autowired
	private THPParaMapper _paraMapper;	

	@Autowired
	private THPDatasourceMapper _dsMapper;
	
	@Autowired
	private THPUPRelationMapper _relMapper;	
	
	@Autowired
	private THPStatusMapper _statusMapper;	

	@RequestMapping("/getAllUsers")
	public void getAllUsers(HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");  
        
        Map<String,Object> map = new HashMap<String,Object>();
        
        try
        {
        	
        	List<THPUser> users = _userMapper.getAllUsers();
        
        	//rows
			List<Map<String,Object>> listp=new ArrayList<Map<String,Object>>();  
			
			for(THPUser user : users)
			{
				Map<String,Object> mapff = MapUtil.objectToMap(user);					
				
				listp.add(mapff);  	
			}
			
			map.put("rows", listp);	 
			
		}catch(Exception e){
			
			e.printStackTrace();
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
	
	@RequestMapping("/getSharedUsers")
	public void getSharedUsers(@RequestParam("proId") long proId,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");  
        
        Map<String,Object> map = new HashMap<String,Object>();
        
        try
        {        	
        	//all users
        	List<THPUser> users = _userMapper.getAllUsers();
        
        	//rows
			List<Map<String,Object>> listp=new ArrayList<Map<String,Object>>();  
			
			for(THPUser user : users)
			{
				Map<String,Object> mapff = MapUtil.objectToMap(user);					
				
				listp.add(mapff);  	
			}
			
			map.put("users", listp);	 
			
			//have shared
			List<THPUPRelation> shares = _relMapper.getRelationsByProId(proId);
			
			//rows
			List<Map<String,Object>> listh=new ArrayList<Map<String,Object>>();  
			
			for(THPUPRelation share : shares)
			{
				Map<String,Object> mapff = MapUtil.objectToMap(share);					
				
				listh.add(mapff);  	
			}
			
			map.put("sharedusers", listh);
			
		}catch(Exception e){
			
			e.printStackTrace();
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
	
	@RequestMapping("/initUserPassword")
	public void initUserPassword(@RequestParam("userId") long userId,
			HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	

		//System.out.println(userid);
		
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			//String userPassword = PropertyUtil.getProperty("userInitPassword", "power12345");
			String userPassword = _paraMapper.getParaValue("userInitPassword"); 
			if(userPassword==null || userPassword=="")userPassword="power12345";
			
			int nrow = _userMapper.initUserPassword(userId, userPassword);

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

	@RequestMapping("/getUser")
	public void getUser(@RequestParam("userid") long userid,
			HttpServletRequest request, HttpServletResponse response, 
			Model model
			) throws IOException{
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
		

        Map<String,Object> map = new HashMap<String,Object>();
        
        THPUser user = _userMapper.select(userid);	
		
        map.put("user", user);

        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
        
        //StringBuffer result = new StringBuffer(""); 
        
        //result.append(jsonlist); 
        //System.out.println(jsonlist);
        
        //向前台的页面输出结果
        PrintWriter out = response.getWriter();
		
        out.write(jsonlist);
        out.flush();
        out.close();      
	}	
		
	@RequestMapping("/insertUser")
	public void insertUser(THPUser user, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");        
        
		Map<String, Object> map=new HashMap<String, Object>();		
		
		try
		{
			//System.out.println(template);
			
			int nrow = _userMapper.insert(user);

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
	
	@RequestMapping("/updateUser")
	public void updateUser(THPUser user, HttpServletRequest request, HttpServletResponse response, 
			Model model	) throws IOException
	{	
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");	
        
		Map<String, Object> map=new HashMap<String, Object>();	
		
		try
		{		
			//System.out.println(para);
			
			int nrow = _userMapper.update(user);

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
		
	@RequestMapping("/deleteUser")
	public void deleteUser(@RequestParam("userId") long userId,
			HttpServletRequest request, HttpServletResponse response, 
			Model model ) throws IOException{
		
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");		
		
		Map<String,Object> map = new HashMap<String,Object>();		
		
		try
		{			
			_userMapper.delete(userId); 
	        			
		}catch (Exception ee)
		{
			ee.printStackTrace();
		}		
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonlist = mapper.writeValueAsString(map);
		
		//向前台的页面输出结果
		PrintWriter out = response.getWriter();
		
		out.write(jsonlist);
		out.flush();
		out.close();      
		
	}	
	
	
	//@RequestParam("userid") long userid,
	@RequestMapping("/get_recent")
	public void get_recent(@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
        //List<THPProject> projectlist = _proMapper.getProjectsByUserId(userid);
        List<THPProject> projectlist = _proMapper.getAllProjects();
                
        Map<String,Object> map = new HashMap<String,Object>();
       
        List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
        
        for(THPProject project : projectlist)
        {
	        Map<String,Object> mapdata1 = new HashMap<String,Object>();
	        mapdata1.put("id", project.getProId());
	        mapdata1.put("name", project.getProName());
	        mapdata1.put("type", project.getProType());
	        dataList.add(mapdata1);
        } 
        
        map.put("data", dataList);

        map.put("total", dataList.size());
		
        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
       
		//System.out.println(jsonlist);
		
        //向前台的页面输出结果
        PrintWriter out = response.getWriter();
         
        out.write(jsonlist);
        out.flush();
        out.close();         
	}
	

	@RequestMapping("/to_login")
	public void to_login(HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
        String userEmail =request.getParameter("email");
        String userPassword =request.getParameter("password");
        String userurl =request.getParameter("off_key");
        
        String sid = request.getSession().getId();
        
        String sessionid = MemoryDataUtil.getSessionIDMap().get(userEmail);
        
        //System.out.println(sid + "," + sessionid);
        
        //如果用户名存在放心（即登录放行） 
        if(sid.equals(sessionid)){
        	//return ;        	
        }else{ 
        	//如果请求的sessionID和此账号Map中存放的sessionID不一致，跳转到登陆页
        	//判断如果是异步请求，设置响应头 sessionstatus为timeout，自动跳转，否则重定向
        	if(request.getHeader("x-requested-with")!=null
        			&& request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest"))
        	{ 
        		
        		response.setHeader("sessionstatus","timeout");        		
        		//return false;
        		
        	}else{
        		
        		//String indexurl=request.getContextPath()+"/login.do";        		
        		//response.sendRedirect(indexurl);
        		
        		//return false;
        	}
        }
        
        /*
        Map<String,String> parmMap=new HashMap<String,String>();
        Map<String,String[]> mapp= request.getParameterMap();  
        //参数名称  
        Set<String> key=mapp.keySet();        
        //参数迭代器  
        Iterator<String> iterator = key.iterator();  
        while(iterator.hasNext()){  
            String k=iterator.next();  
             parmMap.put(k, mapp.get(k)[0]);  
        }          
        System.out.println("parmMap====="+parmMap.toString()); 
        */ 
        
        THPUser user = _userMapper.login(userEmail, userPassword);
        
        Map<String,Object> map = new HashMap<String,Object>();
        
        if(user == null)
        {    
	        Map<String, Object> data_userlist =new HashMap<String, Object>();
        	
	        data_userlist.put("userid", "");
	        data_userlist.put("username", "");
	        data_userlist.put("useremail", "");
	        data_userlist.put("userislogin", false);
	        data_userlist.put("userheadportrait", "");
	        data_userlist.put("usersecuredigest", "");
	        data_userlist.put("usersignuptime", 0); 
	        
	        map.put("user", data_userlist);  
	        
	        map.put("success", 0);      
	        map.put("url", "index.html");
	        
        }else
        {        
	        //projects infor
	        //Map<String,Object> mapdata = new HashMap<String,Object>();
	        
	        List<THPProject> projectlist = _proMapper.getProjectsByUserId(user.getUserId());
	        
	        List<Map<String, Object>> data_prolist = new ArrayList<Map<String, Object>>();
	        
	        for(THPProject project : projectlist)
	        {
		        Map<String,Object> mapdata1 = new HashMap<String,Object>();
		        mapdata1.put("id", project.getProId());
		        mapdata1.put("name", project.getProName());
		        mapdata1.put("type", project.getProType());
		        data_prolist.add(mapdata1);
	        } 
	        
	        //mapdata.put("data", dataList);	

	        map.put("projects", data_prolist);
	        
	        //configuration
	        
	        List<THPPara> paralist = _paraMapper.getAllParas();
	        Map<String, Object> data_paralist =new HashMap<String, Object>();
	        
	        for(THPPara para : paralist)
	        {
		        data_paralist.put(para.getParaCode(), para.getParaValue());	        	
	        }
	        
	        /*
	        List<Map<String, Object>> data_paralist = new ArrayList<Map<String, Object>>();
	        
	        for(THPPara para : paralist)
	        {
		        Map<String,Object> mapdata1 = new HashMap<String,Object>();
		        mapdata1.put("code", para.getParaCode());
		        mapdata1.put("type", para.getParaType());
		        mapdata1.put("value",para.getParaValue());	
		        data_paralist.add(mapdata1);        	
	        }
	        */
	        
	        //System.out.println(data_paralist);

	        map.put("parameters", data_paralist);	   
	        
	        // Datasource	        
	        List<THPDatasource> dslist = _dsMapper.getAllDatasources();
	        //Map<String, Object> data_dslist =new HashMap<String, Object>();	        
	        List<Map<String, Object>> data_dslist = new ArrayList<Map<String, Object>>();
	        
	        for(THPDatasource ds : dslist)
	        {
		        Map<String,Object> mapdata1 = new HashMap<String,Object>();
		        mapdata1.put("code", ds.getDsCode());
		        mapdata1.put("name", ds.getDsName());
		        mapdata1.put("url", ds.getDsUrl());	
		        data_dslist.add(mapdata1);        	
	        }
	        
	        //System.out.println(data_paralist);
	        
	        map.put("datasources", data_dslist);	   
	        
	        //tables
	        List<THPPara> tablelist = _paraMapper.getParasByLabel("table");
	        Map<String, Object> data_tablelist =new HashMap<String, Object>();
	        
	        for(THPPara para : tablelist)
	        {
	        	data_tablelist.put(para.getParaCode(), para.getParaValue());	        	
	        }

	        map.put("tables", data_tablelist);	
	        
	        
	        if(user.getUserLevel().equals("0"))	        	
	        {
	        	//管理员才能展示此目录列表
	        	
		        //pages
		        List<THPPara> pagelist = _paraMapper.getParasByLabel("url");
		        //Map<String, Object> data_dslist =new HashMap<String, Object>();	        
		        List<Map<String, Object>> data_pagelist = new ArrayList<Map<String, Object>>();
		        
		        for(THPPara para : pagelist)
		        {
			        Map<String,Object> mapdata1 = new HashMap<String,Object>();
			        mapdata1.put("code", para.getParaCode());
			        mapdata1.put("name", para.getParaName());
			        mapdata1.put("url", para.getParaValue());	
			        data_pagelist.add(mapdata1);        	
		        }
		        map.put("pages", data_pagelist);
	        }else
	        {
		        map.put("pages", "");
	        	
	        }
	        
	        
        	//user infor
	        Map<String, Object> data_userlist =new HashMap<String, Object>();
        	
	        data_userlist.put("userid", user.getUserId());
	        data_userlist.put("username", user.getUserName());
	        data_userlist.put("useremail", user.getUserEmail());
	        data_userlist.put("userislogin", true);
	        data_userlist.put("userheadportrait", "static/icons/person-avatar.png");
	        data_userlist.put("usersecuredigest", "33fe11a0100d39ca8926708344f14882f157d63c");
	        data_userlist.put("usersignuptime", 1505265550); 
	        
	        map.put("user", data_userlist);
	        
	        map.put("success", 1);  
	        
	        //login status
	        THPStatus stat =new THPStatus();
	        
	        stat.setUserId(user.getUserId());
	        stat.setUserOnline(1);
	        stat.setUserLoginIP(getRemoteHost(request));
	        stat.setUserLoginTime(COMUtil.getStringDate());
	        stat.setUserUpdateTime(COMUtil.getStringDate());
	        
	        _statusMapper.replaceintoRow(stat);
	        
	        
	        //==号在比较基本数据类型时比较的是值，
	        //而用==号比较两个对象时比较的是两个对象的地址值：
	        //System.out.println(userurl=="toeditor");
	        
	        if(userurl.equals("toeditor"))
	        {
	        	userurl="editor.html";
	        }else
	        {
	        	userurl="viewer.html";
	        }
	        
	        map.put("url", userurl);
	        
	        
	        //System.out.println(userurl);
	        
	        //cookies	        
	        Integer userid = (int) user.getUserId();
	        
            Cookie id = new Cookie("thpcloud.userid", userid.toString());
           
            //id.setHttpOnly(true);
            id.setMaxAge(60*60*24);
            id.setPath("/");
            
            response.addCookie(id);
            
            Integer loginstatus = 1;
            Cookie status = new Cookie("thpcloud.loginstatus", loginstatus.toString());

            //status.setHttpOnly(true);
            //cookie: 24 hours
            status.setMaxAge(60*60*24);
            status.setPath("/");
            
            response.addCookie(status);
            
            String sessionID = request.getRequestedSessionId();
            //////String userEmail = user.getUserEmail();
            
            if (!MemoryDataUtil.getSessionIDMap().containsKey(userEmail)) 
            { 
            	//不存在，首次登陆，放入Map
            	MemoryDataUtil.getSessionIDMap().put(userEmail, sessionID);
            	
            }else if(MemoryDataUtil.getSessionIDMap().containsKey(user) 
            		&& !StringUtils.equals(sessionID, MemoryDataUtil.getSessionIDMap().get(userEmail)))
            {
            	MemoryDataUtil.getSessionIDMap().remove(userEmail);
            	MemoryDataUtil.getSessionIDMap().put(userEmail, sessionID);
            }
            
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
	
	@RequestMapping("/toeditor")
	public String to_editor(@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
//        Map<String,Object> map = new HashMap<String,Object>();
//       
//        map.put("type", "grid");
//        map.put("id", "1");
//		
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonlist = mapper.writeValueAsString(map);
//       
//		//System.out.println(jsonlist);
//        
//        
//		
//        //向前台的页面输出结果
//        PrintWriter out = response.getWriter();
//         
//        out.write(jsonlist);
//        out.flush();
//        out.close();        
        
       return "redirect: editor.html";        
	}
	
	@RequestMapping("/toviewer")
	public String to_view(@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
//        Map<String,Object> map = new HashMap<String,Object>();
//       
//        map.put("type", "grid");
//        map.put("id", "1");
//		
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonlist = mapper.writeValueAsString(map);
//       
//		//System.out.println(jsonlist);
//        
//        
//		
//        //向前台的页面输出结果
//        PrintWriter out = response.getWriter();
//         
//        out.write(jsonlist);
//        out.flush();
//        out.close();        
        
       return "redirect: viewer.html";        
	}

	
	@RequestMapping("/to_main")
	public String to_main(@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("username", "thpower");
//        map.put("email", "wuguanhui@thpower.com");
//        map.put("id", 118);
//        map.put("is_login", true);
//        map.put("head_portrait", "main/images/person-avatar.png");
//        map.put("secure_digest", "33fe11a0100d39ca8926708344f14882f157d63c");
//        map.put("signuptime", 1505265550); 
//		
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonlist = mapper.writeValueAsString(map);
//       
//		//System.out.println(jsonlist);
//		
//        //向前台的页面输出结果
//        PrintWriter out = response.getWriter();
//         
//        out.write(jsonlist);
//        out.flush();
//        out.close();
        
        return "redirect: main.html";
	}
	
	
	@RequestMapping("/to_modifypwd")
	public void to_modifypwd(HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
		response.setCharacterEncoding("utf-8");			

        String userEmail = request.getParameter("email_reset");
        String userPassword = request.getParameter("password_reset");
        String newPassword = request.getParameter("passwordnew");
        
        //System.out.println(userEmail + ", " + userPassword + "," + newPassword);

        Map<String,Object> map = new HashMap<String,Object>();
        
        THPUser user = _userMapper.getUserByEmail(userEmail);
        
        //System.out.println(user);
        
        if(user==null)
        {        	
			map.put("success", false);  
	        map.put("errors", "邮箱不存在!");	        
        }else
        {        	
        	int nRows = _userMapper.modifyUserPassword(userEmail, userPassword, newPassword);    
        	
        	if(nRows>=1)
        	{        	
				map.put("success", true);  
		        map.put("errors", "修改成功!");	        	
        	}else
        	{
    			map.put("success", false);  
    	        map.put("errors", "密码错误!");	        		
        	}
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
	
	@RequestMapping("/to_logout")
	public String to_logout(@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
//        Map<String,Object> map = new HashMap<String,Object>();
//        map.put("username", "thpower");
//        map.put("email", "wuguanhui@thpower.com");
//        map.put("id", 118);
//        map.put("is_login", true);
//        map.put("head_portrait", "static/icons/person-avatar.png");
//        map.put("secure_digest", "33fe11a0100d39ca8926708344f14882f157d63c");
//        map.put("signuptime", 1505265550); 
//		
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonlist = mapper.writeValueAsString(map);
//       
//		//System.out.println(jsonlist);
//		
//        //向前台的页面输出结果
//        PrintWriter out = response.getWriter();
//         
//        out.write(jsonlist);
//        out.flush();
//        out.close();           
       
        Cookie[] cookies = request.getCookies(); 
        
        for(Cookie cookie : cookies)
        {
        	if(cookie.getName().contains("thpcloud.userid") || cookie.getName().contains("thpcloud.loginstatus"))
        	{
        		cookie.setValue(null);
        		cookie.setMaxAge(0);
        		cookie.setPath("/"); 
        		
                response.addCookie(cookie);        		
        	}        	
        }      

        return "redirect: index.html";
        
        
	}	
	
	@RequestMapping("/login_status")
	public void login_status(@CookieValue(name="loginstatus", defaultValue="0") Integer loginstatus,
			@CookieValue(name="userid", defaultValue="0") Integer userid,
			HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");
        
        //System.out.println(loginstatus + ", " + userid);
                
        if(userid==null)
        {
        	userid = 0;        
        }
        
        THPUser user = _userMapper.select(userid);        

        Map<String,Object> map = new HashMap<String,Object>();
        
        if (user ==null)
        {
        	map.put("email", "");
            map.put("username", "");
            map.put("id", userid);
            map.put("is_login", false);
            map.put("head_portrait", "");
            map.put("secure_digest", "");
            map.put("signuptime", 0);     
            map.put("href", "index.html");     
            
            
        }else
        {
        	map.put("email", user.getUserEmail());
            map.put("username", user.getUserName());
            map.put("id", user.getUserId());
            map.put("is_login", true);
            map.put("head_portrait", "static/icons/person-avatar.png");
            map.put("secure_digest", "33fe11a0100d39ca8926708344f14882f157d63c");
            map.put("signuptime", 1505265550); 
            map.put("href", "main.html");   
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
	
	@RequestMapping("/to_register")
	public void to_register(HttpServletRequest request, HttpServletResponse response,
			Model model) throws IOException{
		
		//System.out.println("coming in ... ");
		
		response.setContentType("text/html;charset=utf-8");        
        response.setCharacterEncoding("utf-8");        

        String userName =request.getParameter("username");
        String userEmail =request.getParameter("email");
        String userPassword =request.getParameter("password");
        
        THPUser user = _userMapper.getUserByEmail(userEmail);
        
        //System.out.println(user);
        
        Map<String,Object> map = new HashMap<String,Object>();
        
        if (user ==null)
        {
        	//注册
        	user = new THPUser();
        	
        	user.setUserRootId(1);
        	//user.set
        	
        	//user.setUserId(userId);
        	user.setUserRootId(1);
        	user.setUserName(userName);
        	user.setUserEmail(userEmail);
        	user.setUserPassword(userPassword);
        	user.setUserAge("88");
        	user.setUserSex("1");
        	user.setUserLevel("2");
        	user.setUserIsValid("1");
        	user.setUserCreateTime(COMUtil.getStringDate());
        	user.setUserModifyTime(COMUtil.getStringDate());
        	
        	int nrow =  _userMapper.insert(user);        	       	

			map.put("rows", nrow);
	        map.put("success", true);
	        //map.put("msg", "注册成功!"); 
            
        }else
        {
        	//错误
        	map.put("success", false);
	        map.put("emailError", "邮箱已存在!");     	
            
        }   
        
        
        
        ObjectMapper mapper = new ObjectMapper();
        String jsonlist = mapper.writeValueAsString(map);
       
		//System.out.println(jsonlist);       
        
		
        //向前台的页面输出结果
        PrintWriter out = response.getWriter();
         
        out.write(jsonlist);
        out.flush();
        out.close();        
        
       //return "redirect: index.html";        
	}
	
	
	public String getRemoteHost(HttpServletRequest request){
	    String ip = request.getHeader("x-forwarded-for");
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getRemoteAddr();
	    }
	    return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
	}	
	
}
