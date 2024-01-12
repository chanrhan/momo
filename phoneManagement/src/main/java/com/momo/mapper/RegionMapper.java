package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper // 대한민국의 시/군/구
public interface RegionMapper {
	public List<String> selectAllState();
	public String selectByState(String state);
}
