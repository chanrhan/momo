package com.momo.service;

import com.momo.mapper.ItemCommonMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExtraSvcService extends CommonService {
	private final ItemCommonMapper itemCommonMapper;

	@Override
	public int insert(Map<String,Object> key) {
		return itemCommonMapper.insert(key);
	}
	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return itemCommonMapper.select(getSelectQueryString(map));
	}
	@Override
	public Map<String,Object> selectOne(Map<String,Object> key) {
		return select(key).get(0);
	}
	public List<Map<String,Object>> search(SearchVO searchVO){
		return itemCommonMapper.search(searchVO);
	}
	@Override
	public int update(Map<String,Object> key) {
		return itemCommonMapper.update(key);
	}
	@Override
	public int delete(Map<String,Object> key) {
		return itemCommonMapper.delete(key);
	}
	@Override
	public List<Map<String,Object>> selectAll() {
		return itemCommonMapper.selectAll();
	}
}
