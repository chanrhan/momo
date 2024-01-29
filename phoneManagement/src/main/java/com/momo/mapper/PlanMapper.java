package com.momo.mapper;

import com.momo.vo.PlanVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface PlanMapper extends ICommonMapper<PlanVO,PlanVO> {
	public PlanVO getByMap(int planId);
}
