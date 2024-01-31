package com.momo.mapper;

import com.momo.vo.AlarmVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AlarmMapper {
	// Alarm
	public int insertAlarm(AlarmVO vo);
	public int updateAlarm(String qs);
	public int deleteAlarm(int id);
	public List<Map<String,Object>> selectAlarm(String qs);
	public List<Map<String,Object>> searchAlarm(SearchVO vo);
	public int read(int alarmId);
	public int approve(int alarmId);
	public int getMaxId();
}
