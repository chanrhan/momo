package com.momo.service;

import com.momo.mapper.PlanMapper;
import com.momo.vo.PlanVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService implements DefaultCRUDService<PlanVO, PlanVO> {
	private final PlanMapper planMapper;


	@Override
	public int insert(PlanVO key) {
		return planMapper.insert(key);
	}

	@Override
	public List<PlanVO> select(PlanVO key) {
		return planMapper.select(key);
	}

	@Override
	public PlanVO selectOne(PlanVO key) {
		return select(key).get(0);
	}

	@Override
	public int update(PlanVO key) {
		return planMapper.update(key);
	}

	@Override
	public int delete(PlanVO key) {
		return planMapper.delete(key);
	}

	public List<PlanVO> search(PlanVO key){
		return planMapper.search(key);
	}

	@Override
	public List<PlanVO> selectAll() {
		return planMapper.selectAll();
	}
}
