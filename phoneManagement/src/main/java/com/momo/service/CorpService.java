package com.momo.service;

import com.momo.mapper.CorpMapper;
import com.momo.vo.CommonVO;
import com.momo.vo.CorpVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CorpService extends CommonService<CorpVO,CorpVO> {
	private final CorpMapper corpMapper;

	@Override
	public int insert(CorpVO map) {
		return corpMapper.insert(map);
	}

	@Override
	public int update(CorpVO map) {
		return corpMapper.update(map);
	}

	@Override
	public int delete(CorpVO map) {
		return corpMapper.delete(map);
	}

	@Override
	public List<CorpVO> select(CorpVO map) {
		return corpMapper.select(getSelectQueryString(map));
	}

	@Override
	public CorpVO selectOne(CorpVO map) {
		return select(map).get(0);
	}

	public List<CorpVO> search(CommonVO commonVO) {
		return corpMapper.search(commonVO);
	}

	@Override
	public List<CorpVO> selectAll() {
		return corpMapper.selectAll();
	}

}
