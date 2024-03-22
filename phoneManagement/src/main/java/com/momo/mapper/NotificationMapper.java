package com.momo.mapper;

import com.momo.vo.NotificationVO;
import com.momo.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface NotificationMapper {
	// Alarm
	public int insertNotification(NotificationVO vo);
	public List<Map<String,Object>> selectNotification(NotificationVO vo);
	public List<Map<String,Object>> searchNotification(SearchVO vo);
	public int read(int alarmId);
	public int readAllByReceiver(String id);
	public int approve(int alarmId);
	public int getMaxId();
}
