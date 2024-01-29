package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface EmployeeMapper extends ICommonMapper {
	public Map<String,Object> selectById(String id);
	public int updateShop(Map<String,Object> map);
}
