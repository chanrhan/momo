package com.momo.mapper;

import com.momo.common.vo.NotificationVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface NotificationMapper {
	public int countUnreadNotification(String userId);
	public List<Map<String,Object>> getNotificationList(String userId);
	// Alarm
	public int insertNotification(NotificationVO vo);
	public List<Map<String,Object>> selectNotification(NotificationVO vo);
	public List<Map<String,Object>> searchNotification(SearchVO vo);
	public int read(int id);
	public int readAll(String userId);
	public int readAllByReceiver(String id);
	public int approve(int id);
	public int getMaxId();
}
