package com.momo.service;

import com.momo.mapper.ExtraServiceMapper;
import com.momo.vo.CommonVO;
import com.momo.vo.ExtraServiceVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExtraSvcService extends CommonService<ExtraServiceVO,ExtraServiceVO> {
	private final ExtraServiceMapper extraServiceMapper;

	@Override
	public int insert(ExtraServiceVO key) {
		return extraServiceMapper.insert(key);
	}
	@Override
	public List<ExtraServiceVO> select(ExtraServiceVO map) {
		return extraServiceMapper.select(getSelectQueryString(map));
	}
	@Override
	public ExtraServiceVO selectOne(ExtraServiceVO key) {
		return select(key).get(0);
	}
	public List<ExtraServiceVO> search(CommonVO commonVO){
		return extraServiceMapper.search(commonVO);
	}
	@Override
	public int update(ExtraServiceVO key) {
		return extraServiceMapper.update(key);
	}
	@Override
	public int delete(ExtraServiceVO key) {
		return extraServiceMapper.delete(key);
	}
	@Override
	public List<ExtraServiceVO> selectAll() {
		return extraServiceMapper.selectAll();
	}
}
