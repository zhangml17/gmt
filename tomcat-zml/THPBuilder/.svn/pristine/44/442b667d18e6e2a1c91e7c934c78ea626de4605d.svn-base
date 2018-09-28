package com.thpower.scada.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thpower.scada.util.COMUtil;


/*
 *  SpringMVC Step 4 
    class
 *
*/
@Controller
public class THPActions {
	
	private static final String SUCCESS = "success";
		
	@RequestMapping("/test.action")
	public String test(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//System.out.println("Hello World!");
		
		return "test";
	}
	
	@RequestMapping("/getParas.action")
	public void getParas(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//System.out.println("Hello World!");
		
		//views/sys_paras.html
		
		//response.sendRedirect("/THPBuilder/views/sys_paras.html");
		
		//return "";
	}
}
