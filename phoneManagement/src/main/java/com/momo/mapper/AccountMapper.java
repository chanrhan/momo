package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface AccountMapper extends ICommonMapper {
	public int updateRole(Map<String,Object> map);

	public int updatePassword(Map<String,Object> map);
}
