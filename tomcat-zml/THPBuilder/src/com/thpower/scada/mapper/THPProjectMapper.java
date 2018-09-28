package com.thpower.scada.mapper;

import java.util.List;

import com.thpower.scada.model.THPProject;

/**
* @author admin
* @version 创建时间：2017年12月7日 上午11:38:30
* 类说明
*/
public interface THPProjectMapper {

	public List<THPProject> getAllProjects();	
	
	public THPProject getProjectById(long proId);	

	public List<THPProject> getProjectsByUserId(long proUserId);

	public List<THPProject> getSharedProjects(long proUserId);	
	
	public List<THPProject> validateProjectName(String proName);

	///////////////////////////////////////////////////////
	THPProject select(long proId);
	 
	int insert(THPProject project);
	
	int update(THPProject project);
	
	int delete(long proId);
	    

}
