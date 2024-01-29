package com.momo.mapper;

import com.momo.vo.AlarmVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AlarmMapper extends ICommonMapper<AlarmVO,AlarmVO> {
	public int read(int alarmId);
	public int approve(int alarmId);
	public int getMaxId();
}
