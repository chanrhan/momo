package com.momo.emitter;

import com.momo.mapper.AlarmMapper;
import com.momo.service.ShopCommonService;
import com.momo.vo.AlarmVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
	private final ShopCommonService shopCommonService;
	private final AlarmMapper alarmMapper;

	private final Map<String,SseEmitter> emitterMap      = new HashMap<>();
	private static final Long DEFAULT_TIMEOUT = 60 * 60 * 1000L; // 1시간마다 타임아웃

	public SseEmitter connect(String lastEventId, HttpSession session){
		Object _userId = session.getAttribute("user_id");
		String userId = (_userId != null) ? _userId.toString() : "unknown";

		String id = userId + "_" + System.currentTimeMillis();
		System.out.println("userId: "+userId+" , id: "+id);
		System.out.println("lastEventId: "+lastEventId);

		SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
		emitter.onCompletion(()->{
			emitterMap.remove(id);
		});
		emitter.onTimeout(()->{
			emitterMap.remove(id);
		});
		emitter.onError((e)->{
			log.error(e.getMessage());
			emitterMap.remove(id);
		});
		emitterMap.put(id, emitter);

		sendToClient(id, "connect", "Welcome, "+id);

		if(!lastEventId.isEmpty()){
			// 클라이언트가 미수신한 Event 유실 예방, 연결이 끊겼거나 미수신된 데이터를 다 찾아서 보내준다.

		}
		return emitter;
	}

	public void sendMessage(String senderId, String receiverId, String title, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("title", title);
		data.put("content", content);
		sendAlarm(senderId, receiverId, "message", data);
	}

	public void sendMessage(String senderId, String receiverId, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("content", content);
		sendAlarm(senderId, receiverId, "message", data);
	}

	public void approvalRequestToAdmin(String senderId, int corpId){
		Map<String,Object> data = new HashMap<>();
		data.put("corp_id", corpId);
		sendAlarm(senderId, "admin", "approval", data);
	}

	public void approvalRequestToReps(String senderId, int corpId, int shopId){
		Map<String,Object> data = new HashMap<>();
		data.put("shop_id", shopId);

		Map<String,Object> corp = shopCommonService.selectCorpById(corpId);
		String repsId = corp.get("reps_id").toString();
		sendAlarm(senderId, repsId, "approval", data);
	}

	private void sendAlarm(String senderId, String receiverId, String alarmTp, Map<String,Object> data){
		data.put("sender_id", senderId);
		data.put("type", alarmTp);

		String content = data.containsKey("content") ? data.get("content").toString() : null;

		AlarmVO vo = AlarmVO.builder()
				.alarmId(alarmMapper.getMaxId()+1)
				.senderId(senderId)
				.receiverId(receiverId)
				.alarmTp(alarmTp)
				.content(content)
				.build();

		if(alarmMapper.insertAlarm(vo) != 0){
			sendToClient(receiverId, "note", data);
		}
	}

	private void sendToClient(String id, String eventName, Object data){
		Map<String,SseEmitter> emitters = findAllStartById(id);
		if(emitters != null && !emitters.isEmpty()){
			emitters.forEach((key, value) -> {
				try {
					value.send(SseEmitter.event()
									   .id(id)
									   .name(eventName)
									   .data(data));
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			});
		}
	}

	private Map<String, SseEmitter> findAllStartById(String id){
		return emitterMap.entrySet().stream()
				.filter(entry -> entry.getKey().startsWith(id))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}
}
