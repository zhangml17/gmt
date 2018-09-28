package com.thpower.scada.mapper;

import java.util.List;
import java.util.Map;

import com.thpower.scada.model.THPStatus;

/**
* @author admin
* @version 创建时间：2017年11月14日 下午3:56:19
* 类说明
*/
public interface THPStatusMapper {

	public List<Map<String, Object>> getAllStatus();		
	
	int updateOnline(THPStatus status);	
		
	int updateOffline(long userId);	
	
	int replaceintoRow(THPStatus status);

	///////////////////////////////////////////////////////
	THPStatus select(long userId);
	 
	int insert(THPStatus status);
	
	int update(THPStatus status);
	
	int delete(long userId);
}
