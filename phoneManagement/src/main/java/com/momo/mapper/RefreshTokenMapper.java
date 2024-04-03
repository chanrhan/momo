package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface RefreshTokenMapper {
	public Map<String,Object> findById(String id);
	public Map<String,Object> findByRefreshToken(String token);
	public int setRefreshToken(String id, String token);
	public int insertRefreshToken(String id, String token);
}
