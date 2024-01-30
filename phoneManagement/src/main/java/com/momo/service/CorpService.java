package com.momo.service;

import com.momo.mapper.CorpMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CorpService extends CommonService {
	private final CorpMapper corpMapper;

	@Override
	public int insert(Map<String,Object> map) {
		return corpMapper.insert(map);
	}

	@Override
	public int update(Map<String,Object> map) {
		return corpMapper.update(map);
	}

	@Override
	public int delete(Map<String,Object> map) {
		return corpMapper.delete(map);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return corpMapper.select(getSelectQueryString(map));
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> map) {
		return select(map).get(0);
	}

	public List<Map<String,Object>> search(SearchVO searchVO) {
		return corpMapper.search(searchVO);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return corpMapper.selectAll();
	}

}
