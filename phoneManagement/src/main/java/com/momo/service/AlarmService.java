package com.momo.service;

import com.momo.mapper.AlarmMapper;
import com.momo.vo.AlarmVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AlarmService extends CommonService {
	private final AlarmMapper alarmMapper;

	public int insertAlarm(AlarmVO vo) {
//		vo.setAlarmId(getMaxId()+1);
		return alarmMapper.insertAlarm(vo);
	}

	public int updateAlarm(AlarmVO vo) {
		return alarmMapper.updateAlarm(vo);
	}

	public int deleteAlarm(int id) {
		return alarmMapper.deleteAlarm(id);
	}

	public List<Map<String, Object>> searchAlarm(SearchVO searchVO) {
		return alarmMapper.searchAlarm(searchVO);
	}

	public List<Map<String, Object>> selectAlarm(AlarmVO vo) {
		return alarmMapper.selectAlarm(vo);
	}
	public List<Map<String, Object>> selectAlarmByReceiver(String id) {
		AlarmVO vo = AlarmVO.builder().receiverId(id).build();
		return selectAlarm(vo);
	}

	public int getMaxId(){
		Integer result = alarmMapper.getMaxId();
		if(result == null){
			return 0;
		}
		return result;
	}

	public int approve(int alarmId){
		return alarmMapper.approve(alarmId);
	}

	public int readAllByReceiver(String receiverId){
		return alarmMapper.readAllByReceiver(receiverId);
	}

	public int read(int alarmId){
		return alarmMapper.read(alarmId);
	}
}
