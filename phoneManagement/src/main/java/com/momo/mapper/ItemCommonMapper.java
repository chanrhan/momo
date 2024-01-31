package com.momo.mapper;

import com.momo.vo.AlarmVO;
import com.momo.vo.ItemCommonVO;
import com.momo.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemCommonMapper {
	public Map<String,String> getByMap(int id);

	// Extra Service
	public int insertExsvc(ItemCommonVO vo);
	public int updateExsvc(String qs);
	public int deleteExsvc(int id);
	public List<Map<String,Object>> selectExsvc(String qs);
	public List<Map<String,Object>> searchExsvc(SearchVO vo);


	// Plan
	public int insertPlan(ItemCommonVO vo);
	public int updatePlan(String qs);
	public int deletePlan(int id);
	public List<Map<String,Object>> selectPlan(String qs);
	public List<Map<String,Object>> searchPlan(SearchVO vo);
}
