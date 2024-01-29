package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AlarmMapper extends ICommonMapper {
	public int read(int alarmId);
	public int approve(int alarmId);
	public int getMaxId();
}
