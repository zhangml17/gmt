package com.thpower.scada.mapper;

import java.util.ArrayList;
import java.util.List;

import com.thpower.scada.model.THPPara;

/**
* @author admin
* @version 创建时间：2017年11月15日 下午5:47:57
* 类说明
*/
public interface THPParaMapper {
	
	public List<THPPara>  getAllParas();
	
	public List<THPPara>  getParasByLabel(String paralabel);
	
	public String getParaValue(String paracode);		

	public List<String> getParaLabels();
	
	/////////////////////////////////////////////////
	
	public THPPara select(long paraid);
	 
	public int insert(THPPara para);
	
	public int update(THPPara para);	
	
	public int delete(long paraid);
	

}
