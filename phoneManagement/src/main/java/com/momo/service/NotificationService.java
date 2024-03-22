package com.momo.service;

import com.momo.emitter.NotificationEmitter;
import com.momo.mapper.NotificationMapper;
import com.momo.vo.NotificationVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService extends CommonService {
	private final ShopCommonService shopCommonService;
	private final NotificationEmitter notificationEmitter;
	private final NotificationMapper notificationMapper;

	public List<Map<String, Object>> searchNotification(SearchVO searchVO) {
		return notificationMapper.searchNotification(searchVO);
	}

	public List<Map<String, Object>> selectNotification(NotificationVO vo) {
		return notificationMapper.selectNotification(vo);
	}
	public List<Map<String, Object>> selectNotificationByReceiver(String id) {
		NotificationVO vo = NotificationVO.builder().receiverId(id).build();
		return selectNotification(vo);
	}
	public int approve(int alarmId){
		return notificationMapper.approve(alarmId);
	}

	public int readAllByReceiver(String receiverId){
		return notificationMapper.readAllByReceiver(receiverId);
	}

	public int read(int alarmId){
		return notificationMapper.read(alarmId);
	}

	public void sendMessage(String senderId, String receiverId, String title, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("title", title);
		data.put("content", content);
		sendNotification(senderId, receiverId, "message", data);
	}

	public void sendMessage(String senderId, String receiverId, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("content", content);
		sendNotification(senderId, receiverId, "message", data);
	}

	public void approvalRequestToAdmin(String senderId, int corpId){
		Map<String,Object> data = new HashMap<>();
		data.put("corp_id", corpId);
		sendNotification(senderId, "admin", "approval", data);
	}

	public void approvalRequestToReps(String senderId, int corpId, int shopId){
		Map<String,Object> data = new HashMap<>();
		data.put("shop_id", shopId);

		Map<String,Object> corp = shopCommonService.selectCorpById(corpId);
		String repsId = corp.get("reps_id").toString();
		sendNotification(senderId, repsId, "approval", data);
	}

	public void sendChatInvitation(int roomId, String receiverId){
		notificationEmitter.sendToClient(receiverId, "chat/invite", roomId);
	}

	// Private
	private void sendNotification(String senderId, String receiverId, String alarmTp, Map<String,Object> data){
		data.put("sender_id", senderId);
		data.put("type", alarmTp);

		String content = data.containsKey("content") ? data.get("content").toString() : null;

		NotificationVO vo = NotificationVO.builder()
				.senderId(senderId)
				.receiverId(receiverId)
				.alarmTp(alarmTp)
				.content(content)
				.build();

		if(notificationMapper.insertNotification(vo) != 0){
			notificationEmitter.sendToClient(receiverId, "note", data);
		}
	}
}
