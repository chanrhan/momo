package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface SaleMapper extends ICommonMapper {
	public Map<String,Object> selectById(int id);
	public Integer getMaxSaleNo();
}
