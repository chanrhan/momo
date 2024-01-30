package com.momo.service;

import com.momo.mapper.ExtraServiceMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExtraSvcService extends CommonService {
	private final ExtraServiceMapper extraServiceMapper;

	@Override
	public int insert(Map<String,Object> key) {
		return extraServiceMapper.insert(key);
	}
	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return extraServiceMapper.select(getSelectQueryString(map));
	}
	@Override
	public Map<String,Object> selectOne(Map<String,Object> key) {
		return select(key).get(0);
	}
	public List<Map<String,Object>> search(SearchVO searchVO){
		return extraServiceMapper.search(searchVO);
	}
	@Override
	public int update(Map<String,Object> key) {
		return extraServiceMapper.update(key);
	}
	@Override
	public int delete(Map<String,Object> key) {
		return extraServiceMapper.delete(key);
	}
	@Override
	public List<Map<String,Object>> selectAll() {
		return extraServiceMapper.selectAll();
	}
}
