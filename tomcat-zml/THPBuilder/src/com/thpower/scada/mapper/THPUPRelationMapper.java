package com.thpower.scada.mapper;

import java.util.List;

import com.thpower.scada.model.THPUPRelation;

/**
* @author admin
* @version 创建时间：2018年8月28日 上午11:22:09
* 类说明
*/
public interface THPUPRelationMapper {
	
	public List<THPUPRelation> getRelationsByProId(long proId);	

	Integer delRelationsByProId(long proId);
	
	int addRelationsByProId(long proId);

	///////////////////////////////////////////////////////
	THPUPRelation select(long relId);
	 
	int insert(THPUPRelation uprel);
	
	int update(THPUPRelation uprel);
	
	int delete(long relId);
}
