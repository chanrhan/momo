package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopMapper extends ICommonMapper {
	public Integer getMaxCode();
	public List<Map<String,Object>> searchByRegion(Map<String,Object> map);
}
