package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface PlanMapper extends ICommonMapper {
	public Map<String,Object> getByMap(int planId);
}
