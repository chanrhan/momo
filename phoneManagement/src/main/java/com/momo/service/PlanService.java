package com.momo.service;

import com.momo.mapper.PlanMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlanService extends CommonService {
	private final PlanMapper planMapper;


	@Override
	public int insert(Map<String,Object> key) {
		return planMapper.insert(key);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return planMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> key) {
		return select(key).get(0);
	}

	@Override
	public int update(Map<String,Object> key) {
		return planMapper.update(key);
	}

	@Override
	public int delete(Map<String,Object> key) {
		return planMapper.delete(key);
	}

	public List<Map<String,Object>> search(SearchVO searchVO){
		return planMapper.search(searchVO);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return planMapper.selectAll();
	}
}
