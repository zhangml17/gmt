package com.thpower.scada.mapper;

import java.util.List;

import com.thpower.scada.model.THPDatasource;

/**
* @author admin
* @version 创建时间：2018年8月17日 下午9:57:55
* 类说明
*/
public interface THPDatasourceMapper {
		
	public List<THPDatasource> getAllDatasources();		
	
	public List<THPDatasource> getDatasourcesByType(String dsType);	
	
	public THPDatasource getDatasourceByCode(String dsCode);	
	
	public String getDatasourceUrlById(String dsId);
	
	public String getDatasourceUrlByCode(String dsCode);	

	public List<String> getDatasourceTypes();
	
	///////////////////////////////////////////////////////
	THPDatasource select(long dsId);
	 
	int insert(THPDatasource datasource);
	
	int update(THPDatasource datasource);
	
	int delete(long dsId);

}
