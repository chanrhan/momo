package com.momo.service;

import com.momo.mapper.ItemCommonMapper;
import com.momo.vo.ItemCommonVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ItemCommonService extends CommonService {
	private final ItemCommonMapper itemCommonMapper;

	// Plan
	public int insertPlan(ItemCommonVO vo) {
		return itemCommonMapper.insertPlan(vo);
	}
	public int updatePlan(ItemCommonVO vo) {
		return itemCommonMapper.updatePlan(vo);
	}
	public int deletePlan(int id) {
		return itemCommonMapper.deletePlan(id);
	}
	public List<Map<String,Object>> selectPlan(ItemCommonVO vo) {
		return itemCommonMapper.selectPlan(vo);
	}
	public List<Map<String,Object>> searchPlan(SearchVO searchVO){
		return itemCommonMapper.searchPlan(searchVO);
	}

	// Plan
	public int insertExsvc(ItemCommonVO vo) {
		return itemCommonMapper.insertExsvc(vo);
	}
	public int updateExsvc(ItemCommonVO vo) {
		return itemCommonMapper.updateExsvc(vo);
	}
	public int deleteExsvc(int id) {
		return itemCommonMapper.deletePlan(id);
	}
	public List<Map<String,Object>> selectExsvc(ItemCommonVO vo) {
		return itemCommonMapper.selectExsvc(vo);
	}
	public List<Map<String,Object>> searchExsvc(SearchVO searchVO){
		return itemCommonMapper.searchExsvc(searchVO);
	}

}
