package com.momo.service;

import com.momo.mapper.ExtraServiceMapper;
import com.momo.vo.ExtraServiceVO;
import com.momo.vo.PlanVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExtraSvcService implements DefaultCRUDService<ExtraServiceVO, ExtraServiceVO> {
	private final ExtraServiceMapper extraServiceMapper;


	@Override
	public int insert(ExtraServiceVO key) {
		return extraServiceMapper.insert(key);
	}

	@Override
	public List<ExtraServiceVO> select(ExtraServiceVO key) {
		return extraServiceMapper.select(key);
	}

	@Override
	public ExtraServiceVO selectOne(ExtraServiceVO key) {
		return select(key).get(0);
	}

	public List<ExtraServiceVO> search(ExtraServiceVO key){
		return extraServiceMapper.search(key);
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
