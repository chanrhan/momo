package com.momo.mapper;

import com.momo.vo.PlanVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface PlanMapper extends DefaultCRUDMapper<PlanVO, PlanVO> {
	public Map<String,String> getByMap(int planId);
}
