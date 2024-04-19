package com.momo.mapper;

import com.momo.common.vo.NotifVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface NotificationMapper {
	public int countUnreadNotif(String userId);
	public List<Map<String,Object>> getNotifList(String userId);
	// Alarm
	public int insertNotification(NotifVO vo);
	public List<Map<String,Object>> selectAlert(NotifVO vo);
	public List<Map<String,Object>> searchAlert(SearchVO vo);
	public int read(int id);
	public int readAll(String userId);
	public int readAllByReceiver(String id);
	public int approve(int id);
}
